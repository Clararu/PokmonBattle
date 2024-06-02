// Importing necessary React hooks and axios library
import { useState, useEffect } from 'react';
import axios from 'axios';
import PokemonCard from './PokemonCard';

// GameBoard component
function GameBoard() {
  // State variables to store the list of Pokémon, the two selected Pokémon, and the winner of the fight
  const [pokemonList, setPokemonList] = useState([]);
  const [selectedPokemon1, setSelectedPokemon1] = useState(null);
  const [selectedPokemon2, setSelectedPokemon2] = useState(null);
  const [winner, setWinner] = useState(null);

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
      <div className="flex flex-wrap items-center w-10/12">
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
    </>
  );
}

// Export the GameBoard component
export default GameBoard;