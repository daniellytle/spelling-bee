import { SpellingBee } from 'spelling-bee-word-list';

import GameController from './GameController.js';

function GameModule() {

  const { letters, validWords } = new SpellingBee()

  return (
    <GameController letters={letters} validWords={validWords} />
  );
}

export default GameModule;
