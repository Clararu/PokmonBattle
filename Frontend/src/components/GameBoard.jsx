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
          

    <div className="h-screen">

      <header class="flex py-2 justify-center bg-gradient-to-r from-cyan-500 to-blue-500">
        <div className='flex flex-row items-center'>
          <div className='w-48 rotate-12 '>
            <img src="./src/assets/PokeBall.png"/>
          </div>
          {/* <h1 className="text-8xl font-black text-yellow-400 text-center">PokéFight</h1> */}
          
          <div>

          </div>
          
        </div>
      </header>

      <main class="flex-grow bg-green-500">

        <div className='flex flex-row justify-center'>

          <div className="flex flex-row justify-between">
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
                    className=" bg-red-600 items-center text-2xl text-red-100 font-bold ml-200 px-5 py-3 rounded-full hover:bg-red-500"
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

      {/* Card */}
        <div className="card bg-base-100 m-0 border-8 border-gray-700 justify-center shadow-2xl">
          <div className="flex flex-col ">
              {/* Image */}
              <div>
                <img className="w-full p-20 bg-gray-100 rounded-md" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png">
                </img>
              </div>
              {/* Stats */}
            <div className="card-body items-end rounded-b-md bg-gray-300">

                <div className="flex flex-row">
                  <p className="text-4xl font-bold text-gray-700">{'Pokemon_name'}&nbsp;</p>
                  <div className='flex flex-row mb-5'>
                    <div className="badge text-gray-100 text-xl p-5 bg-gray-700">{'type'}</div>
                    <div className="badge text-gray-100 text-xl p-5 bg-gray-700">{'type'}</div>
                  </div>
                </div>
                  <div className="flex flex-col items-end">
                <div className="flex flex-row">
                  <div className="flex flex-col items-end">
                    <div className="flex flex-row px-3 py-0.5 m-1 rounded-xl bg-gray-200">
                      <p className="card-title text-gray-600 text-2xl font-semibold">{'HP'}&nbsp;</p>
                      <p className="card-title text-4xl pb-1 font-semibold font-mono text-green-400">{'100'}</p>
                    </div>
                    <div className="flex flex-row px-3 py-0.5 m-1 rounded-xl bg-gray-200">
                      <p className="card-title text-gray-600 text-2xl font-semibold">{'DEF'}&nbsp;</p>
                      <p className="card-title text-4xl pb-1 font-semibold font-mono text-blue-400">{'100'}</p>
                    </div>
                    <div className="flex flex-row px-3 py-0.5 m-1 rounded-xl bg-gray-200">
                      <p className="card-title text-gray-600 text-2xl font-semibold">{'S-DEF'}&nbsp;</p>
                      <p className="card-title text-4xl pb-1 font-semibold font-mono text-purple-400">{'100'}</p>
                    </div>
                  </div>
                  <div className="flex flex-col mx-0.5 items-end">
                    </div>
                  <div className="flex flex-col items-end">
                  <div className="flex flex-row px-3 py-0.5 m-1 rounded-xl bg-gray-200">
                      <p className="card-title text-gray-600 text-2xl font-semibold">{'ATK'}&nbsp;</p>
                      <p className="card-title text-4xl pb-1 font-semibold font-mono text-red-400">{'100'}</p>
                    </div>
                    <div className="flex flex-row px-3 py-0.5 m-1 rounded-xl bg-gray-200">
                      <p className="card-title text-gray-600 text-2xl font-semibold">{'SPD'}&nbsp;</p>
                      <p className="card-title text-4xl pb-1 font-semibold font-mono text-yellow-400">{'100'}</p>
                    </div>
                    <div className="flex flex-row px-3 py-0.5 m-1 rounded-xl bg-gray-200">
                      <p className="card-title text-gray-600 text-2xl font-semibold">{'S-ATK'}&nbsp;</p>
                      <p className="card-title text-4xl pb-1 font-semibold font-mono text-orange-400">{'100'}</p>
                    </div>
                  </div>   
                </div>
                
              </div>
            </div>
         </div> 
       </div>


          </div>
        <div className="flex h-36 flex-grow justify-center bg-gradient-to-r from-orange-900 to-orange-700"></div>

      </main>

        <footer className='flex flex-row fixed bottom-0'>
          <div >
            <img src="./src/assets/Ash_ketchum.png"></img>
          </div>
        </footer>
      </div>
    </>
  );
}

export default GameBoard;
