// ==UserScript==
// @name         Fireb AI Web Analyzer Galaxy Sidebar (Fixed + No Movement)
// @namespace    https://github.com/joepppjs-web/ai-web-agent
// @version      6.1
// @description  Stable, non-movable sidebar with no UI distortion or ad blocking
// @author       joepppjs-web
// @match        *://*/*
// @grant        GM_xmlhttpRequest
// @grant        GM_addStyle
// ==/UserScript==

(function() {
    'use strict';

    if (window.__firebAIInjected) return;
    window.__firebAIInjected = true;

    // --- CSS ---
    GM_addStyle(`
        #ai-panel {
            position: fixed;
            top: 60px;
            right: 20px;        /* SAFE: prevents UI distortion + avoids ad rails */
            z-index: 900;       /* SAFE: Below most ad overlays */
            background:
                radial-gradient(circle at 20% 20%, rgba(255,255,255,0.25) 0, transparent 40%),
                radial-gradient(circle at 80% 30%, rgba(255,255,255,0.18) 0, transparent 45%),
                radial-gradient(circle at 10% 80%, rgba(255,255,255,0.15) 0, transparent 40%),
                linear-gradient(135deg, #020024 0%, #090979 35%, #4b0082 70%, #ff6ac1 100%);
            backdrop-filter: blur(20px);
            border-radius: 24px 0 0 24px;
            box-shadow: 0 25px 50px rgba(0,0,0,0.5);
            padding: 0;
            width: 280px;
            height: calc(100vh - 80px);
            max-height: 90vh;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
            transition: all 0.3s cubic-bezier(0.4,0,0.2,1);
            pointer-events: auto;
        }
        #ai-panel.collapsed {
            width: 60px;
            border-radius: 24px;
        }
        #ai-panel.collapsed .ai-content,
        #ai-panel.collapsed .ai-header > *:not(.toggle-btn) {
            opacity: 0;
            pointer-events: none;
            width: 0;
            overflow: hidden;
        }

        .toggle-btn {
            position: absolute;
            left: 12px;
            top: 50%;
            transform: translateY(-50%);
            background: rgba(255,255,255,0.2);
            border: none;
            color: white;
            font-size: 18px;
            width: 36px;
            height: 36px;
            border-radius: 50%;
            cursor: pointer;
            backdrop-filter: blur(10px);
        }

        .ai-header {
            padding: 20px 20px 20px 60px;
            color: white;
            text-align: center;
            border-radius: 24px 0 0 0;
            background: rgba(0,0,0,0.35);
            position: relative;
            user-select: none;
        }

        .ai-title { font-size: 18px; font-weight: 700; margin: 0 0 4px 0; }
        .ai-subtitle { font-size: 13px; opacity: 0.9; margin: 0; }

        .ai-content {
            padding: 18px;
            background: rgba(5,10,30,0.95);
            border-radius: 0 0 0 24px;
            height: calc(100% - 64px);
            overflow-y: auto;
            color: #e5e7eb;
        }

        .preset-grid { display: grid; grid-template-columns: repeat(2,1fr); gap: 10px; margin-bottom: 16px; }
        .preset-btn {
            padding: 10px 8px;
            background: rgba(15,23,42,0.9);
            border: 2px solid rgba(148,163,184,0.7);
            border-radius: 10px;
            font-size: 12px;
            font-weight: 600;
            cursor: pointer;
            text-align: center;
            height: 48px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #e5e7eb;
        }
        .preset-btn:hover { background: #4f46e5; color: white; border-color: #6366f1; }

        .ai-input {
            width: 100%;
            padding: 12px 14px;
            border: 2px solid #1f2937;
            border-radius: 12px;
            background: #020617;
            color: #e5e7eb;
        }

        .ai-btn {
            width: 100%;
            padding: 12px;
            background: linear-gradient(135deg, #22c55e, #16a34a);
            color: white;
            border: none;
            border-radius: 12px;
            font-weight: 700;
            cursor: pointer;
        }

        .ai-result {
            background: rgba(15,23,42,0.95);
            border-radius: 14px;
            padding: 16px;
            white-space: pre-wrap;
            border-left: 4px solid #22c55e;
            display: none;
            margin-top: 12px;
        }

        @media (max-width: 900px) {
            #ai-panel {
                left: 10px !important;
                right: 10px !important;
                top: 10px !important;
                width: 95vw !important;
                max-width: 500px;
                height: auto !important;
                max-height: 85vh !important;
            }
        }
    `);

    // --- HTML ---
    const panel = document.createElement('div');
    panel.id = 'ai-panel';
    panel.innerHTML = `
        <div class="ai-header">
            <button class="toggle-btn" id="toggle-panel">→</button>
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

    // --- JavaScript Logic ---
    const commandInput = document.getElementById('ai-command');
    const runBtn = document.getElementById('ai-run-btn');
    const resultDiv = document.getElementById('ai-result');
    const statusDiv = document.getElementById('status');
    const presets = panel.querySelectorAll('.preset-btn');
    const toggleBtn = document.getElementById('toggle-panel');

    function showStatus(msg, type) {
        statusDiv.innerHTML = `<div class="status ${type}">${msg}</div>`;
    }

    function setPreset(btn) {
        commandInput.value = btn.dataset.command;
        presets.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
    }

    function toggleCollapse() {
        panel.classList.toggle('collapsed');
        toggleBtn.textContent = panel.classList.contains('collapsed') ? '→' : '←';
    }

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
                    onload: res => {
                        try { resolve(JSON.parse(res.responseText)); }
                        catch { reject(new Error('Invalid JSON from server')); }
                    },
                    onerror: () => reject(new Error('Server offline')),
                    ontimeout: () => reject(new Error('AI request timed out'))
                });
            });

            resultDiv.innerHTML = `
                <div style="font-weight:700;color:#bfdbfe;margin-bottom:10px;font-size:15px;">${command}</div>
                <div>${response.result}</div>
                <button class="ai-btn copy-btn">Copy Result</button>
            `;
            const copyBtn = resultDiv.querySelector('.copy-btn');
            copyBtn.onclick = () => navigator.clipboard.writeText(response.result);

            resultDiv.style.display = 'block';
            showStatus('Done.', 'success');
        } catch (e) {
            showStatus(e.message, 'error');
        } finally {
            runBtn.disabled = false;
            runBtn.textContent = 'Analyze Page';
        }
    }

    presets.forEach(btn => btn.onclick = () => setPreset(btn));
    runBtn.onclick = runAI;
    toggleBtn.onclick = toggleCollapse;
})();
