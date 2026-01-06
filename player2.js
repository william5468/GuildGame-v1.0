// === Player2 Integration Variables ===
let p2Token = null;
let lunaNpcId = null;
let p2EventSource = null;

const API_BASE = 'https://api.player2.game/v1';
const OAUTH_BASE = 'https://player2.game';

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
    better_alert('Player2ログイン成功！ルナと話せます', 'success');
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

async function spawnLuna() {
    if (!p2Token) {
        better_alert('Player2にログインしてください', 'warning');
        player2Login();
        return;
    }
    if (lunaNpcId) return;

    const spawnBody = {
        ...lunaConfig,
        keep_game_state: true,
        tts: {
            audio_format: "mp3",          // Required
            speed: 1.0,                   // Required
            voice_ids: ["01955d76-ed5b-7451-92d6-5ef579d3ed28"]  // ← At least one valid ID (from docs example)
            // Add voice_gender/voice_language if desired, but not needed with explicit ID
        }
    };

    console.log('Spawning Luna with body:', JSON.stringify(spawnBody, null, 2));

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

    const idText = await res.text();  // Read once
    lunaNpcId = idText.trim();        // Trim any trailing newline/CRLF
    console.log('Luna spawned! Raw ID:', idText);
    console.log('Trimmed ID:', lunaNpcId);
    startResponseListener();
    better_alert('ルナが準備できました！話しかけてください♪', 'success');
}

function startResponseListener() {
    if (p2EventSource) return;

    p2EventSource = new EventSource(`${API_BASE}/npcs/responses?token=${p2Token}`);

    // Primary: Listen specifically for 'npc-message' events
    p2EventSource.addEventListener('npc-message', (e) => {
        console.log('Received npc-message event:', e.data);  // This will now log!

        try {
            const data = JSON.parse(e.data);
            console.log("parsed data:"+data);  
            console.log("Current msg npc_id:"+data.npc_id+" Stored lunanpcid:"+lunaNpcId);
            console.log("after id check");
            if (data.message) {
                let message = data.message
                    .replace(/\\u003c/g, '<')
                    .replace(/\\u003e/g, '>')
                    .replace('<Luna>', 'ルナ: ')  // Keep speaker name nicely formatted
                    .replace('</Luna>', '')
                    .trim();
                console.log("msg:"+message); 
                // Replace {player} with real name from game
                message = message.replace(/\{player\}/g, playerName || 'あなた');

                appendLunaMessage(message);
            }
        } catch (err) {
            console.warn('Parse error:', e.data, err);
        }
    });

    // Optional fallback for any unnamed events (debug)
    p2EventSource.onmessage = (e) => {
        console.log('Generic message event:', e.data);
    };

    // Ping handling (some streams send named ping events)
    p2EventSource.addEventListener('ping', (e) => {
        console.log('Ping received');
    });

    p2EventSource.onerror = () => {
        console.error('Stream error – reconnecting or closed');
        better_alert('接続が切れました。再読み込みしてください', 'error');
        if (p2EventSource) p2EventSource.close();
    };
}

// Chat functions remain the same (open/close/append/send)
function openLunaChat() {
    document.getElementById('lunaChatModal').style.display = 'flex';
    spawnLuna();
    document.getElementById('lunaInput').focus();
}

function closeLunaChat() {
    document.getElementById('lunaChatModal').style.display = 'none';
}

function appendLunaMessage(text) {
    const log = document.getElementById('lunaChatLog');
    const div = document.createElement('div');
    div.style.marginBottom = '15px';
    div.style.color = '#a0d8ff';
    div.style.fontSize = '1.1em';
    div.innerHTML = `<strong>ルナ:</strong> ${text.replace(/\n/g, '<br>')}`;
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
    div.innerHTML = `<strong>あなた:</strong> ${text.replace(/\n/g, '<br>')}`;
    log.appendChild(div);
    log.scrollTop = log.scrollHeight;
}

async function sendLunaMessage() {
    const input = document.getElementById('lunaInput');
    const message = input.value.trim();
    if (!message || !lunaNpcId) return;

    appendPlayerMessage(message);
    input.value = '';

    await fetch(`${API_BASE}/npcs/${lunaNpcId}/chat`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${p2Token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            sender_name: playerName || 'Player',
            sender_message: message
        })
    });
}