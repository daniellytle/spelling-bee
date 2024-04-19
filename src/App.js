import { SpellingBee } from "spelling-bee-word-list"

import GameController from "./GameController"
import { format } from "date-fns"
import { useCookieState } from "use-cookie-state"

function App() {
  const todayString = format(new Date(), "MMMM do, yyyy")
  const { letters, validWords } = new SpellingBee().getGameForDate(new Date())
  const [previousBest] = useCookieState("previousBest", "")

  return (
    <div className="App touch-manipulation">
      <header className="flex flex-col text-center py-2 md:py-4 mb-6 border border-gray-200">
        <div className="flex container max-w-7xl m-auto justify-between px-4">
          <div className="text-left">
            <div className="text-4xl font-bold">Free Bee</div>
            <div>{todayString}</div>
          </div>
          <div className="font-normal text-right">
            {/* <div className="text-nowrap">Yesterday's Best:</div>
            <div className="font-bold text-xl text-yellow-400">{previousBest}</div> */}
          </div>
        </div>
      </header>
      <GameController letters={letters} validWords={validWords} />
    </div>
  )
}

export default App
