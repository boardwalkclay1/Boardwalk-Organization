// js/board.js
// Core UI wiring for Board Dashboard (panel switching, active states, basic stubs)

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
  showPanel('my-overview');

  // Placeholder hooks for future modular JS
  window.BoardApp = {
    refreshMyOverview() {
      // later: fetch tasks, events, messages for this member
    },
    openLogSponsorCall() {
      // later: open sponsor call logging UI
    },
    openAddSponsorNote() {
      // later: open sponsor note UI
    },
    log(message) {
      console.log('[BoardApp]', message);
    }
  };

  // Example: sponsor tools quick actions
  document.querySelectorAll('.qa-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const label = btn.textContent.trim();
      window.BoardApp.log(`Board quick action clicked: ${label}`);
    });
  });
});
