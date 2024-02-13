import GameModule from './GameModule';

function App() {
  return (
    <div className="App dark:bg-gray-800 h-screen">
      <header>
        <h1 className='text-center py-10 text-4xl font-bold dark:text-gray-100'>Spelling Bee</h1>
      </header>
      <GameModule />
    </div>
  );
}

export default App;
