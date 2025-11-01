// statusSvgs.js
export const statusSvgs = {
  available: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" role="img" aria-label="Available">
    <circle cx="8" cy="8" r="7" fill="#10B981"/>
  </svg>`,

  busy: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" role="img" aria-label="Busy">
    <circle cx="8" cy="8" r="7" fill="#EF4444"/>
  </svg>`,

  do_not_disturb: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" role="img" aria-label="Do not disturb">
    <circle cx="8" cy="8" r="7" fill="#EF4444"/>
    <rect x="3.2" y="7.2" width="9.6" height="1.6" rx="0.8" fill="#FFF"/>
  </svg>`,

  be_right_back: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" role="img" aria-label="Be right back">
    <circle cx="8" cy="8" r="7" fill="#F59E0B"/>
    <!-- clock hands -->
    <line x1="8" y1="8" x2="8" y2="5.2" stroke="#fff" stroke-width="1.2" stroke-linecap="round"/>
    <line x1="8" y1="8" x2="10.2" y2="8" stroke="#fff" stroke-width="1.2" stroke-linecap="round"/>
  </svg>`,

  appear_away: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" role="img" aria-label="Appear away">
    <circle cx="8" cy="8" r="7" fill="#FBBF24"/>
    <circle cx="8" cy="8" r="2.2" fill="#fff" opacity="0.08"/>
  </svg>`,

  appear_offline: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" role="img" aria-label="Appear offline">
    <circle cx="8" cy="8" r="7" fill="#9CA3AF"/>
  </svg>`,

  offline: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" role="img" aria-label="Offline">
    <circle cx="8" cy="8" r="6.2" fill="none" stroke="#6B7280" stroke-width="1.6"/>
  </svg>`,

  logout: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" role="img" aria-label="Logout">
    <g fill="none" stroke="#6B7280" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 3.2v2.4"/>
      <path d="M4.2 6.6a4 4 0 1 0 7.6 0"/>
    </g>
  </svg>`
};
