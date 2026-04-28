// ============================================================
// BOARDWALK CLAY — UNIFIED BOARD DASHBOARD ENGINE
// ============================================================
// This file controls EVERYTHING for the board dashboard.
// Panels, personalization, tools, guides, logic, modular hooks.
// ============================================================

document.addEventListener('DOMContentLoaded', () => {

    // ------------------------------------------------------------
    // 1. DETERMINE LOGGED-IN MEMBER
    // ------------------------------------------------------------
    // Later: Cloudflare Worker will set this dynamically.
    // For now, change this to test different dashboards:
    const currentMemberId = window.currentBoardMember || 'treasurer';
    const config = window.BoardConfig;
    const member = config.members[currentMemberId];

    if (!member) {
        console.error('No board member found for ID:', currentMemberId);
        return;
    }

    // ------------------------------------------------------------
    // 2. PERSONALIZE HEADER
    // ------------------------------------------------------------
    document.getElementById('board-role-subtitle').textContent =
        `${member.role} Dashboard`;

    document.getElementById('board-role-badge').textContent =
        member.role;

    document.getElementById('board-name-heading').textContent =
        `${member.name} — My Overview`;

    // ------------------------------------------------------------
    // 3. BUILD SIDEBAR BASED ON MEMBER TOOLS
    // ------------------------------------------------------------
    const sidebar = document.getElementById('board-sidebar');
    sidebar.innerHTML = '';

    const toolLabels = {
        'my-overview': 'My Overview',
        'my-tasks': 'My Tasks',
        'messages': 'Board Messages',
        'docs': 'Shared Documents',
        'events': 'Events & Calendar',
        'youth-notes': 'Youth & Program Notes',
        'sponsor-tools': 'Sponsor & Donor Tools'
    };

    const sections = [
        { label: 'My Work', tools: ['my-overview', 'my-tasks', 'messages'] },
        { label: 'Resources', tools: ['docs', 'events', 'youth-notes', 'sponsor-tools'] }
    ];

    sections.forEach(section => {
        const available = section.tools.filter(t => member.tools.includes(t));
        if (!available.length) return;

        const labelDiv = document.createElement('div');
        labelDiv.className = 'sidebar-section-label';
        labelDiv.textContent = section.label;
        sidebar.appendChild(labelDiv);

        available.forEach(toolKey => {
            const btn = document.createElement('button');
            btn.className = 'sidebar-btn';
            btn.dataset.panel = toolKey;
            btn.textContent = toolLabels[toolKey] || toolKey;
            sidebar.appendChild(btn);
        });
    });

    // ------------------------------------------------------------
    // 4. PANEL SWITCHING LOGIC
    // ------------------------------------------------------------
    const sidebarButtons = sidebar.querySelectorAll('.sidebar-btn');
    const panelViews = document.querySelectorAll('.panel-view');

    function showPanel(panelKey) {
        panelViews.forEach(view => {
            view.classList.toggle('hidden', view.id !== `panel-${panelKey}`);
        });
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
    // 5. LOAD PERSONALIZED GUIDE + FOCUS AREAS
    // ------------------------------------------------------------
    const guideList = document.getElementById('board-guide-list');
    const focusList = document.getElementById('board-focus-list');

    if (guideList) {
        guideList.innerHTML = '';
        member.guide.forEach(line => {
            const li = document.createElement('li');
            li.textContent = line;
            guideList.appendChild(li);
        });
    }

    if (focusList) {
        focusList.innerHTML = '';
        member.focusAreas.forEach(area => {
            const li = document.createElement('li');
            li.textContent = area;
            focusList.appendChild(li);
        });
    }

    // ------------------------------------------------------------
    // 6. EXPOSE MODULAR API FOR FUTURE FEATURES
    // ------------------------------------------------------------
    window.BoardApp = {
        member,
        showPanel,
        log(msg) {
            console.log(`[BoardApp] (${member.name})`, msg);
        },
        refreshTasks() {
            // Later: fetch tasks for this member
        },
        refreshEvents() {
            // Later: fetch events for this member
        },
        refreshMessages() {
            // Later: fetch messages for this member
        },
        addNote(note) {
            // Later: save youth/program notes
        }
    };

    // ------------------------------------------------------------
    // 7. QUICK ACTION BUTTON LOGGING
    // ------------------------------------------------------------
    document.querySelectorAll('.qa-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            window.BoardApp.log(`Quick action: ${btn.textContent.trim()}`);
        });
    });

});
