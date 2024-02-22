import { SpellingBee } from "spelling-bee-word-list"

import GameController from "./GameController.js"

function App() {

  const { letters, validWords } = new SpellingBee()

  return (
    <div className="App touch-manipulation">
      <header>
        <h1 className='text-center py-4 md:py-10 text-4xl font-bold'>Free Bee</h1>
      </header>
      <GameController letters={letters} validWords={validWords} />
    </div>
  );
}

export default App;
