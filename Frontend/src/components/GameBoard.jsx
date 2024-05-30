import React, { useState, useEffect } from 'react';
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
    } catch (error) {
      console.error('Error fetching pokemon:', error);
    }
  };

  const startFight = () => {
    if (!selectedPokemon1 || !selectedPokemon2) {
      setWinner(null); // Reset winner if not all Pokemon are selected
      alert('Please select both Pokémon!');
      return;
    }

    const totalStats1 = getTotalStats(selectedPokemon1.base);
    const totalStats2 = getTotalStats(selectedPokemon2.base);

    if (totalStats1 > totalStats2) {
      setWinner(`${selectedPokemon1.name.english} wins!`);
    } else if (totalStats1 < totalStats2) {
      setWinner(`${selectedPokemon2.name.english} wins!`);
    } else {
      setWinner('It\'s a tie!');
    }
  };

  const getTotalStats = (stats) => {
    return stats.HP + stats.Attack + stats.Defense + stats['Sp. Attack'] + stats['Sp. Defense'] + stats.Speed;
  };

  const selectPokemon = (pokemon) => {
    if (!selectedPokemon1) {
      setSelectedPokemon1(pokemon);
      console.log(`Selected Pokemon 1: ${pokemon.name.english}`);
    } else if (!selectedPokemon2) {
      setSelectedPokemon2(pokemon);
      console.log(`Selected Pokemon 2: ${pokemon.name.english}`);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-8 text-center">PokemonFight Game</h1>
      <div className="flex justify-around">
        {pokemonList.slice(0, 2).map((pokemon, index) => (
          <div key={index} className="flex flex-col items-center">
            <PokemonCard pokemon={pokemon} />
            <button 
              onClick={() => selectPokemon(pokemon)}
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Select
            </button>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-8">
        <button 
          onClick={startFight} 
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Fight!
        </button>
      </div>
      {winner && (
        <h2 className="text-xl font-semibold mt-8 text-center">
          {winner}
        </h2>
      )}
      {!selectedPokemon1 && !selectedPokemon2 && !winner && (
        <h2 className="text-xl font-semibold mt-8 text-center">
          Please select both Pokémon!
        </h2>
      )}
    </div>
  );
}

export default GameBoard;



