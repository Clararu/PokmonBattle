import { useState, useEffect } from 'react';
import axios from 'axios';
import PokemonCard from './PokemonCard';

function GameBoard() {
  const [pokemonList, setPokemonList] = useState([]);
  const [selectedPokemon1, setSelectedPokemon1] = useState(null);
  const [selectedPokemon2, setSelectedPokemon2] = useState(null);
  const [winner, setWinner] = useState(null);

  useEffect(() => {
    fetchPokemon();
  }, []);

  const fetchPokemon = async () => {
    try {
      const response = await axios.get('http://localhost:3000/pokemon');
      setPokemonList(response.data);
      if (response.data.length > 1) {
        setSelectedPokemon1(response.data[0]);
        setSelectedPokemon2(response.data[1]);
      }
    } catch (error) {
      console.error('Error fetching pokemon:', error);
    }
  };

  const startFight = async () => {
    if (!selectedPokemon1 || !selectedPokemon2) {
      alert('Please select Pokemon!');
      return;
    }

    const totalStats1 = getTotalStats(selectedPokemon1.base);
    const totalStats2 = getTotalStats(selectedPokemon2.base);

    let fightWinner;
    if (totalStats1 > totalStats2) {
      fightWinner = selectedPokemon1;
    } else if (totalStats1 < totalStats2) {
      fightWinner = selectedPokemon2;
    } else {

      fightWinner = 'It\'s a tie!';
    }

    setWinner(fightWinner);

    try {
      await axios.post('http://localhost:3000/save-score', {
        winner: fightWinner,
        pokemon1: selectedPokemon1,
        pokemon2: selectedPokemon2,
      });
    } catch (error) {
      console.error('Error saving score:', error);

    }
  };

  const getTotalStats = (stats) => {
    return stats.HP + stats.Attack + stats.Defense + stats['Sp. Attack'] + stats['Sp. Defense'] + stats.Speed;
  };

  const selectPokemon = (pokemon, slot) => {
    const randomIndex = Math.floor(Math.random() * pokemonList.length);
    const randomPokemon = pokemonList[randomIndex];

    if (slot === 1) {
      setSelectedPokemon1(randomPokemon);
    } else {
      setSelectedPokemon2(randomPokemon);
    }
  };

  const resetGame = () => {
    setSelectedPokemon1(null);
    setSelectedPokemon2(null);
    setWinner(null);
    fetchPokemon();
  };

  return (
    <div className="p-8">
      <h1 className="mb-8 text-center text-2xl font-bold">PokemonFight Game</h1>
      <div className="flex justify-around">
      {selectedPokemon1 && (
          <PokemonCard 
            pokemon={selectedPokemon1} 
            onClick={() => selectPokemon(selectedPokemon1, 1)} 
          />
        )}
        {selectedPokemon2 && (
          <PokemonCard 
            pokemon={selectedPokemon2} 
            onClick={() => selectPokemon(selectedPokemon2, 2)} 
          />
        )}
      </div>
      <div className="text-center mt-8">
        <button 
          onClick={startFight} 
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Fight!
        </button>
      </div>
      {winner && (
        <div className="text-center mt-8">
          <h2 className="text-xl font-semibold">
            {typeof winner === 'string' ? winner : `Winner: ${winner.name.english}`}
          </h2>
          <button 
            onClick={resetGame} 
            className="mt-4 bg-yellow-300 text-white px-4 py-2 rounded hover:bg-yellow-500"
          >
            Play Again
          </button>
        </div>

export default GameBoard;


