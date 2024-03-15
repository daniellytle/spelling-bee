import { useState } from "react"
import ProgressModal from "./ProgressModal"
import classNames from "classnames"

function ScoreSheet({ foundWords, score, validWords, inputRef }) {
  const progress = Math.round((foundWords.length / validWords.size) * 100)
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
        className="mb-2 flex justify-between"
        onClick={() => setMobileExpanderVisible((value) => !value)}
      >
        <div className="inline md:text-xl text-normal font-bold text-left">
          {score}
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
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div
          className="bg-yellow-400 h-2.5 rounded-full"
          style={{ width: `${progress}%` }}
        ></div>
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
