import BattleScreen from './components/BattleScreen';
import BattleScreenDark from './components/BattleScreenDark';
import GameBoard from './components/GameBoard';
import Tryout from './components/Tryout';

function App() {
  return (
    <div>
      <div className="App"> 
        <GameBoard />
        <Tryout></Tryout>
        <BattleScreen/>
        <BattleScreenDark/>
      </div>
    </div>
  );
}

export default App;
