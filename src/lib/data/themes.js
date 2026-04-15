export const themes = [
  { id: 1, label: 'Democratic Inst./The Rule of Law', color: '#2C39E2' },
  { id: 2, label: 'Human Rights & Democratic Values', color: '#5F97BC' },
  { id: 3, label: 'October 7 and its Aftermath', color: '#F7D135' },
  { id: 4, label: 'Inequality, Economy & Finance', color: '#713EF8' },
  { id: 5, label: 'Marginalized Communities', color: '#9890B4' },
  { id: 6, label: 'Environment & Transportation', color: '#B69A56' },
  { id: 7, label: 'Welfare & Education', color: '#91A858' },
  { id: 8, label: 'Health', color: '#34B0CB' },
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
