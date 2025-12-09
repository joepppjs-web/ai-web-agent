// ==UserScript==
// @name         🌌 ULTIMATE AI Neural Interface v9.0 (Autonomous Human Brain)
// @namespace    http://localhost
// @version      9.0
// @description  GOD MODE: Galaxy Neural Network, Autonomous Learning, Perfect UX
// @author       Fireb + Perplexity AI (Ultimate Edition)
// @match        *://*/*
// @grant        GM_xmlhttpRequest
// @grant        GM_addStyle
// @run-at       document-start
// ==/UserScript==

(function() {
    'use strict';

    if (window.__ultimateAI) return;
    window.__ultimateAI = true;

    // 🌌 ULTIMATE GALAXY CSS - Neural Interface Design
    GM_addStyle(`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Inter:wght@300;400;500;600&display=swap');
        
        #ultimate-ai-panel {
            --primary-glow: #00f5ff, #ff00ff, #00ff88, #ffaa00;
            --neural-blue: linear-gradient(135deg, #0c0c2f 0%, #1a1a4e 50%, #2d2d6b 100%);
            --galaxy-bg: radial-gradient(circle at 20% 20%, rgba(120,119,198,0.4) 0%, transparent 50%),
                         radial-gradient(circle at 80% 80%, rgba(255,119,198,0.3) 0%, transparent 50%),
                         radial-gradient(circle at 40% 60%, rgba(120,219,255,0.3) 0%, transparent 50%),
                         linear-gradient(135deg, #0c0c2f 0%, #1a1a4e 30%, #2d2d6b 70%, #4a4a8a 100%);
            --glass: rgba(255,255,255,0.1);
            --glass-glow: rgba(255,255,255,0.2);
            --neon-glow: 0 0 20px rgba(0,245,255,0.6), 0 0 40px rgba(0,245,255,0.3);
            
            position: fixed !important;
            top: 20px !important;
            right: 20px !important;
            z-index: 2147483647 !important;
            width: 380px !important;
            height: 620px !important;
            max-height: 85vh !important;
            border-radius: 32px !important;
            background: var(--galaxy-bg) !important;
            backdrop-filter: blur(32px) saturate(180%) !important;
            border: 1px solid var(--glass) !important;
            box-shadow: 
                var(--neon-glow),
                0 32px 64px rgba(0,0,0,0.6),
                inset 0 1px 0 rgba(255,255,255,0.2) !important;
            font-family: 'Inter', -apple-system, sans-serif !important;
            transition: all 0.4s cubic-bezier(0.23,1,0.320,1) !important;
            pointer-events: auto !important;
            overflow: hidden !important;
            animation: neuralBoot 1.2s cubic-bezier(0.23,1,0.320,1);
        }
        
        @keyframes neuralBoot {
            0% { opacity: 0; transform: scale(0.7) translateX(100px) rotate(5deg); }
            50% { opacity: 0.7; transform: scale(1.05) translateX(-10px) rotate(-2deg); }
            100% { opacity: 1; transform: scale(1) translateX(0) rotate(0); }
        }
        
        #ultimate-ai-panel:hover {
            box-shadow: 
                0 0 40px rgba(0,245,255,0.8), 
                0 0 80px rgba(255,0,255,0.4),
                0 32px 64px rgba(0,0,0,0.8) !important;
            transform: translateY(-4px) !important;
        }
        
        #ultimate-ai-panel.collapsed {
            width: 72px !important; height: 72px !important;
            border-radius: 50% !important;
        }
        
        .neural-header {
            height: 100px !important;
            background: 
                linear-gradient(135deg, rgba(12,12,47,0.95) 0%, rgba(45,45,107,0.9) 100%),
                var(--galaxy-bg);
            position: relative !important;
            overflow: hidden !important;
            display: flex !important;
            flex-direction: column !important;
            align-items: center !important;
            justify-content: center !important;
            color: white !important;
            text-align: center !important;
            cursor: grab !important;
            user-select: none !important;
        }
        
        .neural-header:active { cursor: grabbing !important; }
        
        .ai-title {
            font-family: 'Orbitron', monospace !important;
            font-size: 22px !important;
            font-weight: 900 !important;
            letter-spacing: 2px !important;
            background: linear-gradient(45deg, #00f5ff, #ff00ff, #00ff88) !important;
            -webkit-background-clip: text !important;
            -webkit-text-fill-color: transparent !important;
            background-clip: text !important;
            margin: 0 !important;
            text-shadow: 0 0 20px rgba(0,245,255,0.8) !important;
            animation: titleGlow 2s ease-in-out infinite alternate !important;
        }
        
        @keyframes titleGlow {
            from { filter: drop-shadow(0 0 10px rgba(0,245,255,0.8)); }
            to { filter: drop-shadow(0 0 25px rgba(255,0,255,0.8)); }
        }
        
        .ai-subtitle {
            font-size: 12px !important;
            opacity: 0.9 !important;
            margin-top: 4px !important;
            font-weight: 500 !important;
        }
        
        .neural-particles {
            position: absolute !important;
            top: 0 !important;
            left: 0 !important;
            right: 0 !important;
            bottom: 0 !important;
            pointer-events: none !important;
            background-image: 
                radial-gradient(2px 2px at 20px 30px, #ff00ff, transparent),
                radial-gradient(2px 2px at 40px 70px, rgba(0,255,136,0.8), transparent),
                radial-gradient(1px 1px at 90px 40px, #00f5ff, transparent),
                radial-gradient(1px 1px at 130px 80px, #ffaa00, transparent);
            background-repeat: repeat !important;
            background-size: 200px 100px !important;
            animation: particleFloat 20s linear infinite !important;
            opacity: 0.3 !important;
        }
        
        @keyframes particleFloat {
            0% { transform: translateY(0px) rotate(0deg); }
            100% { transform: translateY(-100px) rotate(360deg); }
        }
        
        .toggle-btn {
            position: absolute !important;
            left: 20px !important;
            top: 50% !important;
            transform: translateY(-50%) !important;
            width: 48px !important;
            height: 48px !important;
            border-radius: 50% !important;
            border: 2px solid var(--glass-glow) !important;
            background: var(--glass) !important;
            backdrop-filter: blur(20px) !important;
            color: white !important;
            font-size: 20px !important;
            font-weight: bold !important;
            cursor: pointer !important;
            transition: all 0.3s cubic-bezier(0.23,1,0.320,1) !important;
            box-shadow: var(--neon-glow) !important;
        }
        
        .toggle-btn:hover {
            transform: translateY(-50%) scale(1.1) !important;
            background: rgba(0,245,255,0.2) !important;
            box-shadow: 0 0 30px rgba(0,245,255,1) !important;
        }
        
        .neural-content {
            flex: 1 !important;
            padding: 28px !important;
            overflow-y: auto !important;
            background: rgba(12,12,47,0.85) !important;
            backdrop-filter: blur(20px) !important;
            border-top: 1px solid var(--glass) !important;
        }
        
        .preset-grid {
            display: grid !important;
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 14px !important;
            margin-bottom: 20px !important;
        }
        
        .preset-btn {
            height: 64px !important;
            border: 2px solid rgba(255,255,255,0.15) !important;
            background: rgba(255,255,255,0.08) !important;
            backdrop-filter: blur(16px) !important;
            border-radius: 20px !important;
            font-size: 13px !important;
            font-weight: 600 !important;
            color: #e5e7eb !important;
            cursor: pointer !important;
            transition: all 0.3s cubic-bezier(0.23,1,0.320,1) !important;
            position: relative !important;
            overflow: hidden !important;
        }
        
        .preset-btn::before {
            content: '' !important;
            position: absolute !important;
            top: 0 !important;
            left: -100% !important;
            width: 100% !important;
            height: 100% !important;
            background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent) !important;
            transition: left 0.6s !important;
        }
        
        .preset-btn:hover::before { left: 100% !important; }
        .preset-btn:hover {
            border-color: rgba(0,245,255,0.6) !important;
            background: rgba(0,245,255,0.15) !important;
            transform: translateY(-4px) !important;
            box-shadow: var(--neon-glow) !important;
            color: white !important;
        }
        
        .preset-btn.active {
            border-color: #00f5ff !important;
            background: linear-gradient(135deg, rgba(0,245,255,0.25), rgba(255,0,255,0.2)) !important;
            box-shadow: 0 0 25px rgba(0,245,255,0.6) !important;
            color: white !important;
        }
        
        .neural-input {
            width: 100% !important;
            padding: 16px 20px !important;
            border: 2px solid rgba(255,255,255,0.15) !important;
            border-radius: 20px !important;
            background: rgba(255,255,255,0.05) !important;
            backdrop-filter: blur(20px) !important;
            color: #e5e7eb !important;
            font-size: 15px !important;
            margin-bottom: 16px !important;
            transition: all 0.3s cubic-bezier(0.23,1,0.320,1) !important;
            box-sizing: border-box !important;
        }
        
        .neural-input:focus {
            outline: none !important;
            border-color: #00f5ff !important;
            box-shadow: 
                0 0 0 4px rgba(0,245,255,0.2),
                var(--neon-glow) !important;
            background: rgba(0,245,255,0.08) !important;
        }
        
        .analyze-btn {
            width: 100% !important;
            height: 56px !important;
            border: none !important;
            border-radius: 24px !important;
            font-size: 16px !important;
            font-weight: 700 !important;
            font-family: 'Orbitron', monospace !important;
            letter-spacing: 1px !important;
            cursor: pointer !important;
            position: relative !important;
            overflow: hidden !important;
            transition: all 0.4s cubic-bezier(0.23,1,0.320,1) !important;
        }
        
        .analyze-btn.primary {
            background: linear-gradient(135deg, #00f5ff 0%, #0099ff 50%, #00ff88 100%) !important;
            color: #0c0c2f !important;
            box-shadow: 0 12px 32px rgba(0,245,255,0.4) !important;
        }
        
        .analyze-btn.primary:hover:not(:disabled) {
            transform: translateY(-6px) scale(1.02) !important;
            box-shadow: 0 20px 48px rgba(0,245,255,0.6) !important;
        }
        
        .analyze-btn:disabled {
            opacity: 0.6 !important;
            cursor: not-allowed !important;
        }
        
        .neural-status {
            padding: 12px 16px !important;
            border-radius: 16px !important;
            margin: 12px 0 !important;
            font-weight: 600 !important;
            text-align: center !important;
            font-size: 13px !important;
            backdrop-filter: blur(16px) !important;
        }
        
        .status-success {
            background: rgba(0,255,136,0.15) !important;
            border: 1px solid rgba(0,255,136,0.4) !important;
            color: #00ff88 !important;
        }
        
        .status-thinking {
            background: rgba(0,245,255,0.15) !important;
            border: 1px solid rgba(0,245,255,0.4) !important;
            color: #00f5ff !important;
            animation: pulse 1.5s infinite !important;
        }
        
        @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.7; }
        }
        
        .status-error {
            background: rgba(255,68,68,0.15) !important;
            border: 1px solid rgba(255,68,68,0.4) !important;
            color: #ff4444 !important;
        }
        
        .neural-result {
            background: rgba(255,255,255,0.06) !important;
            backdrop-filter: blur(20px) !important;
            border-radius: 24px !important;
            padding: 24px !important;
            margin-top: 20px !important;
            border-left: 4px solid #00f5ff !important;
            font-size: 14px !important;
            line-height: 1.7 !important;
            white-space: pre-wrap !important;
            color: #e5e7eb !important;
            max-height: 280px !important;
            overflow-y: auto !important;
            box-shadow: inset 0 1px 0 rgba(255,255,255,0.1) !important;
            display: none !important;
        }
        
        .result-command {
            font-weight: 700 !important;
            color: #00f5ff !important;
            margin-bottom: 16px !important;
            font-size: 15px !important;
            padding-bottom: 12px !important;
            border-bottom: 1px solid rgba(0,245,255,0.2) !important;
        }
        
        .copy-btn {
            width: 100% !important;
            margin-top: 16px !important;
            padding: 12px !important;
            background: linear-gradient(135deg, #ff6b6b, #ff8e8e) !important;
            color: white !important;
            border: none !important;
            border-radius: 20px !important;
            font-weight: 600 !important;
            cursor: pointer !important;
            transition: all 0.3s !important;
        }
        
        .copy-btn:hover {
            transform: translateY(-2px) !important;
            box-shadow: 0 12px 32px rgba(255,107,107,0.4) !important;
        }
        
        .neural-progress {
            position: absolute !important;
            bottom: 20px !important;
            left: 28px !important;
            right: 28px !important;
            height: 4px !important;
            background: rgba(255,255,255,0.1) !important;
            border-radius: 2px !important;
            overflow: hidden !important;
        }
        
        .progress-fill {
            height: 100% !important;
            background: linear-gradient(90deg, #00f5ff, #ff00ff) !important;
            border-radius: 2px !important;
            transition: width 0.3s !important;
            box-shadow: 0 0 12px rgba(0,245,255,0.6) !important;
        }
        
        /* Mobile */
        @media (max-width: 900px) {
            #ultimate-ai-panel {
                left: 10px !important;
                right: 10px !important;
                top: 10px !important;
                width: calc(100vw - 20px) !important;
                height: calc(100vh - 20px) !important;
                max-height: none !important;
                border-radius: 24px !important;
            }
        }
    `);

    // 🌌 MAIN PANEL CREATION
    const panel = document.createElement('div');
    panel.id = 'ultimate-ai-panel';
    
    panel.innerHTML = `
        <div class="neural-header">
            <div class="neural-particles"></div>
            <button class="toggle-btn" id="neural-toggle">⋮⋮</button>
            <h1 class="ai-title">NEURAL AI v9.0</h1>
            <p class="ai-subtitle">Autonomous Human-Level Intelligence</p>
        </div>
        <div class="neural-content">
            <div class="preset-grid" id="preset-grid">
                <button class="preset-btn active" data-command="Summarize this page in 3 key bullets" data-type="0">📝 Summary</button>
                <button class="preset-btn" data-command="Extract all important key points as bullets" data-type="1">🔹 Key Points</button>
                <button class="preset-btn" data-command="Find and list the top 5 most important items" data-type="2">⭐ Top Items</button>
                <button class="preset-btn" data-command="Analyze deeper insights and patterns" data-type="3">💡 Insights</button>
                <button class="preset-btn" data-command="Show complete page structure and headers" data-type="4">📊 Structure</button>
            </div>
            <input type="text" class="neural-input" id="neural-input" placeholder="Neural command... (or use presets)">
            <button class="analyze-btn primary" id="analyze-btn">⚡ ACTIVATE NEURAL ANALYSIS</button>
            <div id="neural-status"></div>
            <div id="neural-result">
                <div class="result-command" id="result-command"></div>
                <div id="result-content"></div>
                <button class="copy-btn" id="copy-btn">🚀 COPY TO CLIPBOARD</button>
            </div>
            <div class="neural-progress"><div class="progress-fill" id="progress-fill" style="width:0%"></div></div>
        </div>
    `;

    document.documentElement.appendChild(panel);

    // 🎛️ ALL CONTROLS
    const input = document.getElementById('neural-input');
    const analyzeBtn = document.getElementById('analyze-btn');
    const resultDiv = document.getElementById('neural-result');
    const statusDiv = document.getElementById('neural-status');
    const presets = document.querySelectorAll('.preset-btn');
    const toggleBtn = document.getElementById('neural-toggle');
    const progressFill = document.getElementById('progress-fill');
    const copyBtn = document.getElementById('copy-btn');
    const resultCommand = document.getElementById('result-command');
    const resultContent = document.getElementById('result-content');

    let isCollapsed = false;
    let isAnalyzing = false;

    // 🎨 UTILITY FUNCTIONS
    function showStatus(message, type = 'success') {
        statusDiv.innerHTML = `<div class="neural-status status-${type}">${message}</div>`;
    }

    function setProgress(percent) {
        progressFill.style.width = `${percent}%`;
    }

    function setPreset(btn) {
        input.value = btn.dataset.command;
        presets.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        input.focus();
    }

    function togglePanel() {
        isCollapsed = !isCollapsed;
        panel.classList.toggle('collapsed', isCollapsed);
        toggleBtn.textContent = isCollapsed ? '▷' : '⋮⋮';
    }

    // 🧠 NEURAL ANALYSIS ENGINE
    async function neuralAnalyze() {
        const command = input.value.trim();
        if (!command) {
            showStatus('Neural command required!', 'error');
            return;
        }

        if (isAnalyzing) return;
        isAnalyzing = true;
        analyzeBtn.disabled = true;
        analyzeBtn.textContent = '⚡ NEURAL PROCESSING...';
        resultDiv.style.display = 'none';
        showStatus('🔥 Initializing neural pathways...', 'thinking');
        setProgress(0);

        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 20000);

        try {
            setProgress(25);
            showStatus('🧠 Pattern recognition active...', 'thinking');
            
            const response = await new Promise((resolve, reject) => {
                GM_xmlhttpRequest({
                    method: 'POST',
                    url: 'http://localhost:5000/analyze',
                    headers: { 'Content-Type': 'application/json' },
                    data: JSON.stringify({ 
                        url: window.location.href, 
                        command: command 
                    }),
                    signal: controller.signal,
                    timeout: 20000,
                    onload: res => {
                        try {
                            resolve(JSON.parse(res.responseText));
                        } catch (e) {
                            reject(new Error('Neural parsing error'));
                        }
                    },
                    onerror: () => reject(new Error('Neural connection lost')),
                    ontimeout: () => reject(new Error('Neural timeout'))
                });
            });

            setProgress(75);
            showStatus('✨ Neural synthesis complete!', 'success');

            resultCommand.textContent = command;
            resultContent.textContent = response.result;
            resultDiv.style.display = 'block';
            setProgress(100);

            showStatus('🚀 Neural analysis complete! Ready for next synapse.', 'success');

        } catch (error) {
            showStatus(error.message, 'error');
        } finally {
            clearTimeout(timeout);
            isAnalyzing = false;
            analyzeBtn.disabled = false;
            analyzeBtn.textContent = '⚡ ACTIVATE NEURAL ANALYSIS';
            setTimeout(() => setProgress(0), 2000);
        }
    }

    // 🎛️ EVENT LISTENERS
    presets.forEach(btn => {
        btn.addEventListener('click', () => setPreset(btn));
    });

    analyzeBtn.addEventListener('click', neuralAnalyze);
    input.addEventListener('keypress', e => {
        if (e.key === 'Enter' && !isAnalyzing) {
            neuralAnalyze();
        }
    });

    toggleBtn.addEventListener('click', togglePanel);

    copyBtn.addEventListener('click', async () => {
        try {
            await navigator.clipboard.writeText(resultContent.textContent);
            const original = copyBtn.textContent;
            copyBtn.textContent = '✅ SYNAPSE COPIED!';
            copyBtn.style.background = 'linear-gradient(135deg, #00ff88, #00f5ff)';
            setTimeout(() => {
                copyBtn.textContent = original;
                copyBtn.style.background = 'linear-gradient(135deg, #ff6b6b, #ff8e8e)';
            }, 2000);
        } catch (e) {
            copyBtn.textContent = '❌ COPY FAILED';
        }
    });

    // 🖱️ DRAG FUNCTIONALITY
    let isDragging = false, startX, startY;
    const header = panel.querySelector('.neural-header');

    header.addEventListener('mousedown', e => {
        if (window.innerWidth > 900 && !isCollapsed) {
            isDragging = true;
            startX = e.clientX - panel.offsetLeft;
            startY = e.clientY - panel.offsetTop;
            panel.style.transition = 'none';
            document.body.style.userSelect = 'none';
        }
    });

    document.addEventListener('mousemove', e => {
        if (isDragging) {
            const newX = e.clientX - startX;
            const newY = e.clientY - startY;
            panel.style.left = `${Math.max(10, Math.min(newX, window.innerWidth - 400))}px`;
            panel.style.right = 'auto';
            panel.style.top = `${Math.max(10, Math.min(newY, window.innerHeight - 650))}px`;
        }
    });

    document.addEventListener('mouseup', () => {
        isDragging = false;
        panel.style.transition = 'all 0.4s cubic-bezier(0.23,1,0.320,1)';
        document.body.style.userSelect = '';
    });

    // ⌨️ KEYBOARD SHORTCUTS
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape' && !isCollapsed) {
            togglePanel();
        }
        if ((e.key === 'Enter' || e.key === ' ') && e.ctrlKey) {
            neuralAnalyze();
        }
    });

    // 📱 MOBILE SUPPORT
    function handleResize() {
        if (window.innerWidth < 900) {
            panel.style.left = '10px !important';
            panel.style.right = '10px !important';
            panel.style.top = '10px !important';
        }
    }
    window.addEventListener('resize', handleResize);
    handleResize();

    console.log('🌌 ULTIMATE NEURAL AI v9.0 ACTIVATED - Autonomous Human Intelligence');
    showStatus('🚀 Neural pathways online. Ready for synapse activation.', 'success');
})();
