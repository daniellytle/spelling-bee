
function ScoreSheet({
    foundWords,
    totalWords
}) {

    const progress = Math.round((foundWords.length / totalWords) * 100);

    return (
        <div className="w-full rounded border border-solid border-grey-500 p-5 dark:text-gray-100">
            <div className="mb-2 text-xl font-bold text-left">Words {foundWords.length} / {totalWords}</div>
            <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
                <div className="bg-yellow-400 h-2.5 rounded-full" style={{width: `${progress}%`}}></div>
            </div>
            <div className="text-left">
                {foundWords.map((word) => (
                    <div key={word}>{word}</div>
                ))}
            </div>
        </div>
    );
}

export default ScoreSheet;
