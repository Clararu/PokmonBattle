import GameBoard from './components/GameBoard';
import Login from './components/Login';
import PokemonOverview from './components/PokemonOverview';


function App() {
  return (
    <div>
      <div className="App"> 
        <GameBoard />
        <PokemonOverview/>
        <Login/>
      </div>
    </div>
  );
}

export default App;
