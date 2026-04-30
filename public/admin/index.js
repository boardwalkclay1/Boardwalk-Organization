// ============================================================
// BOARDWALK CLAY — ADMIN ENGINE (RAILWAY VERSION)
// ============================================================

document.addEventListener("DOMContentLoaded", () => {

    const API_BASE = "https://YOUR-RAILWAY-APP.up.railway.app";
    const ADMIN_KEY = "admin-999";

    // PANEL SYSTEM
    const sidebarButtons = document.querySelectorAll(".sidebar-btn");
    const panelViews = document.querySelectorAll(".panel-view");

    function showPanel(panelKey) {
        panelViews.forEach(view => {
            view.classList.toggle("hidden", view.id !== `panel-${panelKey}`);
        });
        AdminApp.log(`Switched to panel: ${panelKey}`);
    }

    sidebarButtons.forEach((btn, index) => {
        btn.addEventListener("click", () => {
            sidebarButtons.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            showPanel(btn.dataset.panel);
        });

        if (index === 0) {
            btn.classList.add("active");
            showPanel(btn.dataset.panel);
        }
    });

    // ADMIN ENGINE
    window.AdminApp = {

        log(msg) {
            console.log(`[AdminApp] ${msg}`);
        },

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

        // EVENTS
        async createEvent() {
            const title = document.getElementById("event-title").value;
            const date = document.getElementById("event-date").value;

            const result = await this.api("/api/admin/events", "POST", {
                title,
                date
            });

            this.log("Event created");
            alert("Event saved");
        },

        // TASKS
        async createTask() {
            const title = document.getElementById("task-title").value;
            const desc = document.getElementById("task-desc").value;

            const result = await this.api("/api/admin/tasks", "POST", {
                title,
                desc
            });

            this.log("Task created");
            alert("Task saved");
        },

        // SPONSORS
        async addSponsor() {
            const name = document.getElementById("sponsor-name").value;
            const email = document.getElementById("sponsor-email").value;

            const result = await this.api("/api/admin/sponsors", "POST", {
                name,
                email
            });

            this.log("Sponsor added");
            alert("Sponsor saved");
        }
    };

});
