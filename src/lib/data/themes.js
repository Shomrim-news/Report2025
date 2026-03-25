export const themes = [
  { id: 1, label: 'Gatekeepers/\nWatchdog Inst.', color: '#2C39E2' },
  { id: 2, label: 'Military &\nReserve Forces', color: '#5F97BC' },
  { id: 3, label: 'Judicial System/\nCourts', color: '#713EF8' },
  { id: 4, label: 'Democratic Values/\nInst. Norms', color: '#9890B4' },
  { id: 5, label: 'Land &\nPlanning', color: '#91A858' },
  { id: 6, label: 'Water &\nInfrastructure', color: '#34B0CB' },
  { id: 7, label: 'Arab\nSociety', color: '#B69A56' },
  { id: 8, label: 'Extreme\nSocial Phenomena', color: '#F7D135' },
];

/**
 * Returns the theme IDs that apply to a story.
 * Reads directly from the 'Themes (numeric)' CSV column,
 * where values are space- or newline-separated integers.
 * @param {object} story - a row from the parsed CSV
 * @returns {number[]} sorted array of unique theme IDs
 */
export function getThemeIds(story) {
  const raw = story['Themes (numeric)'] || '';
  const ids = raw
    .split(/[\s\n]+/)
    .map((s) => parseInt(s.trim()))
    .filter((n) => !isNaN(n));
  return [...new Set(ids)].sort((a, b) => a - b);
}
