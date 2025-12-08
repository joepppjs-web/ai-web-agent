// ==UserScript==
// @name         Fireb AI Web Analyzer Fixed
// @namespace    https://github.com/joepppjs-web/ai-web-agent
// @version      4.0
// @description  Fully working Mobile + Desktop AI for any webpage
// @author       joepppjs-web
// @match        *://*/*
// @grant        GM_xmlhttpRequest
// @grant        GM_addStyle
// @icon         https://github.com/fluidicon.png
// ==/UserScript==

(function() {
    'use strict';

    // ----------------- STYLES -----------------
    GM_addStyle(`
        #ai-panel {
            position: fixed; top: 20px; right: 20px; z-index: 999999;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            backdrop-filter: blur(20px); border-radius: 24px;
            box-shadow: 0 25px 50px rgba(0,0,0,0.3); padding: 0;
            min-width: 380px; max-width: 420px; max-height: 85vh;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
            transition: all 0.3s cubic-bezier(0.4,0,0.2,1);
            pointer-events: auto;
        }
        #ai-panel.desktop { min-width: 420px; max-width: 480px; }
        #ai-panel.mobile { left: 5px !important; right: 5px !important; top: 10px !important; min-width: auto !important; max-width: none !important; }

        .ai-header {
            padding: 24px; color: white; text-align: center;
            border-radius: 24px 24px 0 0; background: rgba(255,255,255,0.15);
            backdrop-filter: blur(15px); position: relative; cursor: move;
            pointer-events: auto; user-select: none;
        }
        .ai-title { font-size: 20px; font-weight: 700; margin: 0 0 4px 0; }
        .ai-subtitle { font-size: 14px; opacity: 0.9; margin: 0; }
        .ai-toggle, .desktop-btn, .mobile-btn, .close-btn {
            position: absolute; top: 20px; width: 48px; height: 48px;
            border-radius: 50%; background: rgba(255,255,255,0.2);
            border: none; color: white; font-size: 18px; cursor: pointer;
            transition: all 0.2s; backdrop-filter: blur(10px);
            pointer-events: auto;
        }
        .ai-toggle { left: 24px; }
        .desktop-btn { left: 84px; }
        .mobile-btn { right: 24px; }
        .close-btn { right: 84px; }
        .ai-toggle:hover, .desktop-btn:hover, .mobile-btn:hover, .close-btn:hover {
            background: rgba(255,255,255,0.3); transform: scale(1.05);
        }

        .ai-content {
            padding: 28px; background: rgba(255,255,255,0.95);
            border-radius: 0 0 24px 24px; max-height: 65vh; overflow-y: auto;
            backdrop-filter: blur(10px); pointer-events: auto;
        }

        .preset-grid {
            display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
            gap: 12px; margin-bottom: 20px;
        }
        .preset-btn {
            padding: 16px 12px; background: #f8fafc;
            border: 2px solid #e2e8f0; border-radius: 14px;
            font-size: 14px; font-weight: 600; cursor: pointer;
            transition: all 0.25s; text-align: center; height: 64px;
            display: flex; flex-direction: column; align-items: center; gap: 4px;
            pointer-events: auto; user-select: none;
        }
        .preset-btn:hover { 
            background: #667eea; color: white; border-color: #667eea; 
            transform: translateY(-2px); box-shadow: 0 10px 25px rgba(102,126,234,0.3);
        }
        .preset-btn.active { 
            background: linear-gradient(135deg, #667eea, #764ba2); 
            border-color: #5a67d8; color: white; 
        }

        .ai-input {
            width: 100%; padding: 16px 20px; border: 2px solid #e1e5e9;
            border-radius: 14px; font-size: 16px; box-sizing: border-box;
            margin-bottom: 20px; background: white;
            transition: all 0.2s; pointer-events: auto;
        }
        .ai-input:focus { 
            outline: none; border-color: #667eea; 
            box-shadow: 0 0 0 4px rgba(102,126,234,0.15);
        }

        .ai-btn {
            width: 100%; padding: 18px; background: linear-gradient(135deg, #10b981, #059669);
            color: white; border: none; border-radius: 14px; font-size: 16px;
            font-weight: 700; cursor: pointer; transition: all 0.25s;
            pointer-events: auto;
        }
        .ai-btn:hover:not(:disabled) {
            transform: translateY(-3px); box-shadow: 0 20px 40px rgba(16,185,129,0.4);
        }
        .ai-btn:disabled { opacity: 0.6; cursor: not-allowed; }

        .progress-container {
            width: 100%; height: 10px; background: #f0f2f5;
            border-radius: 6px; overflow: hidden; margin: 16px 0; display: none;
        }
        .progress-bar {
            height: 100%; background: linear-gradient(90deg, #10b981, #059669, #047857);
            border-radius: 6px; width: 0%; transition: width 0.4s ease;
        }
        .progress-text {
            text-align: center; font-size: 14px; color: #6b7280; font-weight: 500; margin-bottom: 12px;
        }
        .ai-result {
            background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%);
            border-radius: 16px; padding: 24px; font-size: 15px; line-height: 1.7;
            white-space: pre-wrap; border-left: 5px solid #10b981;
            box-shadow: inset 0 2px 8px rgba(0,0,0,0.05); display: none;
            pointer-events: auto;
        }
        .status {
            padding: 16px; border-radius: 12px; margin-bottom: 16px; font-weight: 600;
            text-align: center; font-size: 14px; pointer-events: auto;
        }
        .status.success { background: #d1fae5; color: #059669; border: 1px solid #10b981; }
        .status.error { background: #fee2e2; color: #dc2626; border: 1px solid #ef4444; }
        .copy-btn {
            background: #10b981; font-size: 14px; padding: 10px 20px;
            margin-top: 16px; width: 100%; pointer-events: auto;
        }

        @media (max-width: 768px) {
            #ai-panel { left: 5px !important; right: 5px !important; top: 10px !important; min-width: auto !important; }
            .preset-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 480px) {
            .ai-header { padding: 20px; }
            .ai-content { padding: 20px; }
            .preset-btn { padding: 14px 10px; height: 56px; font-size: 13px; }
        }
    `);

    // ----------------- CREATE UI -----------------
    const panel = document.createElement('div');
    panel.id = 'ai-panel';
    panel.innerHTML = `
        <div class="ai-header">
            <h2 class="ai-title">AI Web Analyzer</h2>
            <p class="ai-subtitle">Click preset → Analyze page</p>
        </div>
        <div class="ai-content">
            <div class="preset-grid">
                <button class="preset-btn active" data-command="Summarize this page in 3 bullets">Summary</button>
                <button class="preset-btn" data-command="Extract all key points in bullets">Key Points</button>
                <button class="preset-btn" data-command="Find top 5 stories ranked by importance">Top Items</button>
                <button class="preset-btn" data-command="Analyze main topics and insights">Insights</button>
            </div>
            <input type="text" class="ai-input" id="ai-command" placeholder="Or type custom command...">
            <button class="ai-btn" id="ai-run-btn">Analyze Page</button>
            <div class="progress-container" id="progress-container">
                <div class="progress-text" id="progress-text"></div>
                <div class="progress-bar" id="progress-bar"></div>
            </div>
            <div id="status"></div>
            <div id="ai-result"></div>
        </div>
    `;
    document.body.appendChild(panel);

    // ----------------- FUNCTIONS -----------------
    const commandInput = document.getElementById('ai-command');
    const runBtn = document.getElementById('ai-run-btn');
    const resultDiv = document.getElementById('ai-result');
    const progress = document.getElementById('progress-container');
    const progressBar = document.getElementById('progress-bar');
    const progressText = document.getElementById('progress-text');
    const statusDiv = document.getElementById('status');
    const presets = panel.querySelectorAll('.preset-btn');

    function showStatus(msg, type) {
        statusDiv.innerHTML = `<div class="status ${type}">${msg}</div>`;
    }

    function setPreset(cmdBtn) {
        commandInput.value = cmdBtn.dataset.command;
        presets.forEach(btn => btn.classList.remove('active'));
        cmdBtn.classList.add('active');
        commandInput.focus();
    }

    async function runAI() {
        const command = commandInput.value.trim();
        if (!command) return showStatus('Pick preset first!', 'error');

        runBtn.disabled = true;
        runBtn.textContent = 'AI Working...';
        resultDiv.style.display = 'none';
        progress.style.display = 'block';

        try {
            progressText.textContent = 'Fetching page... (25%)';
            progressBar.style.width = '25%';
            await new Promise(r => setTimeout(r, 500));

            const response = await new Promise((resolve, reject) => {
                GM_xmlhttpRequest({
                    method: 'POST',
                    url: '172.75.16.247/analyze',
                    headers: { 'Content-Type': 'application/json' },
                    data: JSON.stringify({ url: window.location.href, command }),
                    timeout: 45000,
                    onload: res => resolve(JSON.parse(res.responseText)),
                    onerror: () => reject(new Error('Python server offline! Run: python web_agent.py')),
                    ontimeout: () => reject(new Error('AI timeout'))
                });
            });

            progressText.textContent = 'Analyzing... (75%)';
            progressBar.style.width = '75%';
            await new Promise(r => setTimeout(r, 500));

            progressText.textContent = 'Formatting... (100%)';
            progressBar.style.width = '100%';

            resultDiv.innerHTML = `
                <div style="font-weight:700;color:#059669;margin-bottom:12px;font-size:16px;">${command}</div>
                <div style="white-space:pre-wrap;line-height:1.6;">${response.result}</div>
                <button class="ai-btn copy-btn">Copy Result</button>
            `;
            resultDiv.querySelector('.copy-btn').addEventListener('click', () => {
                navigator.clipboard.writeText(response.result);
            });

            resultDiv.style.display = 'block';
            showStatus('Analysis complete!', 'success');

        } catch(e) {
            showStatus(e.message, 'error');
        } finally {
            runBtn.disabled = false;
            runBtn.textContent = 'Analyze Page';
            setTimeout(() => { progress.style.display = 'none'; progressBar.style.width = '0%'; }, 1500);
        }
    }

    // ----------------- EVENT LISTENERS -----------------
    presets.forEach(btn => btn.addEventListener('click', () => setPreset(btn)));
    runBtn.addEventListener('click', runAI);
    document.addEventListener('keydown', e => { if(e.key === 'Escape') panel.style.display='none'; if(e.key==='Enter' && e.ctrlKey) runAI(); });

    // ----------------- MOBILE / DESKTOP -----------------
    function detectDevice() {
        if(window.innerWidth < 700 || navigator.userAgent.includes('Mobile')){
            panel.classList.add('mobile');
            panel.classList.remove('desktop');
        } else {
            panel.classList.add('desktop');
            panel.classList.remove('mobile');
        }
    }
    window.addEventListener('load', detectDevice);
    window.addEventListener('resize', detectDevice);

    // ----------------- DRAGGING (DESKTOP) -----------------
    let dragging=false, startX, startY;
    const header = panel.querySelector('.ai-header');
    header.addEventListener('mousedown', e => {
        if(window.innerWidth > 768 && e.target===header){ dragging=true; startX=e.clientX-panel.offsetLeft; startY=e.clientY-panel.offsetTop; panel.style.transition='none'; }
    });
    document.addEventListener('mousemove', e => { if(dragging){ panel.style.left=(e.clientX-startX)+'px'; panel.style.top=(e.clientY-startY)+'px'; panel.style.right='auto'; } });
    document.addEventListener('mouseup', ()=>{ dragging=false; panel.style.transition='all 0.3s cubic-bezier(0.4,0,0.2,1)'; });

})();
