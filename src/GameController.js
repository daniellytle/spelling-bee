import { useState, useRef, useEffect } from "react"
import { useCookies } from "react-cookie"
import { format } from "date-fns";

import LetterPicker from "./LetterPicker.js"
import ScoreSheet from "./ScoreSheet.js"
import HelpModal from "./HelpModal.js"

function GameController({ letters, validWords }) {
  const [cookies, setCookie] = useCookies(['foundWords', 'playingDate']);
  const todayString = format(new Date(), "yyyy-MM-dd")
  if (cookies['playingDate'] !== todayString) {
    setCookie('playingDate', todayString)
    setCookie('foundWords', [])
  }

  const [foundWords, setFoundWords] = useState(cookies['foundWords'])
  const [score, setScore] = useState(0)
  const inputRef = useRef([null])

  useEffect(() => {
    setScore(foundWords.map((word) => getWordScore(word)).reduce((sum, x) => sum + x, 0))
  }, [foundWords])

  const submitWord = (str) => {
    if (foundWords.includes(str)) {
      return [false, "Already found"]
    } else if (validWords.has(str)) {
      const wordScore = getWordScore(str)
      const updatedFoundWords = foundWords.concat(str).sort()
      setCookie('foundWords', updatedFoundWords)
      setScore(score + wordScore)
      setFoundWords(updatedFoundWords)
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

  const getWordScore = (word) => {
    if (letters.every((char) => word.includes(char))) {
      return 14
    } else if (word.length === 4) {
      return 1
    } else {
      return word.length
    }
  }

  return (
    <div className="container max-w-7xl m-auto px-4 md:flex">
      <div className="md:order-last md:w-2/5">
        <ScoreSheet
          foundWords={foundWords}
          score={score}
          validWords={validWords}
          inputRef={inputRef}
        />
      </div>
      <div className="md:w-3/5">
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
