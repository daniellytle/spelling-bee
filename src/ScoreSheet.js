import ProgressModal from './ProgressModal';

function ScoreSheet({
    foundWords,
    score,
    validWords,
    inputRef
}) {

    const progress = Math.round((foundWords.length / validWords.size) * 100);

    return (
        <div className="w-full rounded border border-solid border-grey-800 p-5 text-gray-800">
            <div className="mb-2 text-xl font-bold text-left">{score}</div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-yellow-400 h-2.5 rounded-full" style={{width: `${progress}%`}}></div>
            </div>
            <div className="text-left md:block hidden mt-4">
                <div className="font-bold">
                    Found Words
                </div>
                {foundWords.map((word) => (
                    <div className="underlined capitalize" key={word}>{word}</div>
                ))}
                <div className='w-full bg-gray-100 border-t-1 border-gray-300 mt-2' style={{height: 1}}></div>
                <ProgressModal foundWords={foundWords} validWords={validWords} inputRef={inputRef}/>
            </div>
        </div>
    );
}

export default ScoreSheet;
