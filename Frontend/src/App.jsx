import './App.css';
import Login from './pages/Login';
import Arena from './pages/Arena';
import Pokedex from './pages/Pokedex';

import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/arena" element={<Arena />} />
        <Route path="/pokedex/:player" element={<Pokedex />} />
      </Routes>
    </>
  );
}

export default App;
