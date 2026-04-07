const iconPaths: Record<string, string> = {
  home:
    '<path d="M14 2L1 12h3v13h8v-7h4v7h8V12h3L14 2z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>',
  building:
    '<rect x="3" y="6" width="22" height="18" rx="2" stroke="currentColor" stroke-width="1.5"/><path d="M3 12h22M9 6v18M19 6v18" stroke="currentColor" stroke-width="1.5"/>',
  pencil:
    '<path d="M18 5l5 5-13 13H5v-5L18 5z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M15 8l5 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>',
  restoration:
    '<path d="M4 26V10l10-7 10 7v16" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M4 26h20" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><circle cx="14" cy="16" r="3" stroke="currentColor" stroke-width="1.5"/>',
  commercial:
    '<rect x="3" y="6" width="22" height="18" rx="2" stroke="currentColor" stroke-width="1.5"/><path d="M9 6V3h10v3M9 14h3m4 0h3M9 20h3m4 0h3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>',
  shell:
    '<path d="M5 26V10l9-7 9 7v16" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M5 26h18" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><path d="M10 18h8M10 22h8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-dasharray="2 3"/>',
  briefcase:
    '<rect x="3" y="8" width="22" height="16" rx="2" stroke="currentColor" stroke-width="1.5"/><path d="M14 8V5M3 16h22" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>',
  star:
    '<path d="M14 3l3 6 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1 3-6z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>',
  droplet:
    '<path d="M14 3C8 10 4 14 4 19a10 10 0 0020 0c0-5-4-9-10-16z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>',
  users:
    '<path d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><circle cx="9" cy="7" r="4" stroke="currentColor" stroke-width="1.5"/><path d="M22 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>',
  message:
    '<path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>',
  shield:
    '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>',
  lightbulb:
    '<path d="M9 18h6M10 22h4M12 2a7 7 0 00-3 13.33V18h6v-2.67A7 7 0 0012 2z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>',
  phone:
    '<path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>',
  email:
    '<path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M22 6l-10 7L2 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>',
  location:
    '<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><circle cx="12" cy="10" r="3" stroke="currentColor" stroke-width="1.5"/>',
  clock:
    '<circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="1.5"/><path d="M12 6v6l4 2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>',
};

const iconViewBoxes: Record<string, string> = {
  users: "0 0 24 24",
  message: "0 0 24 24",
  shield: "0 0 24 24",
  lightbulb: "0 0 24 24",
  phone: "0 0 24 24",
  email: "0 0 24 24",
  location: "0 0 24 24",
  clock: "0 0 24 24",
};

export function siteIcon(iconKey = "home", size = 28) {
  return `<svg width="${size}" height="${size}" viewBox="${iconViewBoxes[iconKey] ?? "0 0 28 28"}" fill="none">${iconPaths[iconKey] ?? iconPaths.home}</svg>`;
}
