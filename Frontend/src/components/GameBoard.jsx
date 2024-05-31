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

      <header class="bg-transparent">
      </header>
       
      <main className="flex flex-col items-center h-full bg-[url('./assets/stadium2.png')] bg-cover bg-no-repeat">
          <div className='w-96 py-2'>
            <img className="" src="./src/assets/PokeFight_logo.png"/>
          </div>  


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
                  <div>
                    <button 
                      onClick={startFight} 
                      className=" bg-red-600 text-2xl text-red-100 font-bold ml-200 px-5 py-3 rounded-full hover:bg-red-700"
                    //absolute bottom-0 mb-48 bg-green-900 text-white px-4 py-2 rounded hover:bg-yellow-300"
                    >
                      Fight!
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
          {winner && (
            <h2 className="mt-8 text-center text-xl font-semibold">
              {typeof winner === 'string' ? winner : `Winner: ${winner.name.english}`}
            </h2>
          )}


    

        </div>
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


