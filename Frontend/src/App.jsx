import './App.css';
import Login from './pages/Login';
import Arena from './pages/Arena';
import Pokedex from './pages/Pokedex';
import BattleScreen from './pages/BattleScreen';

import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/arena" element={<Arena />} />
        <Route path="/pokedex/:player" element={<Pokedex />} />
        <Route path="/battle" element={<BattleScreen />} /> 
      </Routes>
    </>
  );
}

export default App;
