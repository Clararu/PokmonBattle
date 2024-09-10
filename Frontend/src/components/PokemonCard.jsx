// ! bekommt eine ID läde das entsprechende Image und Daten
import { useState, useEffect, useContext } from 'react';
import { GetPokemonImage } from './GetPokemonImages';
import { PokemonContext } from '../context/PokemonContext';

const PokemonCard = ({ pokemonId, onClick }) => {
  const { pokemonData } = useContext(PokemonContext);
  const [pokemon, setPokemon] = useState(null);
  const [pokemonImage, setPokemonImage] = useState(null);

  useEffect(() => {
    const foundPokemon = pokemonData.find((pokemon) => pokemon.id === pokemonId);
    setPokemon(foundPokemon);

    const fetchData = async () => {
      const pokemonImageData = await GetPokemonImage(pokemonId);
      setPokemonImage(pokemonImageData);
    };

    fetchData();
  }, [pokemonId, pokemonData]);

  if (!pokemon || !pokemonImage) {
    return (
      <div className="m-6 flex w-full flex-col gap-5 md:w-52">
        <div className="skeleton h-32 w-full"></div>
        <div className="skeleton h-4 w-28"></div>
        <div className="skeleton h-4 w-full"></div>
        <div className="skeleton h-4 w-full"></div>
      </div>
    );
  }

  // Pokemon type colors
  const colors = {
    Fire: 'badge text-gray-100 text-lg mr-2 p-4 bg-red-400 select-none',
    Water: 'badge text-gray-100 text-lg mr-2 p-4 bg-blue-400 select-none',
    Air: 'badge text-gray-100 text-lg mr-2 p-4 bg-blue-400 select-none',
    Ice: 'badge text-gray-600 text-lg mr-2 p-4 bg-blue-200 select-none',
    Grass: 'badge text-gray-100 text-lg mr-2 p-4 bg-green-600 select-none',
    Normal: 'badge text-gray-100 text-lg mr-2 p-4 bg-slate-400 select-none',
    Ground: 'badge text-gray-100 text-lg mr-2 p-4 bg-orange-800 select-none',
    Poison: 'badge text-gray-100 text-lg mr-2 p-4 bg-green-500 select-none',
    Flying: 'badge text-gray-100 text-lg mr-2 p-4 bg-yellow-400 select-none',
    Bug: 'badge text-gray-100 text-lg mr-2 p-4 bg-orange-900 select-none',
    Electric: 'badge text-gray-100 text-lg mr-2 p-4 bg-yellow-500 select-none',
    Fairy: 'badge text-gray-100 text-lg mr-2 p-4 bg-red-300 select-none',
    Psychic: 'badge text-gray-100 text-lg mr-2 p-4 bg-purple-400 select-none',
    Fighting: 'badge text-gray-100 text-sm mr-2 p-4 bg-gray-700 select-none',
    Rock: 'badge text-gray-100 text-lg mr-2 p-4 bg-slate-700 select-none',
    Dark: 'badge text-gray-100 text-lg mr-2 p-4 bg-slate-900 select-none',
    Ghost: 'badge text-gray-600 text-lg mr-2 p-4 bg-gray-300 border-2 border-gray-800 select-none',
    Steel: 'badge text-gray-100 text-lg mr-2 p-4 bg-slate-700 select-none',
    Dragon: 'badge text-gray-100 text-lg mr-2 p-4 bg-green-900 border-4 border-green-400 select-none',
  };

  return (
    <div onClick={onClick} className="w-full p-4 md:w-1/2 lg:w-1/4">
      <div className="card h-72 w-64 max-w-xs transform justify-center border-4 border-slate-900 bg-base-100 shadow-xl transition-transform hover:scale-105">
        <div className="flex flex-col items-center">
          {/* Pokemon image */}
          <div className="h-32 w-32">
            <img src={pokemonImage} alt={pokemon.name.english} className="h-full w-full rounded-xl object-contain" />
          </div>

          {/* Pokemon details */}
          <div className="card-body flex flex-col justify-between rounded-lg bg-gray-300 p-4">
            <div className="text-center">
              <p className="text-lg font-bold text-gray-700">{pokemon.name.english}</p>
            </div>
            {/* Pokemon type */}
            <div className="mt-2 flex justify-center">
              <ul className="flex space-x-2">
                {pokemon.type.map((type, index) => (
                  <li key={index} className={colors[type]}>
                    {type}
                  </li>
                ))}
              </ul>
            </div>
            {/* Base stats */}
            <div className="mt-4 grid grid-cols-2 gap-2">
              <div className="flex flex-col items-center">
                <p className="text-sm text-gray-600">HP</p>
                <p className="text-lg font-bold text-green-500">{pokemon.base.HP}</p>
              </div>
              <div className="flex flex-col items-center">
                <p className="text-sm text-gray-600">Speed</p>
                <p className="text-lg font-bold text-yellow-500">{pokemon.base.Speed}</p>
              </div>
              <div className="flex flex-col items-center">
                <p className="text-sm text-gray-600">Attack</p>
                <p className="text-lg font-bold text-red-500">{pokemon.base.Attack}</p>
              </div>
              <div className="flex flex-col items-center">
                <p className="text-sm text-gray-600">Defense</p>
                <p className="text-lg font-bold text-blue-500">{pokemon.base.Defense}</p>
              </div>
              {/* Special Attack */}
              <div className="flex flex-col items-center">
                <p className="text-sm text-gray-600">Sp. Attack</p>
                <p className="text-lg font-bold text-orange-500">{pokemon.base['Sp. Attack']}</p>
              </div>
              {/* Special Defense */}
              <div className="flex flex-col items-center">
                <p className="text-sm text-gray-600">Sp. Defense</p>
                <p className="text-lg font-bold text-purple-500">{pokemon.base['Sp. Defense']}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokemonCard;
