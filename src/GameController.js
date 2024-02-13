import { useState } from 'react';

import LetterPicker from './LetterPicker.js'
import ScoreSheet from './ScoreSheet.js';
import toast, { Toaster } from 'react-hot-toast';

function GameController({
    letters,
    validWordsMap
}) {
  const [ foundWords, setFoundWords ] = useState([]);

  const ShowToast = (message) => {
    toast(message, {
        duration: 1000
    })
  }
  
  const submitWord = (str) => {
    if (foundWords.includes(str)) {
        ShowToast('Already found')
    } else if (str in validWordsMap) {
      setFoundWords(foundWords.concat(str).sort());
      ShowToast('Nice!')
    } else {
        ShowToast('Not in list')
    }
  }

  return (
    <div className="container flex m-auto">
        <div className="w-2/3">
            <Toaster />
            <LetterPicker letters={letters} onSubmit={submitWord}/>
        </div>
        <div className="w-1/3">
            <ScoreSheet foundWords={foundWords} totalWords={Object.keys(validWordsMap).length}/>
        </div>
    </div>
  );
}

export default GameController;
