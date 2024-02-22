import { useEffect, useState } from 'react'
import classNames from 'classnames'
import pickRandom from 'pick-random';

function LetterPicker({
    letters,
    onSubmit,
    inputRef
}) {

    const [validLetters, setValidLetters] = useState(letters);
    const [inputString, setInputString] = useState(undefined);

    const onInput = (event) => {
        const processedInput = event.target.value.toLowerCase()
        if (processedInput.match(/^[a-z]*$/g)) {
            setInputString(processedInput)
        }
    }

    const onKeyDown = (event) => {
        if (event.key === 'Enter') {
            submit(inputString)
        } else if (event.key === " ") {
            shuffleLetters();
        }
    }

    const submit = (string) => {
        if (string !== "" && string !== undefined) {
            onSubmit(string)
        }
        inputRef.current.focus();
        setInputString("");
    }

    const shuffleLetters = () => {
        setValidLetters([validLetters[0]].concat(pickRandom(validLetters.slice(1), {count: 6})))
        inputRef.current.focus();
    }

    const deleteOneChar = () => {
        setInputString(inputString.slice(0, -1))
        inputRef.current.focus();
    }
    
    const onBlur = (event) => {
        if (event.relatedTarget === null) {
            event.target.focus();
        }
    }

    const enterChar = (char) => {
        setInputString((inputString || "") + char)
        inputRef.current.focus();
    }
    
    useEffect(() => {
        inputRef.current.focus()
    }, [])

    const LetterHexagon = ({
        char,
        yellow
    }) => {
        return (
            <div className={`w-24 h-24 hexagon ${yellow ? 'bg-yellow-300' : 'bg-gray-200'}`} onClick={() => enterChar(char)}>
                <div className='mt-8'>{char}</div>
            </div>
        );
    }

    const BlinkingCursor = () => {
        return (<span className='bg-yellow-300 absolute w-0.5 h-11' style={{animation: 'blink 1s steps(2, start) infinite'}}></span>)
    }

    const ColorInput = ({
        inputString,
        validLetters
    }) => {

        const chars = (
            <div>
                {inputString?.split("").map((char, index) => {
                    const specialChar = char === validLetters[0]
                    const notValidChar = !validLetters.includes(char)
                    return (
                        <span key={index} className={classNames("uppercase", {"text-yellow-300": specialChar, "text-gray-200": notValidChar})}>
                            {char}
                        </span>
                    );
                })}
                <BlinkingCursor />
            </div>
        )

        return (
            <div className='w-full mb-8 h-11 text-center text-4xl font-bold relative'>
                {inputString !== undefined ? 
                    chars : 
                    <span className='font-light text-gray-500 relative'>
                        <BlinkingCursor />
                        Type or click
                    </span>
                }
            </div>
        )
    }

    return (
        <div className='my-4 text-center text-gray-800'>
            <input 
                className='transparent outline-none caret-transparent opacity-0'
                value={inputString}
                ref={inputRef}
                onInput={onInput}
                onBlur={onBlur}
                onKeyDown={onKeyDown}
                inputMode='none' 
            />
            <ColorInput validLetters={validLetters} inputString={inputString} />
            <div className='text-3xl uppercase font-bold text-gray-800 mb-8'>
                <div className='flex justify-center -mb-4'>
                    <LetterHexagon char={validLetters[3]} />
                    <LetterHexagon char={validLetters[1]} />
                </div>
                <div className='flex justify-center -mb-4'>
                    <LetterHexagon char={validLetters[2]} />
                    <LetterHexagon char={validLetters[0]} yellow />
                    <LetterHexagon char={validLetters[4]} />
                </div>
                <div className='flex justify-center'>
                    <LetterHexagon char={validLetters[5]} />
                    <LetterHexagon char={validLetters[6]} />
                </div>
            </div>
            <div className='flex justify-center'>
                <button className="border-gray-200 border hover:bg-yellow-500 text-gray-800 py-2 px-4 rounded-full mx-2" onClick={deleteOneChar}>
                    Delete
                </button>
                <button className="border-gray-200 border hover:bg-yellow-500 text-gray-800 py-2 px-4 rounded-full mx-2" onClick={shuffleLetters}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
                    </svg>
                </button>
                <button className="border-gray-200 border hover:bg-yellow-500 text-gray-800 py-2 px-4 rounded-full mx-2" onClick={() => submit(inputString)}>
                    Enter
                </button>
            </div>
        </div>
    );
}

export default LetterPicker;
