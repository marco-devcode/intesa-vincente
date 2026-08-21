/**
 * Mescola un array di parole utilizzando l'algoritmo di Fisher-Yates
 * @param {Array} array 
 * @returns {Array} Nuovo array mescolato in modo casuale
 */
export function shuffleDeck(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

/**
 * Filtra il mazzo di parole in base ai criteri selezionati
 * @param {Array} words 
 * @param {Object} filters - { difficulty: 'tutti'|'facile'|'medio'|'difficile', category: 'tutti'|string }
 * @returns {Array} Mazzo filtrato
 */
export function filterDeck(words, filters = {}) {
  const { difficulty = 'tutti', category = 'tutti' } = filters;
  
  return words.filter((item) => {
    const matchesDifficulty = difficulty === 'tutti' || item.difficulty === difficulty;
    const matchesCategory = category === 'tutti' || item.category === category;
    return matchesDifficulty && matchesCategory;
  });
}
