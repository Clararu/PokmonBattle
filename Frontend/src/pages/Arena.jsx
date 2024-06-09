import { useContext, useEffect } from 'react';
import { PokemonContext } from '../context/PokemonContext';
import PokemonCard from '../components/PokemonCard';

function Arena() {
  const { username, setOpponentPokemonId, pokemonDataLength, opponentPokemonId } = useContext(PokemonContext);

  useEffect(() => {
    const newRandomNumber = Math.floor(Math.random() * pokemonDataLength) + 1;
    setOpponentPokemonId(newRandomNumber); // Save the randomNumber as opponentPokemonId
  }, [pokemonDataLength, setOpponentPokemonId]);

  // useEffect(() => {
  //   console.log(pokemonDataLength);
  //   console.log(pokemonData);
  //   console.log(opponentPokemonId);
  // }, [pokemonData, opponentPokemonId, pokemonDataLength]);

  return (
    <div
      className="fixed inset-0 flex items-start justify-center bg-cover bg-center pt-5"
      style={{ backgroundImage: "url('/src/assets/images/stadium1.png')" }}>
      <div className="w-64 rounded bg-white bg-opacity-30 p-6 backdrop-blur-md">
        <h1 className="text-xl font-bold text-black">Welcome {username}</h1>
      </div>
      <div>{opponentPokemonId && <PokemonCard pokemonId={opponentPokemonId} />}</div>
      <div>
        <button className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700">
          Choose different opponent
        </button>
        <button className="mt-4 rounded bg-green-500 px-4 py-2 font-bold text-white hover:bg-green-700">
          Other random opponent
        </button>
      </div>
    </div>
  );
}

export default Arena;
