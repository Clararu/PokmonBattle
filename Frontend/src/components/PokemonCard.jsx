// ! bekommt eine ID läde das entsprechende Image und Daten
import { useState, useEffect, useContext } from 'react';
import { GetPokemonImage } from './GetPokemonImages';
import { PokemonContext } from '../context/PokemonContext';

const PokemonCard = ({ pokemonId }) => {
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
    return <div>Loading...</div>;
  }

  // Pokemon type colors
  const colors = {
    Fire: 'badge text-gray-100 text-xl p-5 bg-red-400 select-none',
    Water: 'badge text-gray-100 text-xl p-5 bg-blue-400 select-none',
    Air: 'badge text-gray-100 text-xl p-5 bg-blue-400 select-none',
    Ice: 'badge text-gray-600 text-xl p-5 bg-blue-200 select-none',
    Grass: 'badge text-gray-100 text-xl p-5 bg-green-600 select-none',
    Normal: 'badge text-gray-100 text-xl p-5 bg-slate-400 select-none',
    Ground: 'badge text-gray-100 text-xl p-5 bg-orange-800 select-none',
    Poison: 'badge text-gray-100 text-xl p-5 bg-green-500 select-none',
    Flying: 'badge text-gray-100 text-xl p-5 bg-yellow-400 select-none',
    Bug: 'badge text-gray-100 text-xl p-5 bg-orange-900 select-none',
    Electric: 'badge text-gray-100 text-xl p-5 bg-yellow-500 select-none',
    Fairy: 'badge text-gray-100 text-xl p-5 bg-red-300 select-none',
    Psychic: 'badge text-gray-100 text-xl p-5 bg-purple-400 select-none',
    Fighting: 'badge text-gray-100 text-xl p-5 bg-gray-700 select-none',
    Rock: 'badge text-gray-100 text-xl p-5 bg-slate-700 select-none',
    Dark: 'badge text-gray-100 text-xl p-5 bg-slate-900 select-none',
    Ghost: 'badge text-gray-600 text-xl p-5 bg-gray-300 border-2 border-gray-800 select-none',
    Steel: 'badge text-gray-100 text-xl p-5 bg-slate-700 select-none',
    Dragon: 'badge text-gray-100 text-xl p-5 bg-green-900 border-4 border-green-400 select-none',
  };

  // You can use
  // Contextscale-0 (scales an element down to 0% of its original size)
  // scale-50 (scales an element down to 50% of its original size)
  // scale-75 (scales an element down to 75% of its original size)
  // scale-90 (scales an element down to 90% of its original size)
  // scale-95 (scales an element down to 95% of its original size)
  // scale-100 (scales an element to its original size)
  // scale-105 (scales an element up to 105% of its original size)
  // scale-110 (scales an element up to 110% of its original size)
  // scale-125 (scales an element up to 125% of its original size)
  // scale-150 (scales an element up to 150% of its original size)
  // or
  // module.exports = {
  //   theme: {
  //     extend: {
  //       scale: {
  //         '10': '0.1',
  //       },
  //     },
  //   },
  //   variants: {},
  //   plugins: [],
  // };
  return (
    <>
      <div className="scale-75 transform">
        {/* PokemonCard */}
        <div className="card m-2 transform justify-center border-8 border-slate-900 bg-base-100 p-5 shadow-2xl transition-transform hover:scale-105">
          <div className="flex flex-col">
            {/* Pokemon image */}
            <div className="">
              {pokemonImage ? (
                <img src={pokemonImage} alt={pokemon.name.english} className="mx-auto h-full w-8/12 rounded-xl" />
              ) : (
                <p>
                  Loading image <span className="loading-sd loading loading-dots"></span>
                </p>
              )}
            </div>
            <div className="card-body items-end rounded-b-md bg-gray-300">
              <div className="flex flex-col">
                {/* Pokemon name */}
                <div className="flex flex-row">
                  <p className="min-w-96 max-w-96 select-none text-6xl font-bold text-gray-700">
                    {pokemon.name.english}&nbsp;
                  </p>
                </div>
                {/* Pokemon type */}
                <div className="mt-5 flex flex-row">
                  <ul>
                    {pokemon.type.map((type, index) => (
                      <li className={colors[type]} key={index}>
                        {type}
                      </li>
                    ))}
                  </ul>
                </div>
                <br />

                {/* Base stats section */}
                <div className="flex flex-row justify-center">
                  {/* Left column */}
                  <div className="flex flex-col items-center justify-end">
                    {/* Health */}
                    <div className="m-1 flex w-full flex-row items-center justify-center rounded-xl bg-gray-200">
                      <div className="mx-2 flex w-full flex-col py-2">
                        <div className="flex flex-row items-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="size-6">
                            <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
                          </svg>
                          <p className="select-none px-1 text-2xl font-semibold text-gray-600">Health</p>
                          <p className="select-none px-1 pb-1 font-mono text-4xl font-semibold text-green-400">
                            {pokemon.base.HP}
                          </p>
                        </div>
                        <progress className="progress flex flex-row" value={pokemon.base.HP} max="200"></progress>
                      </div>
                    </div>

                    {/* Defense */}
                    <div className="m-1 flex w-full flex-row items-center justify-center rounded-xl bg-gray-200">
                      <div className="mx-2 flex w-full flex-col py-2">
                        <div className="flex flex-row items-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="size-6">
                            <path
                              fillRule="evenodd"
                              d="M11.484 2.17a.75.75 0 0 1 1.032 0 11.209 11.209 0 0 0 7.877 3.08.75.75 0 0 1 .722.515 12.74 12.74 0 0 1 .635 3.985c0 5.942-4.064 10.933-9.563 12.348a.749.749 0 0 1-.374 0C6.314 20.683 2.25 15.692 2.25 9.75c0-1.39.223-2.73.635-3.985a.75.75 0 0 1 .722-.516l.143.001c2.996 0 5.718-1.17 7.734-3.08ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75ZM12 15a.75.75 0 0 0-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 0 0 .75-.75v-.008a.75.75 0 0 0-.75-.75H12Z"
                              clipRule="evenodd"
                            />
                          </svg>
                          <p className="select-none px-1 text-2xl font-semibold text-gray-600">Defense</p>
                          <p className="select-none px-1 pb-1 font-mono text-4xl font-semibold text-blue-400">
                            {pokemon.base.Defense}
                          </p>
                        </div>
                        <progress className="progress flex flex-row" value={pokemon.base.HP} max="200"></progress>
                      </div>
                    </div>

                    {/* Special Defense */}
                    <div className="m-1 flex w-full flex-row items-center justify-center rounded-xl bg-gray-200">
                      <div className="mx-2 flex w-full flex-col py-2">
                        <div className="flex flex-row items-center">
                          <div className="w-6">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className="svg_dd790ee3">
                              <path d="M960 0q53 0 98 6t89 20 84 34 86 48q74 46 145 75t145 45 150 22 163 6v352q0 157-30 308t-89 292-143 266-190 233-235 194-273 147q-145-60-273-146t-234-194-191-234-142-266-89-291T0 608V256q87 0 164-6t149-22 144-45 147-76q43-27 85-47t84-33 89-20 98-7zm832 382q-152-7-286-48t-263-122q-68-43-134-63t-149-21q-82 0-149 21t-135 64q-128 80-262 121t-286 48v226q0 210 58 406t167 366 262 305 345 223q191-88 345-223t262-304 166-366 59-407V382zM960 256q62 0 110 14t101 48q115 73 236 117t257 64v109q0 182-49 354t-141 323-222 274-292 207q-162-84-292-207t-222-273-141-323-49-355V499q136-19 256-62t235-118q51-32 101-47t112-16zm96 640l128-256H960l-224 448h192l-192 384 576-576h-256z"></path>
                            </svg>
                          </div>
                          <p className="text-md select-none px-1 font-semibold text-gray-600">S-Defense</p>
                          <p className="select-none px-1 pb-1 font-mono text-4xl font-semibold text-purple-400">
                            {pokemon.base['Sp. Defense']}
                          </p>
                        </div>
                        <progress
                          className="progress flex flex-row"
                          value={pokemon.base['Sp. Defense']}
                          max="200"></progress>
                      </div>
                    </div>
                  </div>

                  {/* Column Divider */}
                  <div className="flex w-3 flex-col items-end"></div>

                  {/* Right Column */}
                  <div className="flex flex-col items-center justify-end">
                    {/* Attack */}
                    <div className="m-1 flex w-full flex-row items-center justify-center rounded-xl bg-gray-200">
                      <div className="mx-2 flex w-full flex-col py-2">
                        <div className="flex flex-row items-center">
                          <div className="w-6">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 2048 2048"
                              className="svg_dd790ee3"
                              focusable="false">
                              <path d="M2048 1024l-384 256 96 480-480-96-256 384-256-384-480 96 96-480L0 1024l384-256-96-480 480 96L1024 0l256 384 480-96-96 480 384 256z"></path>
                            </svg>
                          </div>
                          <p className="select-none px-1 text-2xl font-semibold text-gray-600">Attack</p>
                          <p className="select-none px-1 pb-1 font-mono text-4xl font-semibold text-red-400">
                            {pokemon.base.Attack}
                          </p>
                        </div>
                        <progress className="progress flex flex-row" value={pokemon.base.Attack} max="200"></progress>
                      </div>
                    </div>

                    {/* Speed */}
                    <div className="m-1 flex w-full flex-row items-center justify-center rounded-xl bg-gray-200">
                      <div className="mx-2 flex w-full flex-col py-2">
                        <div className="flex flex-row items-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="size-6">
                            <path
                              fillRule="evenodd"
                              d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 6a.75.75 0 0 0-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 0 0 0-1.5h-3.75V6Z"
                              clipRule="evenodd"
                            />
                          </svg>
                          <p className="select-none px-1 text-2xl font-semibold text-gray-600">Speed</p>
                          <p className="select-none px-1 pb-1 font-mono text-4xl font-semibold text-yellow-400">
                            {pokemon.base.Speed}
                          </p>
                        </div>
                        <progress className="progress flex flex-row" value={pokemon.base.Speed} max="200"></progress>
                      </div>
                    </div>

                    {/* Special Attack */}
                    <div className="m-1 flex w-full flex-row items-center justify-center rounded-xl bg-gray-200">
                      <div className="mx-2 flex w-full flex-col py-2">
                        <div className="flex flex-row items-center">
                          <div className="w-6">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              className="size-6 h-6 w-6">
                              <path
                                fillRule="evenodd"
                                d="M9 4.5a.75.75 0 0 1 .721.544l.813 2.846a3.75 3.75 0 0 0 2.576 2.576l2.846.813a.75.75 0 0 1 0 1.442l-2.846.813a3.75 3.75 0 0 0-2.576 2.576l-.813 2.846a.75.75 0 0 1-1.442 0l-.813-2.846a3.75 3.75 0 0 0-2.576-2.576l-2.846-.813a.75.75 0 0 1 0-1.442l2.846-.813A3.75 3.75 0 0 0 7.466 7.89l.813-2.846A.75.75 0 0 1 9 4.5ZM18 1.5a.75.75 0 0 1 .728.568l.258 1.036c.236.94.97 1.674 1.91 1.91l1.036.258a.75.75 0 0 1 0 1.456l-1.036.258c-.94.236-1.674.97-1.91 1.91l-.258 1.036a.75.75 0 0 1-1.456 0l-.258-1.036a2.625 2.625 0 0 0-1.91-1.91l-1.036-.258a.75.75 0 0 1 0-1.456l1.036-.258a2.625 2.625 0 0 0 1.91-1.91l.258-1.036A.75.75 0 0 1 18 1.5ZM16.5 15a.75.75 0 0 1 .712.513l.394 1.183c.15.447.5.799.948.948l1.183.395a.75.75 0 0 1 0 1.422l-1.183.395c-.447.15-.799.5-.948.948l-.395 1.183a.75.75 0 0 1-1.422 0l-.395-1.183a1.5 1.5 0 0 0-.948-.948l-1.183-.395a.75.75 0 0 1 0-1.422l1.183-.395c.447-.15.799-.5.948-.948l.395-1.183A.75.75 0 0 1 16.5 15Z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </div>
                          <p className="text-md select-none px-1 font-semibold text-gray-600">S-Attack</p>
                          <p className="select-none px-1 pb-1 font-mono text-4xl font-semibold text-orange-400">
                            {pokemon.base['Sp. Attack']}
                          </p>
                        </div>
                        <progress
                          className="progress flex flex-row"
                          value={pokemon.base['Sp. Attack']}
                          max="200"></progress>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PokemonCard;
