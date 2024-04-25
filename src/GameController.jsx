import { useState, useRef, useEffect } from "react"
import { useCookieState } from "use-cookie-state"
import { format } from "date-fns";

import LetterPicker from "./LetterPicker.jsx"
import ScoreSheet from "./ScoreSheet.jsx"
import HelpModal from "./HelpModal.jsx"
import { getMaximumScore, getPointsToNextRank, getWordScore } from "./ScoreUtils.js";

function GameController({ letters, validWords }) {
  const [score, setScore] = useState(0)
  
  const inputRef = useRef([null])

  const todayString = format(new Date(), "yyyy-MM-dd")
  const maximumScore = getMaximumScore(Array.from(validWords))
  const [playingDate, setPlayingDate] = useCookieState("playingDate", "")
  const [foundWords, setFoundWords] = useCookieState("foundWords", [], {
      decode: {
        decode: (value) => {
          return JSON.parse(decodeURIComponent(value))
        }
      }
    }
  )

  console.log(getPointsToNextRank(score, maximumScore))

  if (playingDate !== todayString) {
    setPlayingDate(todayString)
    setFoundWords([])
  }

  useEffect(() => {
    setScore(foundWords.map((word) => getWordScore(word)).reduce((sum, x) => sum + x, 0))
  }, [letters, foundWords])

  const submitWord = (str) => {
    if (foundWords.includes(str)) {
      return [false, "Already found"]
    } else if (validWords.has(str)) {
      const wordScore = getWordScore(str)
      const updatedFoundWords = foundWords.concat(str).sort()
      setFoundWords(updatedFoundWords)
      setScore(score + wordScore)
      return [true, wordScore]
    } else if (str.length < 4) {
      return [false, "Too short"]
    } else if (!str.split("").every((char) => letters.includes(char))) {
      return [false, "Bad letters"]
    } else if (!str.includes(letters[0])) {
      return [false, "Must contain special letter"]
    } else {
      return [false, "Not in word list"]
    }
  }

  return (
    <div className="container max-w-7xl m-auto px-4 md:flex">
      <div className="md:order-last md:w-2/5">
        <ScoreSheet
          maximumScore={maximumScore}
          foundWords={foundWords}
          score={score}
          validWords={validWords}
          inputRef={inputRef}
        />
      </div>
      <div className="md:w-3/5 mb-5">
        <div className="md:mb-24">
        </div>
        <LetterPicker
          className="mt-8"
          letters={letters}
          onSubmit={submitWord}
          inputRef={inputRef}
        />
        <HelpModal inputRef={inputRef}/>
      </div>
    </div>
  )
}

export default GameController
