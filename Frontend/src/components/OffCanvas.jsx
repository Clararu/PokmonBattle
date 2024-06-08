// Importing necessary React hooks and axios library
import { useState, useEffect } from 'react';
import axios from 'axios';
import PokemonCard from './PokemonCard';



// GameBoard component
function Offcanvas() {
  // State variables to store the list of Pokémon, the two selected Pokémon, and the winner of the fight
  const [pokemonList, setPokemonList] = useState([]);
  const [selectedPokemon1, setSelectedPokemon1] = useState(null);
  const [selectedPokemon2, setSelectedPokemon2] = useState(null);
  const [winner, setWinner] = useState(null);

  const [show, setShow] = useState(false);

  // useEffect hook to fetch Pokémon data when the component mounts
  useEffect(() => {
    fetchPokemon();
  }, []);

  // Function to fetch Pokémon data from the API
  const fetchPokemon = async () => {
    try {
      // Make a GET request to the API to fetch Pokémon data
      const response = await axios.get('http://localhost:3000/pokemon');
      // Update the pokemonList state with the fetched data
      setPokemonList(response.data);
      // If there are more than one Pokémon in the list, select the first two as the initial selected Pokémon
      if (response.data.length > 1) {
        setSelectedPokemon1(response.data[0]);
        setSelectedPokemon2(response.data[1]);
      }
    } catch (error) {
      // Log any errors that occur during the API request
      console.error('Error fetching pokemon:', error);
    }
  };

  // Function to start the fight between the two selected Pokémon
  const startFight = async () => {
    // Check if both Pokémon are selected
    if (!selectedPokemon1 ||!selectedPokemon2) {
      alert('Please select Pokemon!');
      return;
    }

    // Calculate the total stats for each Pokémon
    const totalStats1 = getTotalStats(selectedPokemon1.base);
    const totalStats2 = getTotalStats(selectedPokemon2.base);

    // Determine the winner of the fight based on the total stats
    let fightWinner;
    if (totalStats1 > totalStats2) {
      fightWinner = selectedPokemon1;
    } else if (totalStats1 < totalStats2) {
      fightWinner = selectedPokemon2;
    } else {
      fightWinner = 'It\'s a tie!';
    }

    // Update the winner state with the fight winner
    setWinner(fightWinner);

    // Make a POST request to the API to save the fight score
    try {
      await axios.post('http://localhost:3000/save-score', {
        winner: fightWinner.name,
        pokemon1: selectedPokemon1,
        pokemon2: selectedPokemon2,
      });
    } catch (error) {
      // Log any errors that occur during the API request
      console.error('Error saving score:', error);
    }
  };

  // Function to calculate the total stats for a Pokémon
  const getTotalStats = (baseStats) => {
    return Object.values(baseStats).reduce((total, stat) => total + stat, 0);
  };

  // JSX for the GameBoard component
  return (
    <>
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
    </>
  );



}
export default Offcanvas;










