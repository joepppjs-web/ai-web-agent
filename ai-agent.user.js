// ==UserScript==
// @name         AI Web Analyzer (Fixed Position)
// @namespace    https://github.com/joepppjs-web/ai-web-agent
// @version      3.3
// @description  Fixed non-movable top-right panel without breaking page layout
// @author       joe
// @match        *://*/*
// @grant        GM_addStyle
// ==/UserScript==

(function() {

    GM_addStyle(`
        #ai-analyzer-panel {
            position: fixed !important;
            top: 80px !important;      /* below site headers + ads */
            right: 24px !important;    /* safe offset */
            width: 320px !important;
            background: #0A0F1C;
            color: white;
            z-index: 99990 !important; /* below ad overlays */
            border-radius: 14px;
            padding: 14px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.45);
            font-family: system-ui, sans-serif;
        }

        #ai-analyzer-panel * {
            box-sizing: border-box !important;
        }

        .ai-btn {
            width: 100%;
            padding: 10px;
            margin-bottom: 10px;
            border-radius: 10px;
            background: #111a2f;
            border: 1px solid #1d2b45;
            color: white;
            cursor: pointer;
            text-align: center;
            font-size: 14px;
        }

        .ai-btn:hover {
            background: #162240;
        }

        #ai-run {
            background: #00c45c;
            border: none;
            font-weight: bold;
        }
    `);

    // ------------------------
    // Panel HTML
    // ------------------------
    const panel = document.createElement("div");
    panel.id = "ai-analyzer-panel";
    panel.innerHTML = `
        <div style="font-size:18px; font-weight:600; margin-bottom:12px;">
            AI Web Analyzer
        </div>

        <button class="ai-btn">Summary</button>
        <button class="ai-btn">Key Points</button>
        <button class="ai-btn">Top Items</button>
        <button class="ai-btn">Insights</button>

        <input id="ai-custom" placeholder="Or type a custom instruction..."
               style="width:100%; padding:10px; border-radius:10px; border:none; margin-bottom:10px;" />

        <button id="ai-run" class="ai-btn">Analyze Page</button>
    `;

    document.body.appendChild(panel);

})();
