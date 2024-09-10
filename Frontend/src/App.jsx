import './App.css';
import Login from './pages/Login';
import Arena from './pages/Arena';
import Pokedex from './pages/Pokedex';
import BattleScreen from './pages/BattleScreen';  // Import the new battle screen

import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/arena" element={<Arena />} />
        <Route path="/pokedex/:player" element={<Pokedex />} />
        <Route path="/battle" element={<BattleScreen />} /> {/* Add the battle screen route */}
      </Routes>
    </>
  );
}

export default App;
