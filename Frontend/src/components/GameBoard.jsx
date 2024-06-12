import { useState, useEffect } from 'react';
import axios from 'axios';
import PokemonCard from './PokemonCard';

function GameBoard() {

  const [show, setShow] = useState(false);

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

      <div className='absolute w-96 -pt-10 -rotate-12 transition-transform transform hover:scale-105 cursor-pointer'>
        <img className="" onClick={()=>document.getElementById('my_modal_5').showModal()} src="./src/assets/PokeBall.png"/>
      </div>

    <main className="flex flex-col items-center h-full bg-[url('./assets/Stadium_inside_1.png')] bg-cover bg-no-repeat">

      <div className='flex flex-row justify-start items-start'>
        <div className='py-2'> 
          <img className="" src="./src/assets/PokeFight_logo.png"/>
        </div>
      </div>
  
        <div className="flex flex-row justify-center w-80">

        {/* PokemonCards stacked in background */}
        <div className=" cursor-pointer px-10 pt-20" onClick={()=>document.getElementById('my_modal_5').showModal()}>

        <div className="">
           <img className="absolute w-1/6 -ml-20 -mt-20 -rotate-12 scale-110 rounded-2xl" src="./src/assets/PokemonCard.png"/>
        </div>

        <div className="">
           <img className="absolute w-1/6 -ml-30 -mt-20 -rotate-6 scale-110 rounded-2xl" src="./src/assets/PokemonCard.png"/>
        </div>

        </div>

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

        {/* Mulligan button */}
 

   
          {selectedPokemon2 && (
            <PokemonCard
              pokemon={selectedPokemon2}
              onClick={() => selectPokemon(selectedPokemon2, 2)}
            ></PokemonCard>
            
          )}
<div className="absolute -pr-80 size-24 rounded-full border-8 border-red-600" >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-12">
              <path fill-rule="evenodd" d="M9 4.5a.75.75 0 0 1 .721.544l.813 2.846a3.75 3.75 0 0 0 2.576 2.576l2.846.813a.75.75 0 0 1 0 1.442l-2.846.813a3.75 3.75 0 0 0-2.576 2.576l-.813 2.846a.75.75 0 0 1-1.442 0l-.813-2.846a3.75 3.75 0 0 0-2.576-2.576l-2.846-.813a.75.75 0 0 1 0-1.442l2.846-.813A3.75 3.75 0 0 0 7.466 7.89l.813-2.846A.75.75 0 0 1 9 4.5ZM18 1.5a.75.75 0 0 1 .728.568l.258 1.036c.236.94.97 1.674 1.91 1.91l1.036.258a.75.75 0 0 1 0 1.456l-1.036.258c-.94.236-1.674.97-1.91 1.91l-.258 1.036a.75.75 0 0 1-1.456 0l-.258-1.036a2.625 2.625 0 0 0-1.91-1.91l-1.036-.258a.75.75 0 0 1 0-1.456l1.036-.258a2.625 2.625 0 0 0 1.91-1.91l.258-1.036A.75.75 0 0 1 18 1.5ZM16.5 15a.75.75 0 0 1 .712.513l.394 1.183c.15.447.5.799.948.948l1.183.395a.75.75 0 0 1 0 1.422l-1.183.395c-.447.15-.799.5-.948.948l-.395 1.183a.75.75 0 0 1-1.422 0l-.395-1.183a1.5 1.5 0 0 0-.948-.948l-1.183-.395a.75.75 0 0 1 0-1.422l1.183-.395c.447-.15.799-.5.948-.948l.395-1.183A.75.75 0 0 1 16.5 15Z" clip-rule="evenodd" />
            </svg>
            </div>
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
    <footer className='flex flex-row fixed bottom-0'>
      <div >
        <img src="./src/assets/Ash_ketchum.png"></img>
      </div>
    </footer>

</div>
  );
}


export default GameBoard;