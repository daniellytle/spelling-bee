import pickRandom from 'pick-random';
import Words from 'an-array-of-english-words';

import GameController from './GameController.js';

function GameModule() {
  
  const getValidLetters = () => {
    const ALPHABET = [...'abcdefghijklmnopqrstuvwxyz'];
    let potentialLetters = pickRandom(ALPHABET, {count: 7})
    // Ensure letters includes at least 1 vowel
    while (potentialLetters.filter(x => [...'aeiou'].includes(x)).length === 0) {
      potentialLetters = pickRandom(ALPHABET, {count: 7})
    }
    return potentialLetters;
  }

  const getAllApplicableWords = (letters) => {
    return Words.filter((word) => word.length > 3 && word.split('').every((a) => letters.includes(a)))
  }

  const letters = getValidLetters();
  const validWords = getAllApplicableWords(letters);
  const validWordsMap = validWords.reduce((map, str) => {
    map[str] = true;
    return map;
  }, {});

  return (
    <GameController letters={letters} validWordsMap={validWordsMap} />
  );
}

export default GameModule;
