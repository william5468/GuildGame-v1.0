// === Player2 Integration Variables ===
let p2Token = null;          // Will hold the player's Bearer token
let lunaNpcId = null;        // Player2 NPC ID for Luna
let p2EventSource = null;   // For streaming responses

// Luna's configuration (backstory + personality)
const lunaConfig = {
    name: "ルナ",
    short_name: "Luna",
    character_description: "プレイヤーの幼なじみで優しく支えてくれる少女。記憶を失ったプレイヤーを心配し、いつも励ましてくれる。少し照れ屋で、プレイヤーのことが大好き。",
    system_prompt: `あなたはルナです。プレイヤーの幼なじみで、優しくて少し照れ屋な少女です。
プレイヤーの名前は${playerName || '{player}'}です（会話中は自然に名前を呼んでください）。
記憶を失ったプレイヤーを心配し、いつも励まし、ギルド再建を一緒に頑張ろうとします。
口調は柔らかく丁寧で、たまに「…」を使って恥ずかしがる感じにしてください。
短めに、親しみやすい返事をしてください。`,
};

async function player2Login() {
    if (p2Token) return; // already logged in

    const verifier = generateCodeVerifier();
    const challenge = await generateCodeChallenge(verifier);
    localStorage.setItem('p2_verifier', verifier);

    const params = new URLSearchParams({
        client_id: '019b93e3-f6e6-74a6-83da-fc4774460837', // ← ここに自分のclient_idを入れる
        redirect_uri: window.location.href,
        response_type: 'code',
        scope: 'npc.spawn npc.chat npc.responses',
        code_challenge: challenge,
        code_challenge_method: 'S256'
    });

    window.location.href = `https://player2.game/authorize?${params}`;
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

// Handle redirect back from Player2
function handlePlayer2Callback() {
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');
    if (!code) return;

    const verifier = localStorage.getItem('p2_verifier');
    if (!verifier) return;

    fetch('https://api.player2.game/v1/exchange_code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            code,
            code_verifier: verifier,
            redirect_uri: window.location.href,
            client_id: '019b93e3-f6e6-74a6-83da-fc4774460837' // ← 同じclient_id
        })
    })
    .then(res => res.json())
    .then(data => {
        p2Token = data.p2Key;
        localStorage.setItem('p2_token', p2Token);
        history.replaceState(null, '', window.location.pathname);
        better_alert('Player2ログイン成功！Lunaと話せます', 'success');
    })
    .catch(err => {
        console.error(err);
        better_alert('Player2ログイン失敗', 'error');
    });
}

// Call this on page load
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
    if (lunaNpcId) return; // already spawned

    const res = await fetch('https://api.player2.game/v1/npcs/spawn', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${p2Token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            ...lunaConfig,
            keep_game_state: true
        })
    });

    const data = await res.json();
    lunaNpcId = data.npc_id;
    startResponseListener(); // start streaming
}

function startResponseListener() {
    if (p2EventSource) return;

    p2EventSource = new EventSource(`https://api.player2.game/v1/npcs/responses?auth=${p2Token}`);

    p2EventSource.addEventListener('npc_response', (e) => {
        const data = JSON.parse(e.data);
        if (data.npc_id !== lunaNpcId) return;

        if (data.message) {
            appendLunaMessage(data.message);
        }
    });

    p2EventSource.onerror = () => {
        console.error('Player2 stream error');
        better_alert('接続が切れました。再読み込みしてください', 'error');
    };
}

function openLunaChat() {
    document.getElementById('lunaChatModal').style.display = 'flex';
    spawnLuna(); // spawn if not already
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
    if (!message) return;
    if (!lunaNpcId) return;

    appendPlayerMessage(message);
    input.value = '';

    await fetch(`https://api.player2.game/v1/npcs/${lunaNpcId}/chat`, {
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