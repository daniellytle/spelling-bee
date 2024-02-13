import { useRef, useEffect, useState } from 'react'

import pickRandom from 'pick-random';

function LetterPicker({
    letters,
    onSubmit
}) {

    const [validLetters, setValidLetters] = useState(letters);
    const ALPHABET = [...'abcdefghijklmnopqrstuvwxyz'];

    const inputRef = useRef([null]);

    const handleKeyPress = (event) => {
        if (ALPHABET.includes(event.key) && !letters.includes(event.key) && event.metaKey === false) {
            event.preventDefault();
        } else if (event.key === 'Enter') {
            SubmitString()
            event.preventDefault()
        } else if (event.key === ' ') {
            ShuffleLetters();
            event.preventDefault();
        }
    }

    const SubmitString = () => {
        onSubmit(inputRef.current.value)
        inputRef.current.value = '';
        inputRef.current.focus();
    }

    const ShuffleLetters = () => {
        setValidLetters(pickRandom(validLetters, {count: 7}))
        inputRef.current.focus();
    }

    const DeleteOneChar = () => {
        inputRef.current.value = inputRef.current.value.slice(0, -1);
        inputRef.current.focus();
    }
    
    const onBlur = (event) => {
        if (event.relatedTarget === null) {
            event.target.focus();
        }
    }

    const enterChar = (char) => {
        inputRef.current.value += char;
        inputRef.current.focus();
    }
    
    useEffect(() => {
        inputRef.current.focus()
    }, [])

    return (
        <div className='my-8 text-center dark:text-gray-100'>
            <input placeholder='Type or Click' className='bg-transparent mb-8 text-center border-none text-4xl outline-none caret-yellow-400 uppercase font-bold' ref={inputRef} onKeyDown={handleKeyPress} onBlur={onBlur}/>
            <div className='text-3xl uppercase font-bold dark:text-gray-500 text-gray-500 mb-8'>
                <div className='flex justify-center -mb-4'>
                    <div className='w-24 h-24 hexagon bg-white' onClick={() => enterChar(validLetters[0])}>
                        <div className='mt-8'>{validLetters[0]}</div>
                    </div>
                    <div className='w-24 h-24 hexagon bg-white' onClick={() => enterChar(validLetters[1])}>
                        <div className='mt-8'>{validLetters[1]}</div>
                    </div>
                </div>
                <div className='flex justify-center -mb-4'>
                    <div className='w-24 h-24 hexagon bg-white' onClick={() => enterChar(validLetters[2])}>
                        <div className='mt-8'>{validLetters[2]}</div>
                    </div>
                    <div className='w-24 h-24 hexagon bg-white' onClick={() => enterChar(validLetters[3])}>
                        <div className='mt-8'>{validLetters[3]}</div>
                    </div>
                    <div className='w-24 h-24 hexagon bg-white' onClick={() => enterChar(validLetters[4])}>
                        <div className='mt-8'>{validLetters[4]}</div>
                    </div>
                </div>
                <div className='flex justify-center'>
                    <div className='w-24 h-24 hexagon bg-white' onClick={() => enterChar(validLetters[5])}>
                        <div className='mt-8'>{validLetters[5]}</div>
                    </div>
                    <div className='w-24 h-24 hexagon bg-white' onClick={() => enterChar(validLetters[6])}>
                        <div className='mt-8'>{validLetters[6]}</div>
                    </div>
                </div>
            </div>
            <div className='flex justify-center'>
                <button class="bg-white hover:bg-blue-700 text-gray-500 font-bold py-2 px-4 rounded-full mx-2" onClick={DeleteOneChar}>
                    Delete
                </button>
                <button class="bg-white hover:bg-blue-700 text-gray-500 font-bold py-2 px-4 rounded-full mx-2" onClick={ShuffleLetters}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
                    </svg>
                </button>
                <button class="bg-white hover:bg-blue-700 text-gray-500 font-bold py-2 px-4 rounded-full mx-2" onClick={SubmitString}>
                    Enter
                </button>
            </div>
        </div>
    );
}

export default LetterPicker;
