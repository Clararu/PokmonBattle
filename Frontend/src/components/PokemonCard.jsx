import { useState, useEffect, useContext } from 'react';
import { GetPokemonImage } from './GetPokemonImages';
import { PokemonContext } from '../context/PokemonContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHeartbeat,
  faShieldAlt,
  faFistRaised,
  faMeteor,
  faShieldVirus,
  faTachometerAlt,
} from '@fortawesome/free-solid-svg-icons';

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

  // Adjusted function to calculate bar width between 5 and 250
  const calculateBarWidth = (value) => {
    const minValue = 5;
    const maxValue = 250;
    const logValue = Math.log(value);
    const logMin = Math.log(minValue);
    const logMax = Math.log(maxValue);
    const barWidth = ((logValue - logMin) / (logMax - logMin)) * 100;

    // Ensure a minimum width for visibility
    return Math.max(barWidth, 5);
  };

  // Adjusted badge styles with increased padding, bolder and brighter font
  const colors = {
    Fire: 'badge text-white text-lg font-bold px-4 py-1 bg-red-400 select-none',
    Water: 'badge text-white text-lg font-bold px-4 py-1 bg-blue-400 select-none',
    Grass: 'badge text-white text-lg font-bold px-4 py-1 bg-green-600 select-none',
    Normal: 'badge text-white text-lg font-bold px-4 py-1 bg-slate-400 select-none',
    Ground: 'badge text-white text-lg font-bold px-4 py-1 bg-orange-800 select-none',
    Poison: 'badge text-white text-lg font-bold px-4 py-1 bg-green-500 select-none',
    Flying: 'badge text-white text-lg font-bold px-4 py-1 bg-yellow-500 select-none',
    Bug: 'badge text-white text-lg font-bold px-4 py-1 bg-orange-900 select-none',
    Electric: 'badge text-white text-lg font-bold px-4 py-1 bg-yellow-500 select-none',
    Fairy: 'badge text-white text-lg font-bold px-4 py-1 bg-red-300 select-none',
    Psychic: 'badge text-white text-lg font-bold px-4 py-1 bg-purple-400 select-none',
    Fighting: 'badge text-white text-lg font-bold px-4 py-1 bg-gray-700 select-none',
    Rock: 'badge text-white text-lg font-bold px-4 py-1 bg-slate-700 select-none',
    Dark: 'badge text-white text-lg font-bold px-4 py-1 bg-slate-900 select-none',
    Ghost: 'badge text-white text-lg font-bold px-4 py-1 bg-gray-300 border-2 border-gray-800 select-none',
    Steel: 'badge text-white text-lg font-bold px-4 py-1 bg-slate-700 select-none',
    Dragon: 'badge text-white text-lg font-bold px-4 py-1 bg-green-900 border-4 border-green-400 select-none',
    Ice: 'badge text-white text-lg font-bold px-4 py-1 bg-blue-200 select-none',
  };

  // Define the custom Tailwind colors for text
  const statColors = {
    HP: 'text-hp', // Use custom Tailwind color for HP
    Speed: 'text-speed', // Use custom Tailwind color for Speed
    Attack: 'text-attack', // Use custom Tailwind color for Attack
    Defense: 'text-defense', // Use custom Tailwind color for Defense
    'S-Atk': 'text-s-atk', // Use custom Tailwind color for Special Attack
    'S-Def': 'text-s-def', // Use custom Tailwind color for Special Defense
  };

  // Background colors for bars (use bg- prefixes)
  const barColors = {
    HP: 'bg-green-500', // Green for HP
    Speed: 'bg-yellow-500', // Yellow for Speed
    Attack: 'bg-red-500', // Red for Attack
    Defense: 'bg-blue-500', // Blue for Defense
    'S-Atk': 'bg-orange-500', // Orange for Special Attack
    'S-Def': 'bg-purple-500', // Purple for Special Defense
  };

  return (
    <div onClick={onClick} className="w-full p-4 md:w-1/2 lg:w-1/4">
      <div className="card relative w-64 max-w-xs rounded-3xl border-2 border-gray-400 bg-gradient-to-br from-[#e8d5b7] via-[#e3c6a0] to-[#e3b47b] shadow-lg transition-transform hover:scale-105 hover:shadow-2xl">
        {/* Pokemon Image */}
        <div className="flex justify-center pt-6">
          <div className="h-40 w-40 rounded-full bg-white shadow-inner">
            <img src={pokemonImage} alt={pokemon.name.english} className="h-full w-full rounded-full object-contain" />
          </div>
        </div>

        {/* Pokemon Details */}
        <div className="card-body p-2 text-center">
          <h3 className="text-2xl font-extrabold text-gray-800">{pokemon.name.english}</h3>

          {/* Pokemon type */}
          <div className="mt-1 flex justify-center space-x-2">
            {pokemon.type.map((type, index) => (
              <span key={index} className={colors[type] || 'badge bg-gray-400'}>
                {type}
              </span>
            ))}
          </div>

          {/* Base stats */}
          <div className="mt-2 grid grid-cols-2 gap-1.5 text-sm">
            {[
              {
                name: 'HP',
                value: pokemon.base.HP,
                colorClass: statColors.HP,
                barClass: barColors.HP,
                icon: faHeartbeat,
              },
              {
                name: 'Speed',
                value: pokemon.base.Speed,
                colorClass: statColors.Speed,
                barClass: barColors.Speed,
                icon: faTachometerAlt,
              }, // Using Tachometer for speed
              {
                name: 'Attack',
                value: pokemon.base.Attack,
                colorClass: statColors.Attack,
                barClass: barColors.Attack,
                icon: faFistRaised,
              },
              {
                name: 'Defense',
                value: pokemon.base.Defense,
                colorClass: statColors.Defense,
                barClass: barColors.Defense,
                icon: faShieldAlt,
              },
              {
                name: 'S-Atk',
                value: pokemon.base['Sp. Attack'],
                colorClass: statColors['S-Atk'],
                barClass: barColors['S-Atk'],
                icon: faMeteor,
              }, // Shortened "S-Attack" to "S-Atk"
              {
                name: 'S-Def',
                value: pokemon.base['Sp. Defense'],
                colorClass: statColors['S-Def'],
                barClass: barColors['S-Def'],
                icon: faShieldVirus,
              }, // Shortened "S-Defense" to "S-Def"
            ].map((stat, index) => (
              <div key={index} className="flex w-full flex-col items-center rounded-lg bg-white p-2 shadow-md">
                {/* Horizontal Layout for Icon, Name, and Value */}
                <div className="flex w-full items-center justify-between whitespace-nowrap">
                  <FontAwesomeIcon icon={stat.icon} className={`text-xl ${stat.colorClass}`} />
                  <span className="text-xs text-gray-800">{stat.name}</span> {/* Kept stat name gray */}
                  <span className={`text-lg font-bold ${stat.colorClass}`}>{stat.value}</span>{' '}
                  {/* Color applied to number */}
                </div>
                {/* Bar Underneath */}
                <div className="mt-1 h-3 w-full rounded-full bg-gray-300">
                  <div
                    className={`h-full rounded-full ${stat.barClass}`}
                    style={{ width: `${calculateBarWidth(stat.value)}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Decorative border */}
        <div className="pointer-events-none absolute inset-0 rounded-3xl border-2 border-gray-400"></div>
      </div>
    </div>
  );
};

export default PokemonCard;
