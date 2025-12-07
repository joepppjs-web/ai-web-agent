// ==UserScript==
// @name         🔥 Fireb AI Web Analyzer
// @namespace    https://github.com/Joeyboiiii/fireb-ai-web-agent
// @version      2.6
// @description  📱 Mobile AI analyzes ANY webpage!
// @author       Joeyboiiii
// @match        *://*/*
// @grant        GM_xmlhttpRequest
// @grant        GM_addStyle
// @icon         https://github.com/fluidicon.png
// ==/UserScript==

(function() {
    'use strict';
    
    // Mobile-first CSS
    GM_addStyle(`
        #ai-panel {
            position: fixed; top: 20px; right: 20px; z-index: 999999;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            backdrop-filter: blur(20px); border-radius: 20px;
            box-shadow: 0 25px 50px rgba(0,0,0,0.25); padding: 0;
            min-width: 360px; max-width: 400px;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        }
        #ai-panel.mobile { left: 10px; right: 10px; top: 50px; min-width: auto; }
        .ai-header {
            padding: 20px 24px; color: white; text-align: center;
            border-radius: 20px 20px 0 0; background: rgba(255,255,255,0.1);
            backdrop-filter: blur(10px); position: relative;
        }
        .ai-title { font-size: 18px; font-weight: 700; margin: 0 0 8px 0; }
        .ai-toggle, .mobile-btn {
            position: absolute; top: 18px; width: 44px; height: 44px;
            border-radius: 50%; background: rgba(255,255,255,0.2);
            border: none; color: white; font-size: 16px; cursor: pointer;
        }
        .ai-toggle { left: 20px; }
        .mobile-btn { right: 20px; }
        .ai-content {
            padding: 24px; background: white;
            border-radius: 0 0 20px 20px; max-height: 70vh; overflow-y: auto;
        }
        .preset-grid {
            display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 16px;
        }
        .preset-btn {
            padding: 12px; background: #f8fafc; border: 2px solid #e2e8f0;
            border-radius: 10px; font-size: 14px; cursor: pointer; transition: all 0.2s;
            text-align: center; font-weight: 500;
        }
        .preset-btn:hover { background: #667eea; color: white; border-color: #667eea; }
        .preset-btn.active { background: #667eea; color: white; border-color: #5a67d8; }
        .ai-input {
            width: 100%; padding: 14px 18px; border: 2px solid #e1e5e9;
            border-radius: 12px; font-size: 15px; box-sizing: border-box;
            margin-bottom: 16px;
        }
        .ai-input:focus { outline: none; border-color: #667eea; box-shadow: 0 0 0 3px rgba(102,126,234,0.1); }
        .ai-btn {
            width: 100%; padding: 16px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white; border: none; border-radius: 12px; font-size: 16px;
            font-weight: 600; cursor: pointer; transition: all 0.2s; margin-bottom: 12px;
        }
        .ai-btn:hover:not(:disabled) {
            transform: translateY(-2px); box-shadow: 0 15px 35px rgba(102,126,234,0.4);
        }
        .progress-container {
            width: 100%; height: 8px; background: #f0f2f5;
            border-radius: 4px; overflow: hidden; margin-bottom: 16px; display: none;
        }
        .progress-bar {
            height: 100%; background: linear-gradient(90deg, #10b981, #059669);
            border-radius: 4px; width: 0%; transition: width 0.4s ease;
        }
        .ai-result {
            background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
            border-radius: 12px; padding: 20px; font-size: 15px; line-height: 1.6;
            white-space: pre-wrap; max-height: 300px; overflow-y: auto;
            border-left: 4px solid #0ea5e9; display: none;
        }
        @media (max-width: 480px) {
            #ai-panel { left: 5px; right: 5px; top: 10px; min-width: auto; }
        }
    `);

    // Create UI
    const panel = document.createElement('div');
    panel.id = 'ai-panel';
    panel.innerHTML = `
        <div class="ai-header">
            <button class="ai-toggle" onclick="toggleAI()">📱</button>
            <button class="mobile-btn" onclick="toggleMobile()">📐</button>
            <button class="mobile-btn" onclick="closeAI()">✕</button>
            <h2 class="ai-title">🤖 AI Web Analyzer</h2>
        </div>
        <div class="ai-content">
            <div class="preset-grid">
                <button class="preset-btn active" onclick="setPreset('Summarize this page in 3 bullets')">📋 Summary</button>
                <button class="preset-btn" onclick="setPreset('Extract all key points in bullets')">🔑 Key Points</button>
                <button class="preset-btn" onclick="setPreset('Find top 5 stories ranked by importance')">🏆 Top Items</button>
                <button class="preset-btn" onclick="setPreset('Analyze main topics & insights')">💡 Insights</button>
            </div>
            <input type="text" class="ai-input" id="ai-command" placeholder="📝 Or type custom command...">
            <button class="ai-btn" onclick="runAI()">🚀 Analyze Page</button>
            <div class="progress-container" id="progress-container">
                <div class="progress-bar" id="progress-bar"></div>
            </div>
            <div id="ai-result"></div>
        </div>
    `;
    document.body.appendChild(panel);

    // Global functions
    window.toggleAI = () => { 
        panel.style.display = panel.style.display === 'none' ? 'block' : 'none'; 
    };
    window.closeAI = () => { panel.style.display = 'none'; };
    window.toggleMobile = () => { panel.classList.toggle('mobile'); };
    
    window.setPreset = (text) => {
        document.getElementById('ai-command').value = text;
        document.querySelectorAll('.preset-btn').forEach(btn => btn.classList.remove('active'));
        event.target.classList.add('active');
        document.getElementById('ai-command').focus();
    };

    // Main AI function
    window.runAI = async () => {
        const command = document.getElementById('ai-command').value.trim();
        if (!command) return alert('Pick a preset first!');

        const btn = document.querySelector('.ai-btn');
        const resultDiv = document.getElementById('ai-result');
        const progress = document.getElementById('progress-container');
        const progressBar = document.getElementById('progress-bar');
        
        btn.disabled = true; btn.textContent = '⏳ AI Working...';
        resultDiv.style.display = 'none'; progress.style.display = 'block';

        try {
            progressBar.style.width = '30%';
            const response = await new Promise((resolve, reject) => {
                GM_xmlhttpRequest({
                    method: 'POST',
                    url: 'http://localhost:5000/analyze',
                    headers: { 'Content-Type': 'application/json' },
                    data: JSON.stringify({
                        url: window.location.href,
                        command: command
                    }),
                    timeout: 45000,
                    onload: res => resolve(JSON.parse(res.responseText)),
                    onerror: () => reject(new Error('Server offline!')),
                    ontimeout: () => reject(new Error('AI timeout!'))
                });
            });
            
            progressBar.style.width = '100%';
            resultDiv.innerHTML = `
                <div style="font-weight:600;color:#059669;margin-bottom:12px;">✅ ${command}</div>
                <div style="white-space:pre-wrap;">${response.result}</div>
                <button class="ai-btn" onclick="navigator.clipboard.writeText(\`${response.result.replace(/`/g, '\\`')}\`);this.textContent='✅ Copied!';setTimeout(()=>this.textContent='Copy',2000);" style="margin-top:12px;font-size:14px;">📋 Copy</button>
            `;
            resultDiv.style.display = 'block';
        } catch (e) {
            resultDiv.innerHTML = `
                <div style="color:#dc2626;">❌ ${e.message}</div>
                <div style="font-size:14px;color:#6b7280;margin-top:8px;">
                    💡 Terminal 1: python web_agent.py<br>
                    💡 Terminal 2: ollama serve
                </div>
            `;
            resultDiv.style.display = 'block';
        } finally {
            btn.disabled = false; btn.textContent = '🚀 Analyze Page';
            setTimeout(() => { progress.style.display = 'none'; progressBar.style.width = '0%'; }, 1000);
        }
    };

    // Keyboard shortcuts
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape') closeAI();
        if (e.key === 'Enter' && e.ctrlKey) runAI();
    });

    // Auto-focus
    setTimeout(() => document.getElementById('ai-command')?.focus(), 500);
})();
