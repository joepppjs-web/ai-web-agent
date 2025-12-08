// ==UserScript==
// @name         Fireb AI Web Analyzer
// @namespace    https://github.com/joepppjs-web/ai-web-agent
// @version      3.2
// @description  Mobile + Desktop AI for ANY webpage!
// @author       joepppjs-web
// @match        *://*/*
// @grant        GM_xmlhttpRequest
// @grant        GM_addStyle
// @icon         https://github.com/fluidicon.png
// ==/UserScript==

(function() {
    'use strict';
    
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
        .status.error { background: #fee2e2
