// ==UserScript==
// @name         Fireb AI Web Analyzer Galaxy Big Sidebar (Fixed)
// @namespace    https://github.com/joepppjs-web/ai-web-agent
// @version      5.3
// @description  Big galaxy AI panel as right sidebar, single backend call, no duplicate UIs on SPAs/pages
// @author       joepppjs-web
// @match        *://*/*
// @grant        GM_xmlhttpRequest
// @grant        GM_addStyle
// ==/UserScript==

(function() {
    'use strict';

    // ----- PREVENT DUPLICATE UI -----
    if (window.__firebAIInjected) return;
    window.__firebAIInjected = true;

    // -------------- STYLES --------------
    GM_addStyle(`
        #ai-panel {
            position: fixed;
            top: 60px;
            right: 0;
            z-index: 999999;
            background:
                radial-gradient(circle at 20% 20%, rgba(255,255,255,0.25) 0, transparent 40%),
                radial-gradient(circle at 80% 30%, rgba(255,255,255,0.18) 0, transparent 45%),
                radial-gradient(circle at 10% 80%, rgba(255,255,255,0.15) 0, transparent 40%),
                linear-gradient(135deg, #020024 0%, #090979 35%, #4b0082 70%, #ff6ac1 100%);
            backdrop-filter: blur(20px);
            border-radius: 24px 0 0 24px;
            box-shadow: 0 25px 50px rgba(0,0,0,0.7);
            padding: 0;
            width: 520px;
            max-width: 40vw;
            height: calc(100vh - 80px);
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
            transition: all 0.3s cubic-bezier(0.4,0,0.2,1);
            pointer-events: auto;
        }
        #ai-panel.desktop {
            width: 560px;
            max-width: 42vw;
        }
        #ai-panel.mobile {
            left: 5px !important;
            right: 5px !important;
            top: 10px !important;
            height: auto !important;
            max-height: 80vh !important;
            width: auto !important;
            border-radius: 16px !important;
        }

        .ai-header {
            padding: 20px;
            color: white;
            text-align: center;
            border-radius: 24px 0 0 0;
            background: rgba(0,0,0,0.35);
            backdrop-filter: blur(15px);
            position: relative;
            cursor: move;
            pointer-events: auto;
            user-select: none;
        }
        .ai-title { font-size: 20px; font-weight: 700; margin: 0 0 4px 0; }
        .ai-subtitle { font-size: 14px; opacity: 0.9; margin: 0; }

        .ai-content {
            padding: 18px;
            background: rgba(5,10,30,0.95);
            border-radius: 0 0 0 24px;
            height: calc(100% - 64px);
            overflow-y: auto;
            backdrop-filter: blur(10px);
            pointer-events: auto;
            color: #e5e7eb;
        }

        .preset-grid {
            display: grid;
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 10px;
            margin-bottom: 16px;
        }
        .preset-btn {
            padding: 12px 10px;
            background: rgba(15,23,42,0.9);
            border: 2px solid rgba(148,163,184,0.7);
            border-radius: 12px;
            font-size: 13px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.25s;
            text-align: center;
            height: 52px;
            display: flex;
            align-items: center;
            justify-content: center;
            pointer-events: auto;
            user-select: none;
            color: #e5e7eb;
        }
        .preset-btn:hover {
            background: #4f46e5;
            color: white;
            border-color: #6366f1;
            transform: translateY(-2px);
            box-shadow: 0 10px 25px rgba(129,140,248,0.4);
        }
        .preset-btn.active {
            background: linear-gradient(135deg, #4f46e5, #ec4899);
            border-color: #a855f7;
            color: white;
        }

        .ai-input {
            width: 100%;
            padding: 12px 14px;
            border: 2px solid #1f2937;
            border-radius: 12px;
            font-size: 14px;
            box-sizing: border-box;
            margin-bottom: 12px;
            background: #020617;
            color: #e5e7eb;
            transition: all 0.2s;
            pointer-events: auto;
        }
        .ai-input::placeholder { color: #6b7280; }
        .ai-input:focus {
            outline: none;
            border-color: #6366f1;
            box-shadow: 0 0 0 3px rgba(99,102,241,0.35);
        }

        .ai-btn {
            width: 100%;
            padding: 12px;
            background: linear-gradient(135deg, #22c55e, #16a34a);
            color: white;
            border: none;
            border-radius: 12px;
            font-size: 14px;
            font-weight: 700;
            cursor: pointer;
            transition: all 0.25s;
            pointer-events: auto;
        }
        .ai-btn:hover:not(:disabled) {
            transform: translateY(-2px);
            box-shadow: 0 16px 32px rgba(34,197,94,0.5);
        }
        .ai-btn:disabled { opacity: 0.6; cursor: not-allowed; }

        .ai-result {
            background:
                radial-gradient(circle at top left, rgba(96,165,250,0.25), transparent 55%),
                radial-gradient(circle at bottom right, rgba(252,165,165,0.2), transparent 55%),
                rgba(15,23,42,0.95);
            border-radius: 14px;
            padding: 16px;
            font-size: 13px;
            line-height: 1.7;
            white-space: pre-wrap;
            border-left: 4px solid #22c55e;
            box-shadow: inset 0 1px 6px rgba(0,0,0,0.35);
            display: none;
            pointer-events: auto;
            color: #e5e7eb;
            margin-top: 12px;
        }
        .status {
            padding: 8px 10px;
            border-radius: 10px;
            margin-bottom: 10px;
            font-weight: 500;
            text-align: center;
            font-size: 12px;
            pointer-events: auto;
        }
        .status.success {
            background: rgba(22,163,74,0.15);
            color: #bbf7d0;
            border: 1px solid #22c55e;
        }
        .status.error {
            background: rgba(220,38,38,0.12);
            color: #fecaca;
            border: 1px solid #f87171;
        }

        .copy-btn {
            background: linear-gradient(135deg, #3b82f6, #6366f1);
            font-size: 12px;
            padding: 8px 12px;
            margin-top: 10px;
            width: 100%;
            pointer-events: auto;
        }

        @media (max-width: 900px) {
            #ai-panel {
                left: 5px !important;
                right: 5px !important;
                top: 10px !important;
                width: auto !important;
                height: auto !important;
                max-height: 80vh !important;
                border-radius: 16px !important;
            }
            .ai-content {
                height: auto;
                max-height: 70vh;
            }
            .preset-grid {
                grid-template-columns: repeat(2, minmax(0, 1fr));
            }
        }
    `);

    // -------------- CREATE UI --------------
    const panel = document.createElement('div');
    panel.id = 'ai-panel';
    panel.innerHTML = `
        <div class="ai-header">
            <h2 class="ai-title">AI Web Analyzer</h2>
            <p class="ai-subtitle">Pick a preset or write your own prompt</p>
        </div>
        <div class="ai-content">
            <div class="preset-grid">
                <button class="preset-btn active" data-command="Summarize this page in 3 bullets">Summary</button>
                <button class="preset-btn" data-command="Extract all key points in bullets">Key Points</button>
                <button class="preset-btn" data-command="Find the top 5 most important items on this page">Top Items</button>
                <button class="preset-btn" data-command="Analyze the main topics and insights on this page">Insights</button>
            </div>
            <input type="text" class="ai-input" id="ai-command" placeholder="Or type a custom instruction...">
            <button class="ai-btn" id="ai-run-btn">Analyze Page</button>
            <div id="status"></div>
            <div id="ai-result"></div>
        </div>
    `;
    document.body.appendChild(panel);

    // -------------- REFERENCES --------------
    const commandInput = document.getElementById('ai-command');
    const runBtn = document.getElementById('ai-run-btn');
    const resultDiv = document.getElementById('ai-result');
    const statusDiv = document.getElementById('status');
    const presets = panel.querySelectorAll('.preset-btn');

    // -------------- HELPERS --------------
    function showStatus(msg, type) {
        statusDiv.innerHTML = `<div class="status ${type}">${msg}</div>`;
    }

    function setPreset(btn) {
        commandInput.value = btn.dataset.command;
        presets.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        commandInput.focus();
    }

    // -------------- MAIN CALL --------------
    async function runAI() {
        const command = commandInput.value.trim();
        if (!command) return showStatus('Pick a preset or type something first.', 'error');

        runBtn.disabled = true;
        runBtn.textContent = 'AI Working...';
        resultDiv.style.display = 'none';
        showStatus('Sending page to AI...', 'success');

        try {
            const response = await new Promise((resolve, reject) => {
                GM_xmlhttpRequest({
                    method: 'POST',
                    url: 'http://172.75.16.247:5000/analyze',
                    headers: { 'Content-Type': 'application/json' },
                    data: JSON.stringify({ url: window.location.href, command }),
                    timeout: 45000,
                    onload: res => {
                        try {
                            resolve(JSON.parse(res.responseText));
                        } catch (e) {
                            reject(new Error('Invalid JSON from server'));
                        }
                    },
                    onerror: () => reject(new Error('Server offline. Run: python web_agent.py')),
                    ontimeout: () => reject(new Error('AI request timed out'))
                });
            });

            resultDiv.innerHTML = `
                <div style="font-weight:700;color:#bfdbfe;margin-bottom:10px;font-size:15px;">
                    ${command}
                </div>
                <div style="white-space:pre-wrap;line-height:1.6;">${response.result}</div>
                <button class="ai-btn copy-btn">Copy Result</button>
            `;
            const copyBtn = resultDiv.querySelector('.copy-btn');
            copyBtn.addEventListener('click', () => {
                navigator.clipboard.writeText(response.result || '');
                copyBtn.textContent = 'Copied';
                setTimeout(() => copyBtn.textContent = 'Copy Result', 1500);
            });

            resultDiv.style.display = 'block';
            showStatus('Done.', 'success');

        } catch (e) {
            showStatus(e.message, 'error');
        } finally {
            runBtn.disabled = false;
            runBtn.textContent = 'Analyze Page';
        }
    }

    // -------------- EVENTS --------------
    presets.forEach(btn => btn.addEventListener('click', () => setPreset(btn)));
    runBtn.addEventListener('click', runAI);
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape') panel.style.display = 'none';
        if (e.key === 'Enter' && e.ctrlKey) runAI();
    });

    // -------------- MOBILE / DESKTOP MODE --------------
    function detectDevice() {
        if (window.innerWidth < 900 || navigator.userAgent.includes('Mobile')) {
            panel.classList.add('mobile');
            panel.classList.remove('desktop');
        } else {
            panel.classList.add('desktop');
            panel.classList.remove('mobile');
        }
    }
    window.addEventListener('load', detectDevice);
    window.addEventListener('resize', detectDevice);

    // -------------- DRAG (DESKTOP) --------------
    let dragging = false, startX, startY;
    const header = panel.querySelector('.ai-header');

    header.addEventListener('mousedown', e => {
        if (window.innerWidth > 900 && e.target === header) {
            dragging = true;
            startX = e.clientX - panel.offsetLeft;
            startY = e.clientY - panel.offsetTop;
            panel.style.transition = 'none';
        }
    });

    document.addEventListener('mousemove', e => {
        if (dragging && window.innerWidth > 900) {
            panel.style.left = (e.clientX - startX) + 'px';
            panel.style.top = (e.clientY - startY) + 'px';
            panel.style.right = 'auto';
        }
    });

    document.addEventListener('mouseup', () => {
        dragging = false;
        panel.style.transition = 'all 0.3s cubic-bezier(0.4,0,0.2,1)';
    });
})();
