import { useState, useRef } from 'react';

import LetterPicker from './LetterPicker.js'
import ScoreSheet from './ScoreSheet.js';
import toast, { Toaster } from 'react-hot-toast';

function GameController({
    letters,
    validWords
}) {
  const [ foundWords, setFoundWords ] = useState([]);
  const [ score, setScore ] = useState(0);
  const inputRef = useRef([null]);

  const ShowError = (message) => {
    toast(message, {
        duration: 1000,
        
        className: 'relative',
        
        style: {
            background: 'black',
            color: 'white',
        }
    })
  }

  const ShowSuccess = (message) => {
    toast(message, {
        duration: 500,
        style: {
            background: 'transparent',
            color: 'black',
        }
    })
  }
  
  const submitWord = (str) => {
    if (foundWords.includes(str)) {
        ShowError('Already found')
    } else if (validWords.has(str)) {
        setScore(score + str.length)
        setFoundWords(foundWords.concat(str).sort());
        ShowSuccess('Nice!')
    } else if (!str.split("").every((char) => letters.includes(char))) {
        ShowError('Invalid Letters')
    } else if (!str.includes(letters[0])) {
        ShowError('Must contain special letter')
    } else {
        ShowError('Not in list')
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
            <div className='md:mb-24'>
                <Toaster></Toaster>
            </div>
            <LetterPicker className="mt-8" letters={letters} onSubmit={submitWord} inputRef={inputRef}/>
        </div>
    </div>
  );
}

export default GameController;
