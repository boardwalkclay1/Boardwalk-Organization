// js/admin.js
// Core UI wiring for Admin Console (panel switching, active states, basic stubs)

document.addEventListener('DOMContentLoaded', () => {
  const sidebarButtons = document.querySelectorAll('.admin-sidebar .sidebar-btn');
  const panelViews = document.querySelectorAll('.admin-panel .panel-view');

  function showPanel(panelKey) {
    panelViews.forEach(view => {
      if (view.id === `panel-${panelKey}`) {
        view.classList.remove('hidden');
      } else {
        view.classList.add('hidden');
      }
    });
  }

  sidebarButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const key = btn.dataset.panel;

      // active state
      sidebarButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // show panel
      showPanel(key);
    });
  });

  // Default panel
  showPanel('overview');

  // Placeholder hooks for future modular JS
  window.AdminApp = {
    refreshOverview() {
      // later: fetch stats, update DOM
    },
    openAddMemberModal() {
      // later: open modal to add board member
    },
    openNewTaskModal() {
      // later: open modal to create global task
    },
    openCreateEventModal() {
      // later: open modal to create event
    },
    log(message) {
      console.log('[AdminApp]', message);
    }
  };

  // Example: quick action buttons wiring (optional)
  document.querySelectorAll('.qa-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const label = btn.textContent.trim();
      window.AdminApp.log(`Quick action clicked: ${label}`);
    });
  });
});
