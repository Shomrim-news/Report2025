export const themes = [
  { id: 1, label: 'Democratic\nInst. / The Rule\nof Law', color: '#2C39E2' },
  { id: 2, label: 'Human Rights\n& Democratic\nValues', color: '#5F97BC' },
  { id: 3, label: 'October 7\nand its\nAftermath', color: '#F7D135' },
  { id: 4, label: 'Inequality,\nEconomy &\nFinance', color: '#713EF8' },
  { id: 5, label: 'Marginalized\nCommunities', color: '#9890B4' },
  { id: 6, label: 'Environment\n& Transport.', color: '#B69A56' },
  { id: 7, label: 'Welfare &\nEducation', color: '#91A858' },
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
