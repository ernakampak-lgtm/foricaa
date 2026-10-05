/* ==========================================================================
   TERMINAL WIDGET & INTERACTIVE CLI TERMINAL SHELL ENGINE
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // 1. MacOS Terminal Dot Controls (Yellow = Photo/Avatar View, Red = System Profile Status)
    (function initMacOSTerminalControls() {
        const yellowBtn = document.getElementById('btn-terminal-yellow');
        const redBtn = document.getElementById('btn-terminal-red');
        const container = document.getElementById('terminal-body-container');
        const tabTitle = document.getElementById('terminal-tab-title');

        if (!container || !yellowBtn || !redBtn) return;

        // Gambar 2: System Profile Status View (Muncul saat diklik tombol Merah)
        const profileHTML = `
            <p class="text-blue-400">$ systemctl status profile-core</p>
            <p class="text-emerald-400">● Profile Active: Carissa Zahra Wardhani</p>
            <div class="border-b border-blue-900/40 my-2"></div>
            <div class="space-y-1.5 pl-2 border-l-2 border-blue-500/40">
                <p><span class="text-cyan-400">Email:</span> Carissa Zahra Wardhani</p>
                <p><span class="text-cyan-400">Focus:</span> Offensive Sec & Hardware</p>
                <p><span class="text-cyan-400">OS Spec:</span> Kali Linux / Ubuntu / WSL</p>
                <p><span class="text-cyan-400">MC Micro:</span> ESP32 & Arduino Dev</p>
                <p><span class="text-cyan-400">Financial:</span> XAUUSD & Crypto Analysis</p>
            </div>

            <p class="text-blue-400 pt-2">$ run-security-recon --verbose</p>
            <div class="bg-black/40 rounded-xl p-3 border border-blue-900/30 text-xs text-slate-400 font-mono space-y-1">
                <p class="text-blue-300">[+] Subdomain Enumeration: Completed</p>
                <p class="text-cyan-300">[+] API Vulnerability Assessment: Ready</p>
                <p class="text-emerald-300">[+] RF Hardware Link: 433MHz Connected</p>
                <p class="text-purple-300">[+] Crypto Market Sentiment: Bullish</p>
            </div>
        `;

        // Gambar 1: Photo / Avatar View (Muncul saat diklik tombol Kuning)
        const photoHTML = `
            <p class="text-cyan-400">$ display --photo --mode=3x4-portrait-view</p>
            <div class="relative rounded-2xl overflow-hidden border border-blue-500/30 bg-slate-900/90 p-4 flex flex-col sm:flex-row items-center gap-4">
                <!-- Bingkai Foto Rasio 3x4 Presisi -->
                <div class="relative shrink-0 w-28 h-36 rounded-xl overflow-hidden border-2 border-cyan-400/60 shadow-lg shadow-cyan-500/30 bg-slate-950 flex items-center justify-center group/photo">
                    <!-- Link ke GitHub dari foto 3x4 -->
                    <a href="https://github.com/XyuuAnalyst" target="_blank" rel="noopener noreferrer" class="absolute inset-0 z-10 opacity-0 group-hover/photo:opacity-100 transition-opacity duration-300" title="View GitHub Profile"></a>
                    <!-- Foto Profil -->
                    <img id="user-profile-img" src="profil/WhatsApp Image 2026-08-25 at 15.29.40.jpeg" alt="Foto 3x4 Muhammad Dava" class="w-full h-full object-cover" />
                    <!-- Overlay hint untuk GitHub -->
                    <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover/photo:opacity-100 transition-opacity duration-300 pointer-events-none">
                        <div class="bg-cyan-600/90 backdrop-blur-sm text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg flex items-center gap-2 transform scale-90 group-hover/photo:scale-100 transition-transform">
                            <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
                            GitHub
                        </div>
                    </div>
                </div>

                <!-- Informasi Profil Samping Foto -->
                <div class="space-y-2 text-center sm:text-left flex-1 min-w-0">
                    <div>
                        <h4 class="text-sm font-bold text-slate-100 leading-tight">Carissa Zahra<br><span class="text-cyan-400">Wardhani</span></h4>
                        <p class="text-[11px] text-slate-300 font-mono mt-1">Security Researcher & Hardware Eng</p>
                    </div>
                    <div class="space-y-1 text-[11px] font-mono text-slate-400 pt-1 border-t border-blue-900/40">
                        <p><span class="text-blue-400">ID Status:</span> <span class="text-emerald-400 font-bold">VERIFIED ●</span></p>
                        <p><span class="text-blue-400">Base Location:</span> Indonesia</p>
                    </div>
                    <div class="flex flex-wrap gap-1.5 pt-1 justify-center sm:justify-start">
                        <span class="px-2 py-0.5 rounded bg-blue-950 border border-blue-700/40 text-blue-300 text-[10px] font-mono">Cybersec</span>
                        <span class="px-2 py-0.5 rounded bg-cyan-950 border border-cyan-700/40 text-cyan-300 text-[10px] font-mono">ESP32</span>
                        <span class="px-2 py-0.5 rounded bg-indigo-950 border border-indigo-700/40 text-indigo-300 text-[10px] font-mono">Full-Stack</span>
                    </div>
                </div>
            </div>
        `;

        // Klik Tombol Kuning -> Tampilkan Gambar 1 (Foto / Avatar View)
        yellowBtn.addEventListener('click', () => {
            container.innerHTML = photoHTML;
            if (tabTitle) tabTitle.textContent = 'Ica-node@security-core: ~/profile-avatar.png';
        });

        // Klik Tombol Merah -> Tampilkan Gambar 2 (System Profile Status View)
        redBtn.addEventListener('click', () => {
            container.innerHTML = profileHTML;
            if (tabTitle) tabTitle.textContent = 'Ica-node@security-core:~';
        });
    })();

    // 2. Interactive Terminal System (Green Button Easter Egg & Simulated Linux Shell Modal)
    (function initInteractiveTerminalModal() {
        const modal = document.getElementById('interactive-terminal-modal');
        const greenBtn = document.getElementById('btn-terminal-green');
        const closeRed = document.getElementById('modal-term-red');
        const closeYellow = document.getElementById('modal-term-yellow');
        const closeGreen = document.getElementById('modal-term-green');
        const closeBtn = document.getElementById('modal-term-close-btn');
        const output = document.getElementById('modal-terminal-output');
        const form = document.getElementById('modal-terminal-form');
        const input = document.getElementById('modal-terminal-input');

        if (!modal || !greenBtn || !output || !form || !input) return;

        let commandHistory = [];
        let historyIndex = -1;

        const welcomeBanner = `
<pre class="text-cyan-400 font-mono text-[11px] sm:text-xs leading-tight">
┌──────────────────────────────────────────┐
│  DAVALIH TERMINAL v1.0                   │
│  Interactive Personal Portfolio Terminal │
└──────────────────────────────────────────┘
</pre>
<p class="text-slate-300 font-mono">Type <span class="text-cyan-400 font-bold">/help</span> to see available commands.</p>
`;

        function openTerminal() {
            modal.classList.remove('opacity-0', 'pointer-events-none');
            modal.classList.add('opacity-100');
            if (output.children.length === 0) {
                resetTerminal();
            }
            setTimeout(() => input.focus(), 100);
        }

        function closeTerminal() {
            modal.classList.remove('opacity-100');
            modal.classList.add('opacity-0', 'pointer-events-none');
        }

        function resetTerminal() {
            output.innerHTML = welcomeBanner;
            scrollToBottom();
        }

        function scrollToBottom() {
            setTimeout(() => {
                output.scrollTop = output.scrollHeight;
            }, 50);
        }

        greenBtn.addEventListener('click', openTerminal);
        if (closeRed) closeRed.addEventListener('click', closeTerminal);
        if (closeYellow) closeYellow.addEventListener('click', closeTerminal);
        if (closeGreen) closeGreen.addEventListener('click', closeTerminal);
        if (closeBtn) closeBtn.addEventListener('click', closeTerminal);

        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeTerminal();
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && !modal.classList.contains('pointer-events-none')) {
                closeTerminal();
            }
        });

        input.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowUp') {
                e.preventDefault();
                if (commandHistory.length > 0) {
                    if (historyIndex === -1) {
                        historyIndex = commandHistory.length - 1;
                    } else if (historyIndex > 0) {
                        historyIndex--;
                    }
                    input.value = commandHistory[historyIndex] || '';
                }
            } else if (e.key === 'ArrowDown') {
                e.preventDefault();
                if (commandHistory.length > 0 && historyIndex !== -1) {
                    if (historyIndex < commandHistory.length - 1) {
                        historyIndex++;
                        input.value = commandHistory[historyIndex];
                    } else {
                        historyIndex = -1;
                        input.value = '';
                    }
                }
            }
        });

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const rawCmd = input.value.trim();
            if (!rawCmd) return;

            commandHistory.push(rawCmd);
            historyIndex = -1;
            input.value = '';

            // Append prompt line
            const promptLine = document.createElement('div');
            promptLine.className = 'flex items-center gap-2 text-slate-300 font-mono pt-2';
            promptLine.innerHTML = `<span class="text-emerald-400 font-bold">Ica@security-core:~$</span> <span>${escapeHTML(rawCmd)}</span>`;
            output.appendChild(promptLine);

            // Process command
            const cleanCmd = rawCmd.toLowerCase();
            processCommand(cleanCmd, rawCmd);
            scrollToBottom();
        });

        function escapeHTML(str) {
            return str.replace(/[&<>"']/g, (m) => ({
                '&': '&amp;',
                '<': '&lt;',
                '>': '&gt;',
                '"': '&quot;',
                "'": '&#039;'
            })[m]);
        }

        function appendResponse(htmlContent) {
            const resDiv = document.createElement('div');
            resDiv.className = 'text-slate-300 font-mono space-y-2 pl-2 border-l-2 border-cyan-500/40 text-xs sm:text-sm';
            resDiv.innerHTML = htmlContent;
            output.appendChild(resDiv);
        }

        function processCommand(cmd, originalInput) {
            const normalized = cmd.startsWith('/') ? cmd : '/' + cmd;

            if (normalized === '/clear') {
                output.innerHTML = '';
                const initPrompt = document.createElement('p');
                initPrompt.className = 'text-emerald-400 font-mono font-bold';
                initPrompt.textContent = 'Ica@security-core:~$';
                output.appendChild(initPrompt);
                return;
            }

            if (normalized === '/help') {
                appendResponse(`
                    <p class="text-cyan-400 font-bold mb-2">Available commands:</p>
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1 font-mono text-slate-300 text-xs sm:text-sm">
                        <p><span class="text-emerald-400 font-bold">/about</span>       → Learn about me</p>
                        <p><span class="text-emerald-400 font-bold">/whoami</span>      → Personal identity</p>
                        <p><span class="text-emerald-400 font-bold">/focus</span>       → My current technical focus</p>
                        <p><span class="text-emerald-400 font-bold">/skills</span>      → Technical skills</p>
                        <p><span class="text-emerald-400 font-bold">/experience</span>  → Experience & activities</p>
                        <p><span class="text-emerald-400 font-bold">/projects</span>    → View projects</p>
                        <p><span class="text-emerald-400 font-bold">/tools</span>       → Tools & technologies</p>
                        <p><span class="text-emerald-400 font-bold">/contact</span>     → Contact information</p>
                        <p><span class="text-emerald-400 font-bold">/clear</span>       → Clear terminal</p>
                        <p><span class="text-emerald-400 font-bold">/neofetch</span>    → Display system-style profile</p>
                    </div>
                `);
            } else if (normalized === '/about') {
                appendResponse(`
                    <p class="text-cyan-400 font-bold">ABOUT ME</p>
                    <p class="text-slate-500">────────────────────────────────────</p>
                    <p>I'm a technology enthusiast focused on cybersecurity, networking, software development, and embedded systems.</p>
                    <p>I enjoy exploring how systems work, finding vulnerabilities, building technical projects, and continuously learning new technologies.</p>
                    <div class="pt-2 space-y-1">
                        <p class="text-cyan-300 font-semibold">My interests include:</p>
                        <p>→ Cybersecurity & Vulnerability Research</p>
                        <p>→ Web Security</p>
                        <p>→ Networking & Linux</p>
                        <p>→ Embedded Systems</p>
                        <p>→ Web Development</p>
                        <p>→ Crypto & Financial Market Analysis</p>
                    </div>
                `);
            } else if (normalized === '/whoami') {
                appendResponse(`
                    <div class="space-y-1">
                        <p><span class="text-cyan-400 font-bold">NAME     :</span> Carissa Zahra Wardhani</p>
                        <p><span class="text-cyan-400 font-bold">ROLE     :</span> Cybersecurity Researcher</p>
                        <p><span class="text-slate-500">         :</span> Developer</p>
                        <p><span class="text-slate-500">         :</span> Network Enthusiast</p>
                        <p><span class="text-slate-500">         :</span> Embedded Systems Builder</p>
                        <p><span class="text-slate-500">         :</span> Crypto Market Analyst</p>
                        <p><span class="text-cyan-400 font-bold">LOCATION :</span> Indonesia</p>
                        <p><span class="text-cyan-400 font-bold">STATUS   :</span> <span class="text-emerald-400">Learning • Building • Researching</span></p>
                    </div>
                `);
            } else if (normalized === '/focus') {
                appendResponse(`
                    <p class="text-cyan-400 font-bold">CURRENT FOCUS</p>
                    <p class="text-slate-500">────────────────────────────────────</p>
                    <div class="space-y-2">
                        <div>
                            <p class="text-blue-400 font-bold">[01] CYBERSECURITY</p>
                            <p class="pl-5 text-slate-300">Web Security | Vulnerability Research | Bug Hunting | Reconnaissance</p>
                        </div>
                        <div>
                            <p class="text-blue-400 font-bold">[02] NETWORKING</p>
                            <p class="pl-5 text-slate-300">Linux | TCP/IP | Network Infrastructure</p>
                        </div>
                        <div>
                            <p class="text-blue-400 font-bold">[03] EMBEDDED</p>
                            <p class="pl-5 text-slate-300">ESP32 | Arduino | PCB & Electronics</p>
                        </div>
                        <div>
                            <p class="text-blue-400 font-bold">[04] DEVELOPMENT</p>
                            <p class="pl-5 text-slate-300">Web Development | APIs | Automation</p>
                        </div>
                        <div>
                            <p class="text-blue-400 font-bold">[05] MARKET ANALYSIS</p>
                            <p class="pl-5 text-slate-300">Crypto | XAUUSD | Technical & Fundamental Analysis</p>
                        </div>
                    </div>
                `);
            } else if (normalized === '/skills') {
                appendResponse(`
                    <div class="space-y-1 font-mono">
                        <p><span class="text-cyan-400 font-bold inline-block w-36">CYBERSECURITY</span>  <span class="text-emerald-400">███████████████</span></p>
                        <p><span class="text-cyan-400 font-bold inline-block w-36">NETWORKING</span>     <span class="text-emerald-400">████████████</span></p>
                        <p><span class="text-cyan-400 font-bold inline-block w-36">DEVELOPMENT</span>    <span class="text-emerald-400">███████████</span></p>
                        <p><span class="text-cyan-400 font-bold inline-block w-36">EMBEDDED</span>       <span class="text-emerald-400">██████████</span></p>
                        <p><span class="text-cyan-400 font-bold inline-block w-36">LINUX</span>          <span class="text-emerald-400">████████████</span></p>
                        <p><span class="text-cyan-400 font-bold inline-block w-36">MARKET ANALYSIS</span> <span class="text-emerald-400">█████████</span></p>
                    </div>
                `);
            } else if (normalized === '/experience') {
                appendResponse(`
                    <p class="text-cyan-400 font-bold">EXPERIENCE / ACTIVITIES</p>
                    <p class="text-slate-500">────────────────────────────────────</p>
                    <div class="space-y-2">
                        <p><span class="text-emerald-400 font-bold">&gt; Security Research:</span> Web vulnerability research, reconnaissance & security testing</p>
                        <p><span class="text-emerald-400 font-bold">&gt; Bug Hunting:</span> Vulnerability discovery & security reporting</p>
                        <p><span class="text-emerald-400 font-bold">&gt; Networking:</span> Linux server & network configuration</p>
                        <p><span class="text-emerald-400 font-bold">&gt; Embedded Development:</span> ESP32 / Arduino / electronics projects</p>
                        <p><span class="text-emerald-400 font-bold">&gt; Technical Research:</span> Independent research & experimentation</p>
                    </div>
                `);
            } else if (normalized.startsWith('/projects')) {
                if (normalized.includes('--open')) {
                    appendResponse(`<p class="text-emerald-400">Opening Projects section...</p>`);
                    closeTerminal();
                    setTimeout(() => {
                        const target = document.getElementById('projects');
                        if (target) target.scrollIntoView({ behavior: 'smooth' });
                    }, 200);
                } else {
                    appendResponse(`
                        <p class="text-cyan-400 font-bold">PROJECT DIRECTORY</p>
                        <p class="text-slate-500">────────────────────────────────────</p>
                        <div class="space-y-1">
                            <p>[01] Cybersecurity Research</p>
                            <p>[02] Network Engineering</p>
                            <p>[03] Embedded Systems</p>
                            <p>[04] Web Development</p>
                            <p>[05] Market Analysis</p>
                        </div>
                        <p class="pt-2 text-cyan-300">Type <span class="text-emerald-400 font-bold">/projects --open</span> to jump to the Projects section.</p>
                    `);
                }
            } else if (normalized === '/tools') {
                appendResponse(`
                    <p class="text-cyan-400 font-bold">TOOLS & TECHNOLOGIES</p>
                    <p class="text-slate-500">────────────────────────────────────</p>
                    <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-1">
                        <div>
                            <p class="text-blue-400 font-bold underline">Security:</p>
                            <p>Nmap, Subfinder, httpx, ffuf, Katana, WhatWeb, Burp Suite, curl</p>
                        </div>
                        <div>
                            <p class="text-blue-400 font-bold underline">Systems:</p>
                            <p>Kali Linux, Ubuntu Server, WSL</p>
                        </div>
                        <div>
                            <p class="text-blue-400 font-bold underline">Development:</p>
                            <p>Python, JavaScript, HTML, CSS, Git</p>
                        </div>
                        <div>
                            <p class="text-blue-400 font-bold underline">Hardware:</p>
                            <p>ESP32, Arduino, Altium</p>
                        </div>
                    </div>
                `);
            } else if (normalized.startsWith('/contact')) {
                if (normalized.includes('--open')) {
                    appendResponse(`<p class="text-emerald-400">Opening Contact section...</p>`);
                    closeTerminal();
                    setTimeout(() => {
                        const target = document.getElementById('contact');
                        if (target) target.scrollIntoView({ behavior: 'smooth' });
                    }, 200);
                } else {
                    appendResponse(`
                        <p class="text-cyan-400 font-bold">Available communication channels:</p>
                        <p class="text-slate-300">Email | GitHub | LinkedIn | Instagram | TikTok | Telegram | HackerOne</p>
                        <p class="pt-2 text-cyan-300">Type <span class="text-emerald-400 font-bold">/contact --open</span> to jump to the Contact section.</p>
                    `);
                }
            } else if (normalized === '/neofetch') {
                appendResponse(`
                    <div class="flex flex-col sm:flex-row items-start gap-4 font-mono text-xs">
                        <pre class="text-cyan-400 font-bold leading-tight">
    ████████
  ██        ██
 ██  ██  ██  ██
 ██          ██
  ██  ████  ██
    ████████
                        </pre>
                        <div class="space-y-1 text-slate-300">
                            <p class="text-emerald-400 font-bold">Ica@security-core</p>
                            <p class="text-slate-500">─────────────────────</p>
                            <p><span class="text-cyan-400">OS      :</span> Kali Linux</p>
                            <p><span class="text-cyan-400">Focus   :</span> Cybersecurity</p>
                            <p><span class="text-cyan-400">Dev     :</span> Web / Python</p>
                            <p><span class="text-cyan-400">Hardware:</span> ESP32 / Arduino</p>
                            <p><span class="text-cyan-400">Network :</span> TCP/IP / Linux</p>
                            <p><span class="text-cyan-400">Market  :</span> Crypto / XAUUSD</p>
                            <p><span class="text-cyan-400">Status  :</span> <span class="text-emerald-400 font-bold">ONLINE</span></p>
                        </div>
                    </div>
                `);
            } else {
                appendResponse(`
                    <p class="text-red-400">command not found: ${escapeHTML(originalInput)}</p>
                    <p class="text-slate-400">Type <span class="text-cyan-400 font-bold">/help</span> for available commands.</p>
                `);
            }
        }
    })();
});
