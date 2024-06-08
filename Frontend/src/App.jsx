import GameBoard from './components/GameBoard';
import SideBar from './components/SideBar';
import PokemonOverview from './components/PokemonOverview';
import OffCanvas from './components/OffCanvas';

function App() {
  return (
    <div>
      <div className="App"> 
        <GameBoard />
        <OffCanvas/>
        <SideBar/>
        <PokemonOverview/>
      </div>
    </div>
  );
}

export default App;
