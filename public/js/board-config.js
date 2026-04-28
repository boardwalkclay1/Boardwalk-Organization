// js/board-config.js
window.BoardConfig = {
  members: {
    admin: {
      id: 'admin',
      name: 'Clayvonte',
      role: 'Founder & Executive Director',
      focusAreas: ['Vision', 'Systems', 'Board Coordination'],
      tools: ['my-overview', 'my-tasks', 'messages', 'docs', 'events', 'youth-notes', 'sponsor-tools'],
      guide: [
        'Review all open tasks and make sure each has an owner and a clear next step.',
        'Check sponsor and donor notes weekly and identify who needs a follow-up.',
        'Coordinate with Program Lead on youth training cycles and community projects.',
        'Ensure legal, terms, and privacy pages stay accurate and up to date.',
        'Use messages to keep the board aligned on priorities and timelines.'
      ]
    },
    treasurer: {
      id: 'treasurer',
      name: 'Jane Doe',
      role: 'Treasurer',
      focusAreas: ['Finance', 'Sponsors', 'Donor Relations'],
      tools: ['my-overview', 'my-tasks', 'messages', 'docs', 'events', 'sponsor-tools'],
      guide: [
        'Monitor sponsor and donor activity and keep notes current.',
        'Use Sponsor Tools to log calls, emails, and follow-ups.',
        'Coordinate with Admin on donation campaigns and reporting.',
        'Review financial-related documents in Shared Documents regularly.',
        'Join events that involve sponsors when possible to build relationships.'
      ]
    },
    programLead: {
      id: 'programLead',
      name: 'John Smith',
      role: 'Program Lead',
      focusAreas: ['Youth Training', 'Field Operations', 'Community Projects'],
      tools: ['my-overview', 'my-tasks', 'messages', 'docs', 'events', 'youth-notes'],
      guide: [
        'Use Youth & Program Notes to log progress, incidents, and ideas after each field day.',
        'Coordinate with Admin on upcoming training cycles and event needs.',
        'Keep My Tasks updated so everyone knows what’s in motion.',
        'Share feedback from youth and mentors in Board Messages.',
        'Review program-related documents and training outlines regularly.'
      ]
    }
  }
};
