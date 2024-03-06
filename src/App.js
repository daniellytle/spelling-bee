import { SpellingBee } from "spelling-bee-word-list"

import GameController from "./GameController.js"
import { format } from "date-fns"

function App() {
  const todayString = format(new Date(), "MMMM do, yyyy")
  const { letters, validWords } = new SpellingBee().getGameForDate(new Date())

  return (
    <div className="App touch-manipulation">
      <header className="flex flex-col text-center py-2 md:py-4 mb-6 border border-gray-200">
        <span className="text-4xl font-bold">Free Bee</span>
        <span className="">{todayString}</span>
      </header>
      <GameController letters={letters} validWords={validWords} />
    </div>
  )
}

export default App
