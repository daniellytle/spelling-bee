import { useState } from "react"
import ProgressModal from "./ProgressModal"
import classNames from "classnames"

const getRanking = (score, maximumScore) => {
  const progress = Math.round((score / maximumScore) * 100)
  return 10 - [100, 70, 50, 40, 25, 15, 8, 5, 2, 0].findIndex((level) => level <= progress)
}

const RankNames = ["Beginner", "Good Start", "Moving Up", "Good", "Solid", "Nice", "Great", "Amazing", "Genius", "Queen Bee"]

function ScoreSheet({ maximumScore, foundWords, score, validWords, inputRef }) {
  const ranking = getRanking(score, maximumScore)
  const [mobileExpanderVisible, setMobileExpanderVisible] = useState(false)

  const FoundWordsList = ({ foundWords }) => {
    return (
      <div className="text-left mt-4 capitalize">
        <div className="font-bold">Found Words</div>
        <div className="found-words-grid hidden md:grid">
          {foundWords.map((word) => (
            <div key={word}>{word}</div>
          ))}
        </div>
        <div className="md:hidden">
          {foundWords.map((word) => (
            <div key={word}>{word}</div>
          ))}
        </div>
        <div
          className="w-full bg-gray-100 border-t-1 border-gray-300 mt-2"
          style={{ height: 1 }}
        ></div>
        <ProgressModal
          foundWords={foundWords}
          validWords={validWords}
          inputRef={inputRef}
        />
      </div>
    )
  }

  return (
    <div className="w-full rounded border border-solid border-grey-800 md:p-5 p-2 text-gray-800">
      <div
        className="mb-2 flex justify-between align-middle"
        onClick={() => setMobileExpanderVisible((value) => !value)}
      >
        <div className="inline md:text-xl text-normal font-bold text-left">
          {RankNames[ranking - 1]}
        </div>
        <div
          className={classNames("inline md:hidden text-gray-800", {
            "rotate-180": mobileExpanderVisible,
          })}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m19.5 8.25-7.5 7.5-7.5-7.5"
            />
          </svg>
        </div>
      </div>
      <div className="font-medium text-sm w-full flex justify-between relative text-center">
        {[1,2,3,4,5,6,7,8,9].map((rank, index) => {
          if (ranking === rank) {
            return <div key={index} className="h-8 w-8 rounded-full bg-yellow-300 z-10 pt-1.5">{score}</div>
          } else if (ranking > rank) {
            return <div key={index} className="h-4 w-4 mt-2 rounded-full bg-yellow-300 z-10"></div>
          } else {
            return <div key={index} className="h-4 w-4 mt-2 rounded-full bg-gray-200 z-10"></div>
          }
        })}
        <div className="bg-gray-200 rounded-full h-1 w-full absolute top-3.5 z-0">
          <div
            className="bg-yellow-300 h-1 rounded-full"
            style={{ width: `${(ranking  / 9) * 100}%` }}
          ></div>
        </div>
      </div>
      <div className="md:hidden">
        {mobileExpanderVisible && <FoundWordsList foundWords={foundWords} />}
      </div>
      <div className="md:block hidden">
        <FoundWordsList foundWords={foundWords} />
      </div>
    </div>
  )
}

export default ScoreSheet
