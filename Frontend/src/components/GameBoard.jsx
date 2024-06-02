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

<div class="flex flex-col h-screen">
    <header class="">  
    </header>
    <div className='absolute w-96 -pt-10 -rotate-12 transition-transform transform hover:scale-105'>
        <img className="" src="./src/assets/PokeBall.png"/>
    </div>
    <main className="flex flex-col items-center h-full bg-[url('./assets/stadium2.png')] bg-cover bg-no-repeat">

      <div className='flex flex-row justify-start items-start'>
        <div className='py-2'>
          <img className="" src="./src/assets/PokeFight_logo.png"/>
        </div>
      </div>
  
        {/* <h1 className="mb-8 text-center text-2xl font-bold">PokemonFight Game</h1> */}
        <div className="flex flex-row justify-center w-80">
          {selectedPokemon1 && (
            <PokemonCard
              pokemon={selectedPokemon1}
              onClick={() => selectPokemon(selectedPokemon1, 1)}
            />
          )}
          <div className='min-w-80'>
          {winner && (
          <div className="flex flex-col text-center p-5 justify-center items-center">
            <div>
              <img className='w-80' src="./src/assets/The_winner_is.png"></img>
            </div>
            <div className="px-6 py-3 pb-6 rounded-xl bg-yellow-600">
              <p className="text-5xl text-yellow-100 font-black">
                {typeof winner === 'string'? winner : `${winner.name.english}`}
              </p>
            </div>

            <button
              onClick={resetGame}
              className="mt-4 text-4xl text-white font-bold ml-200 px-10 py-6 rounded-full bg-yellow-600 hover:bg-yellow-700"
            >
              Play Again
            </button>
            
          </div>
        )}
          </div>
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
            className="text-4xl text-white font-bold ml-200 px-10 py-6 rounded-full transition-transform transform hover:scale-105 bg-red-700 hover:bg-red-600"
          >
            Fight!
          </button>
        </div>
    </main>
    <footer className='flex flex-row  absolute bottom-0'>
      <div >
        <img src="./src/assets/Ash_ketchum.png"></img>
      </div>
    </footer>
</div>
  );
}


export default GameBoard;