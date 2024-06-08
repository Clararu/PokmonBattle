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
    <footer className='flex flex-row absolute bottom-0'>
      <div >
        <img src="./src/assets/Ash_ketchum.png"></img>
      </div>
    </footer>

      <div
        id="menu-wrapper"
        className="justify-center h-lvh fixed transition-transform bg-pink-500"
      >
        <div id="iconbar" className="flex flex-row justify-between">
          <div className="pl-6 pt-5" onClick={() => setShow(!show)}>
            <button
              type="button"
              data-drawer-hide="drawer-navigation"
              aria-controls="drawer-navigation"
              class=" text-gray-400 bg-transparent hover:text-gray-900 rounded-lg text-sm w-8 h-8 top-2.5 end-2.5 inline-flex items-center justify-center dark:hover:bg-gray-600 dark:hover:text-white"
            >
              <svg
                class="w-6 h-6 text-gray-300 dark:text-gray-600"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-width="2"
                  d="M5 7h14M5 12h14M5 17h14"
                />
              </svg>
            </button>
          </div>

          {show && (
            <div className="-mx-16 h-screen border-gray-500 border-r-2 bg-slate-800 dark:bg-gray-800">
              <div id="inner-content-wrapper" className="pl-5 pt-5">
                <div className="pb-4 flex flex-row justify-start">
                  <div className="pl-3">
                    <button
                      id="close-menu"
                      onClick={() => setShow(!show)}
                      type="button"
                      data-drawer-hide="drawer-navigation"
                      aria-controls="drawer-navigation"
                      class="bg-slate-500 text-gray-800 hover:bg-slate-300 hover:text-slate-800 focus:bg-slate-600 rounded-lg text-sm w-8 h-8 top-2.5 end-2.5 inline-flex items-center justify-center dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      <svg
                        class="w-3 h-3"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 14 14"
                      >
                        <path
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
                {/* OffCanvas Title */}
                <div id="Subheading" className="pl-4 pb-4 font-bold text-slate-300">Pokemon</div>

                {/* OffCanvas Content */}

                    {/* Pokemon Output */}
                    <div className="flex flex-wrap justify-center items-center">
                    {/* Map over the pokemonList and render a PokemonCard for each Pokémon */}
                    {pokemonList.map((pokemon) => (
                      <PokemonCard
                        key={pokemon.id}
                        pokemon={pokemon}
                        isSelected={
                          // Check if the Pokémon is selected
                          selectedPokemon1 && selectedPokemon1.id === pokemon.id ||
                          selectedPokemon2 && selectedPokemon2.id === pokemon.id
                        }
                        onSelect={(pokemon) => {
                          // Handle Pokémon selection
                          if (selectedPokemon1 && selectedPokemon1.id === pokemon.id) {
                            setSelectedPokemon1(null);
                          } else if (selectedPokemon2 && selectedPokemon2.id === pokemon.id) {
                            setSelectedPokemon2(null);
                          } else if (!selectedPokemon1) {
                            setSelectedPokemon1(pokemon);
                          } else if (!selectedPokemon2) {
                            setSelectedPokemon2(pokemon);
                          }
                        }}
                      />
                    ))}
                    {/* Button to start the fight */}
                    <button onClick={startFight}>Fight!</button>
                    {/* Display the winner of the fight */}
                    {winner && <div>Winner: {winner.name}</div>}
                  </div>

              </div>
            </div>
          )}
        </div>
      </div>

      <div
        id="menu-wrapper"
        className="justify-center h-lvh fixed transition-transform bg-pink-500"
      >
        <div id="iconbar" className="flex flex-row justify-between">
          <div className="pl-6 pt-5" onClick={() => setShow(!show)}>
            <button
              type="button"
              data-drawer-hide="drawer-navigation"
              aria-controls="drawer-navigation"
              class=" text-gray-400 bg-transparent hover:text-gray-900 rounded-lg text-sm w-8 h-8 top-2.5 end-2.5 inline-flex items-center justify-center dark:hover:bg-gray-600 dark:hover:text-white"
            >
              <svg
                class="w-6 h-6 text-gray-300 dark:text-gray-600"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-width="2"
                  d="M5 7h14M5 12h14M5 17h14"
                />
              </svg>
            </button>
          </div>

          {show && (
            <div className="-mx-16 h-screen border-gray-500 border-r-2 bg-slate-800 dark:bg-gray-800">
              <div id="inner-content-wrapper" className="pl-5 pt-5">
                <div className="pb-4 flex flex-row justify-start">
                  <div className="pl-3">
                    <button
                      id="close-menu"
                      onClick={() => setShow(!show)}
                      type="button"
                      data-drawer-hide="drawer-navigation"
                      aria-controls="drawer-navigation"
                      class="bg-slate-500 text-gray-800 hover:bg-slate-300 hover:text-slate-800 focus:bg-slate-600 rounded-lg text-sm w-8 h-8 top-2.5 end-2.5 inline-flex items-center justify-center dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      <svg
                        class="w-3 h-3"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 14 14"
                      >
                        <path
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
                {/* OffCanvas Title */}
                <div id="Subheading" className="pl-4 pb-4 font-bold text-slate-300">Pokemon</div>

                {/* OffCanvas Content */}

                    {/* Pokemon Output */}
                    <div className="flex flex-wrap justify-center items-center">
                    {/* Map over the pokemonList and render a PokemonCard for each Pokémon */}
                    {pokemonList.map((pokemon) => (
                      <PokemonCard
                        key={pokemon.id}
                        pokemon={pokemon}
                        isSelected={
                          // Check if the Pokémon is selected
                          selectedPokemon1 && selectedPokemon1.id === pokemon.id ||
                          selectedPokemon2 && selectedPokemon2.id === pokemon.id
                        }
                        onSelect={(pokemon) => {
                          // Handle Pokémon selection
                          if (selectedPokemon1 && selectedPokemon1.id === pokemon.id) {
                            setSelectedPokemon1(null);
                          } else if (selectedPokemon2 && selectedPokemon2.id === pokemon.id) {
                            setSelectedPokemon2(null);
                          } else if (!selectedPokemon1) {
                            setSelectedPokemon1(pokemon);
                          } else if (!selectedPokemon2) {
                            setSelectedPokemon2(pokemon);
                          }
                        }}
                      />
                    ))}
                    {/* Button to start the fight */}
                    <button onClick={startFight}>Fight!</button>
                    {/* Display the winner of the fight */}
                    {winner && <div>Winner: {winner.name}</div>}
                  </div>

              </div>
            </div>
          )}
        </div>
      </div>

</div>
  );
}


export default GameBoard;