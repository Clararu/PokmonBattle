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
      console.log(pokemonList);
    } catch (error) {
      console.error('Error fetching pokemon:', error);
    }
  };

  const startFight = () => {
    if (!selectedPokemon1 || !selectedPokemon2) {
      alert('Please select Pokemon!');
      return;
    }

    const totalStats1 = getTotalStats(selectedPokemon1.base);
    const totalStats2 = getTotalStats(selectedPokemon2.base);

    if (totalStats1 > totalStats2) {
      setWinner(selectedPokemon1);
    } else if (totalStats1 < totalStats2) {
      setWinner(selectedPokemon2);
    } else {
      setWinner("It's a tie!");
    }
  };

  const getTotalStats = (stats) => {
    return stats.HP + stats.Attack + stats.Defense + stats['Sp. Attack'] + stats['Sp. Defense'] + stats.Speed;
  };

  const selectPokemon = (pokemon) => {
    if (!selectedPokemon1) {
      setSelectedPokemon1(pokemon);
    } else if (!selectedPokemon2) {
      setSelectedPokemon2(pokemon);
    }
  };

  return (
    <>
          

    <div className="p-8 flex flex-col items-center justify-center h-full bg-gradient-to-r from-cyan-500 to-blue-500">
      <div className=''></div>
    <h1 className="text-6xl font-black mb-8 text-blue-100 text-center">PokéFight</h1>
    {/* <div className="object-fill h-48 w-96">
            <img src="./src/assets/logo_PokeFight.png"></img>
          </div> */}
      <div className="flex justify-between">
        {pokemonList.slice(0, 2).map((pokemon, index) => (
          <div key={index} className="flex flex-row items-center">
           
            <PokemonCard pokemon={pokemon} />
            <button className=''
              
              onClick={() => selectPokemon(index !== null ? selectedPokemonIndex - 1 : pokemonList.length - 1)}
            
            >
              Select
            </button>
            {index === 0 && (
             
              <button 
                onClick={startFight} 
                className=" bg-red-600 items-center text-2xl text-red-100 font-bold ml-200 px-10 py-5 rounded-full hover:bg-red-500"
              //absolute bottom-0 mb-48 bg-green-900 text-white px-4 py-2 rounded hover:bg-yellow-300"
              >
                Fight!
              </button>
            )}
          </div>
        ))}
      </div>
      {winner && (
        <h2 className="mt-8 text-center text-xl font-semibold">
          {typeof winner === 'string' ? winner : `Winner: ${winner.name.english}`}
        </h2>
      )}
    <footer className='flex flex-row sticky  justify-start items-start'>
          <div className="object-fill h-48 w-96">
            <img src="./src/assets/Ash_ketchum.png"></img>
            <img src="./src/assets/PokeBall.png"></img>
          </div>
        </footer>
    </div>

    </>
  );
}

export default GameBoard;
