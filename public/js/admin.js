// ============================================================
// BOARDWALK CLAY — ADMIN CONSOLE ENGINE (RAILWAY VERSION)
// ============================================================

document.addEventListener('DOMContentLoaded', () => {

    // ------------------------------------------------------------
    // CONFIG
    // ------------------------------------------------------------
    const API_BASE = "https://YOUR-RAILWAY-APP.up.railway.app";
    const ADMIN_KEY = "admin-999"; // <-- your real admin key

    // ------------------------------------------------------------
    // 1. PANEL SYSTEM
    // ------------------------------------------------------------
    const sidebarButtons = document.querySelectorAll('.admin-sidebar .sidebar-btn');
    const panelViews = document.querySelectorAll('.admin-panel .panel-view');

    function showPanel(panelKey) {
        panelViews.forEach(view => {
            view.classList.toggle('hidden', view.id !== `panel-${panelKey}`);
        });
        window.AdminApp.log(`Switched to panel: ${panelKey}`);
    }

    sidebarButtons.forEach((btn, index) => {
        btn.addEventListener('click', () => {
            sidebarButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            showPanel(btn.dataset.panel);
        });

        if (index === 0) {
            btn.classList.add('active');
            showPanel(btn.dataset.panel);
        }
    });

    // ------------------------------------------------------------
    // 2. ADMIN ENGINE (REAL API VERSION)
    // ------------------------------------------------------------
    window.AdminApp = {

        log(msg) {
            console.log(`[AdminApp] ${msg}`);
        },

        showPanel,

        // GENERIC API WRAPPER
        async api(endpoint, method = "GET", body = null) {
            const options = {
                method,
                headers: {
                    "Content-Type": "application/json",
                    "x-api-key": ADMIN_KEY
                }
            };

            if (body) options.body = JSON.stringify(body);

            const res = await fetch(`${API_BASE}${endpoint}`, options);
            return res.json();
        },

        // --------------------------------------------------------
        // EVENTS
        // --------------------------------------------------------
        async createEvent(event) {
            return this.api("/api/admin/events", "POST", event);
        },

        // --------------------------------------------------------
        // TASKS
        // --------------------------------------------------------
        async createTask(task) {
            return this.api("/api/admin/tasks", "POST", task);
        },

        // --------------------------------------------------------
        // SPONSORS
        // --------------------------------------------------------
        async addSponsor(sponsor) {
            return this.api("/api/admin/sponsors", "POST", sponsor);
        },

        // --------------------------------------------------------
        // LOGGING
        // --------------------------------------------------------
        addLog(entry) {
            this.log(`Log entry: ${entry}`);
        },

        // --------------------------------------------------------
        // MODULE SYSTEM
        // --------------------------------------------------------
        modules: {},

        registerModule(name, moduleObj) {
            this.modules[name] = moduleObj;
            this.log(`Module registered: ${name}`);
        }
    };

    // ------------------------------------------------------------
    // 3. QUICK ACTIONS
    // ------------------------------------------------------------
    document.querySelectorAll('.qa-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const label = btn.textContent.trim();
            window.AdminApp.log(`Quick Action: ${label}`);

            if (label.includes("Add Event")) {
                window.AdminApp.showPanel("events");
            }
        });
    });

});
