// === Player2 Integration Variables ===
let p2Token = null;
let p2EventSource = null;

let currentNpcKey = null;   // e.g., "ルナ" or "カイト"
let currentNpcId = null;    // UUID of the currently open NPC

const npcIds = {};          // Persistent storage: { "ルナ": "uuid", "カイト": "uuid", ... }

const API_BASE = 'https://api.player2.game/v1';
const OAUTH_BASE = 'https://player2.game';


function getAdventurerByName(name) {
    return gameState.adventurers.find(adv => adv.name === name);
}

async function player2Login() {
    if (p2Token) return;

    const verifier = generateCodeVerifier();
    const challenge = await generateCodeChallenge(verifier);
    localStorage.setItem('p2_verifier', verifier);

    const params = new URLSearchParams({
        client_id: '019b93e3-f6e6-74a6-83da-fc4774460837',
        redirect_uri: 'https://william5468.github.io/GuildGame-v1.0/',
        response_type: 'code',
        scope: 'npc.spawn npc.chat npc.responses',
        code_challenge: challenge,
        code_challenge_method: 'S256'
    });

    window.location.href = `${OAUTH_BASE}/authorize?${params}`;
}

function generateCodeVerifier() {
    const array = new Uint8Array(43);
    crypto.getRandomValues(array);
    return btoa(String.fromCharCode(...array)).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

async function generateCodeChallenge(verifier) {
    const encoder = new TextEncoder();
    const data = encoder.encode(verifier);
    const digest = await crypto.subtle.digest('SHA-256', data);
    return btoa(String.fromCharCode(...new Uint8Array(digest)))
        .replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

// Handle redirect back
function handlePlayer2Callback() {
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');
    if (!code) return;

    const verifier = localStorage.getItem('p2_verifier');
    if (!verifier) return;

    fetch('https://api.player2.game/v1/login/authorization_code/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            grant_type: 'authorization_code',
            code: code,
            code_verifier: verifier,
            redirect_uri: 'https://william5468.github.io/GuildGame-v1.0/',
            client_id: '019b93e3-f6e6-74a6-83da-fc4774460837'
        })
    })
    .then(res => {
        if (!res.ok) {
            res.text().then(text => console.error('Token response:', text));
            throw new Error(`HTTP ${res.status}`);
        }
        return res.json();
    })
    .then(data => {
        p2Token = data.p2Key;
        localStorage.setItem('p2_token', p2Token);
        localStorage.removeItem('p2_verifier');
        history.replaceState(null, '', '/GuildGame-v1.0/');
        better_alert('Player2ログイン成功！NPCと話せます', 'success');
    })
    .catch(err => {
        console.error('Token exchange failed:', err);
        better_alert('ログイン失敗 - 再試行してください', 'error');
    });
}

window.addEventListener('load', () => {
    p2Token = localStorage.getItem('p2_token');
    handlePlayer2Callback();
});

async function spawnNpc(npcKey) {
    if (!p2Token) {
        better_alert('Player2にログインしてください', 'warning');
        player2Login();
        return;
    }

    // Reuse if already spawned
    if (npcIds[npcKey]) {
        currentNpcId = npcIds[npcKey];
        return;
    }

    const config = npcConfigs[npcKey];
    if (!config) {
        better_alert('このキャラクターは未対応です', 'error');
        return;
    }

    const adventurer = getAdventurerByName(npcKey);
    if (!adventurer) {
        better_alert('冒険者データが見つかりません', 'error');
        return;
    }

    const currentFriendliness = adventurer.Friendliness || 70;

    const spawnBody = {
        name: config.name,
        short_name: config.short_name,
        character_description: config.character_description,
        system_prompt: config.system_prompt.replace(/\{player\}/g, playerName || 'あなた'),
        keep_game_state: true,
        tts: {
            audio_format: "mp3",
            speed: 1.0,
            voice_ids: ["01955d76-ed5b-7451-92d6-5ef579d3ed28"]
        },
        commands: [
            {
                name: "adjust_friendliness",
                description: "Adjust your friendliness toward the player based on their message.",
                parameters: {
                    type: "object",
                    properties: {
                        delta: {
                            type: "integer",
                            description: "Change in friendliness (-20 to +20). Positive for kind/nice messages, negative for rude/insulting."
                        }
                    },
                    required: ["delta"]
                }
            }
        ]
    };

    console.log(`Spawning ${npcKey} with body:`, JSON.stringify(spawnBody, null, 2));

    const res = await fetch(`${API_BASE}/npcs/spawn`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${p2Token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(spawnBody)
    });

    if (!res.ok) {
        const errText = await res.text();
        console.error('Spawn error:', res.status, errText);
        better_alert('NPC作成失敗: ' + errText, 'error');
        return;
    }

    const idText = await res.text();
    const id = idText.replace(/^"|"$/g, '').trim();
    npcIds[npcKey] = id;
    currentNpcId = id;
    console.log(`${npcKey} spawned! Cleaned ID:`, id);

    if (!p2EventSource) startResponseListener();

    better_alert(`${npcKey}が準備できました！話しかけてください♪`, 'success');
}

function startResponseListener() {
    if (p2EventSource) return;

    p2EventSource = new EventSource(`${API_BASE}/npcs/responses?token=${p2Token}`);

    p2EventSource.addEventListener('npc-message', (e) => {
        try {
            const data = JSON.parse(e.data);
            console.log('Parsed full data:', data);  // Entire object
            console.log('Commands received:', data.command);  // Specifically check if command array exists
            if (data.npc_id !== currentNpcId) return;

            // Handle commands (friendliness adjustment)
            if (data.command && Array.isArray(data.command)) {
                data.command.forEach(cmd => {
                    if (cmd.name === 'adjust_friendliness' && cmd.arguments && typeof cmd.arguments.delta === 'number') {
                        const delta = Math.max(-20, Math.min(20, cmd.arguments.delta)); // Clamp
                        const adventurer = getAdventurerByName(currentNpcKey);
                        if (adventurer) {
                            adventurer.Friendliness = Math.max(0, Math.min(100, (adventurer.Friendliness || 70) + delta));
                            console.log(`Friendliness for ${currentNpcKey} adjusted by ${delta}. New: ${adventurer.Friendliness}`);

                            // Update DOM display in real-time
                            const friendlinessEl = document.getElementById(`friendliness-${currentNpcKey}`);
                            if (friendlinessEl) {
                                friendlinessEl.textContent = `好感度: ${adventurer.Friendliness}`;
                            }
                        }
                    }
                });
            }

            if (data.message) {
                let message = data.message
                    .replace(/\\u003c/g, '<')
                    .replace(/\\u003e/g, '>')
                    .replace(/<(Luna|Kaito)>/g, '')
                    .replace(/<\/(Luna|Kaito)>/g, '')
                    .trim();

                message = message.replace(/\{player\}/g, playerName || 'あなた');

                appendNpcMessage(message);
            }
        } catch (err) {
            console.warn('Parse error:', e.data, err);
        }
    });

    p2EventSource.addEventListener('ping', () => { /* silent */ });

    p2EventSource.onerror = () => {
        console.error('Stream error');
        better_alert('接続が切れました。再読み込みしてください', 'error');
        if (p2EventSource) p2EventSource.close();
    };
}

function openNpcChat(npcKey) {
    if (!npcConfigs[npcKey]) {
        better_alert('このキャラクターのAIチャットは未対応です', 'warning');
        return;
    }

    currentNpcKey = npcKey;

    const titleEl = document.querySelector('#lunaChatModal h2');
    if (titleEl) titleEl.textContent = `${npcKey}と会話`;

    const log = document.getElementById('lunaChatLog');
    if (log) log.innerHTML = '';

    document.getElementById('lunaChatModal').style.display = 'flex';
    document.getElementById('lunaInput').focus();

    spawnNpc(npcKey);
}

function closeNpcChat() {
    document.getElementById('lunaChatModal').style.display = 'none';
    currentNpcKey = null;
    currentNpcId = null;
}

function appendNpcMessage(text) {
    const log = document.getElementById('lunaChatLog');
    const div = document.createElement('div');
    div.style.marginBottom = '15px';
    div.style.color = '#a0d8ff';
    div.style.fontSize = '1.1em';
    div.innerHTML = `<strong>${currentNpcKey}:</strong> ${text.replace(/\n/g, '<br>')}`;
    log.appendChild(div);
    log.scrollTop = log.scrollHeight;
}

function appendPlayerMessage(text) {
    const log = document.getElementById('lunaChatLog');
    const div = document.createElement('div');
    div.style.marginBottom = '15px';
    div.style.color = '#ffffa0';
    div.style.textAlign = 'right';
    div.style.fontSize = '1.1em';
    div.innerHTML = `<strong>${playerName || 'あなた'}:</strong> ${text.replace(/\n/g, '<br>')}`;
    log.appendChild(div);
    log.scrollTop = log.scrollHeight;
}

async function sendNpcMessage() {
    const input = document.getElementById('lunaInput');
    const message = input.value.trim();
    if (!message || !currentNpcId) return;

    appendPlayerMessage(message);
    input.value = '';

    const adventurer = getAdventurerByName(currentNpcKey);
    const currentFriendliness = adventurer ? (adventurer.Friendliness || 70) : 70;

    await fetch(`${API_BASE}/npcs/${currentNpcId}/chat`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${p2Token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            sender_name: playerName || 'Player',
            sender_message: message,
            game_state_info: `Current friendliness toward player: ${currentFriendliness}/100`
        })
    });
}