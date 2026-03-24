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

// Maps each subject value (as it appears in the CSV) to one or more theme IDs.
// A story can belong to multiple themes when its subjects span several areas.
// 'October 7 War' maps to both military (2) and extreme social phenomena (8)
// since the two lenses cannot be separated from the subject field alone.
const SUBJECT_TO_THEME_IDS = {
  'Democratic Institutions and the Rule of Law': [1],
  'October 7 War':                               [2, 8],
  'October 7 War, Health':                       [2, 8],
  'Democracy & Society':                         [4],
  'Human Rights & Democratic Values':            [4],
  'Human Rights & Democratic Values, Democracy & Society': [4],
  'Economy, Finance, Inequality, Poverty':       [5],
  'Education':                                   [4],
  'Environment & Transportation':                [6],
  'Health':                                      [8],
  'Health, Environment & Transportation':        [6],
  'Health-Welfare':                              [8],
  'Welfare':                                     [8],
  'Marginalized Communities':                    [7],
};

/**
 * Returns the theme IDs that apply to a story.
 * Subjects in the CSV are newline-separated; each is looked up independently.
 * @param {object} story - a row from the parsed CSV
 * @returns {number[]} sorted array of unique theme IDs
 */
export function getThemeIds(story) {
  const ids = new Set();
  const raw = story['Subject'] || '';
  for (const subject of raw.split('\n')) {
    const mapped = SUBJECT_TO_THEME_IDS[subject.trim()];
    if (mapped) mapped.forEach((id) => ids.add(id));
  }
  return [...ids].sort((a, b) => a - b);
}
