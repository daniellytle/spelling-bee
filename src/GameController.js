import { useState, useRef } from "react"

import LetterPicker from "./LetterPicker.js"
import ScoreSheet from "./ScoreSheet.js"
import HelpModal from "./HelpModal.js"

function GameController({ letters, validWords }) {
  const [foundWords, setFoundWords] = useState([])
  const [score, setScore] = useState(0)
  const inputRef = useRef([null])

  const submitWord = (str) => {
    if (foundWords.includes(str)) {
      return [false, "Already found"]
    } else if (validWords.has(str)) {
      const wordScore = getWordScore(str)
      setScore(score + wordScore)
      setFoundWords(foundWords.concat(str).sort())
      return [true, wordScore]
    } else if (!str.split("").every((char) => letters.includes(char))) {
      return [false, "Invalid letters"]
    } else if (!str.includes(letters[0])) {
      return [false, "Must contain special letter"]
    } else {
      return [false, "Not in word list"]
    }
  }

  const getWordScore = (word) => {
    if (letters.every((char) => word.includes(char))) {
      return 14
    } else if (word.length == 4) {
      return 1
    } else {
      return word.length
    }
  }

  return (
    <div className="container m-auto px-4 md:flex">
      <div className="md:order-last md:w-1/3">
        <ScoreSheet
          foundWords={foundWords}
          score={score}
          validWords={validWords}
          inputRef={inputRef}
        />
      </div>
      <div className="md:w-2/3">
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
