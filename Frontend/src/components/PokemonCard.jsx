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
    return <div className="flex flex-col m-6 gap-5 w-52">
          <div className="skeleton h-32 w-full"></div>
          <div className="skeleton h-4 w-28"></div>
          <div className="skeleton h-4 w-full"></div>
          <div className="skeleton h-4 w-full"></div>
      </div>;
  }

  // Pokemon type colors
  const colors = {
    Fire: 'badge text-gray-100 text-xl mr-2 p-5 bg-red-400 select-none',
    Water: 'badge text-gray-100 text-xl mr-2 p-5 bg-blue-400 select-none',
    Air: 'badge text-gray-100 text-xl mr-2 p-5 bg-blue-400 select-none',
    Ice: 'badge text-gray-600 text-xl mr-2 p-5 bg-blue-200 select-none',
    Grass: 'badge text-gray-100 text-xl mr-2 p-5 bg-green-600 select-none',
    Normal: 'badge text-gray-100 text-xl mr-2 p-5 bg-slate-400 select-none',
    Ground: 'badge text-gray-100 text-xl mr-2 p-5 bg-orange-800 select-none',
    Poison: 'badge text-gray-100 text-xl mr-2 p-5 bg-green-500 select-none',
    Flying: 'badge text-gray-100 text-xl mr-2 p-5 bg-yellow-400 select-none',
    Bug: 'badge text-gray-100 text-xl mr-2 p-5 bg-orange-900 select-none',
    Electric: 'badge text-gray-100 text-xl mr-2 p-5 bg-yellow-500 select-none',
    Fairy: 'badge text-gray-100 text-xl mr-2 p-5 bg-red-300 select-none',
    Psychic: 'badge text-gray-100 text-xl mr-2 p-5 bg-purple-400 select-none',
    Fighting: 'badge text-gray-100 text-xl mr-2 p-5 bg-gray-700 select-none',
    Rock: 'badge text-gray-100 text-xl mr-2 p-5 bg-slate-700 select-none',
    Dark: 'badge text-gray-100 text-xl mr-2 p-5 bg-slate-900 select-none',
    Ghost: 'badge text-gray-600 text-xl mr-2 p-5 bg-gray-300 border-2 border-gray-800 select-none',
    Steel: 'badge text-gray-100 text-xl mr-2 p-5 bg-slate-700 select-none',
    Dragon: 'badge text-gray-100 text-xl mr-2 p-5 bg-green-900 border-4 border-green-400 select-none',
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
    <div onClick={onClick}>
      <div>
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
                            className="size-7">
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
                            className="size-7">
                            <path
                              fillRule="evenodd"
                              d="m11.998 2l.032.002l.086.005a1 1 0 0 1 .342.104l.105.062l.097.076l.016.015l.247.21a11 11 0 0 0 7.189 2.537l.342-.01a1 1 0 0 1 1.005.717a13 13 0 0 1-9.208 16.25a1 1 0 0 1-.502 0A13 13 0 0 1 2.54 5.718a1 1 0 0 1 1.005-.717a11 11 0 0 0 7.791-2.75l.046-.036l.053-.041a1 1 0 0 1 .217-.112l.075-.023l.036-.01a1 1 0 0 1 .12-.022l.086-.005zM12 4.296l-.176.135a13 13 0 0 1-7.288 2.572l-.264.006l-.064.31a11 11 0 0 0 1.064 7.175l.17.314a11 11 0 0 0 6.49 5.136l.068.019z"
                              clipRule="evenodd"></path>
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
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="size-7">
                            <path
                              fillRule="evenodd"
                              d="M9 4.5a.75.75 0 0 1 .721.544l.813 2.846a3.75 3.75 0 0 0 2.576 2.576l2.846.813a.75.75 0 0 1 0 1.442l-2.846.813a3.75 3.75 0 0 0-2.576 2.576l-.813 2.846a.75.75 0 0 1-1.442 0l-.813-2.846a3.75 3.75 0 0 0-2.576-2.576l-2.846-.813a.75.75 0 0 1 0-1.442l2.846-.813A3.75 3.75 0 0 0 7.466 7.89l.813-2.846A.75.75 0 0 1 9 4.5ZM18 1.5a.75.75 0 0 1 .728.568l.258 1.036c.236.94.97 1.674 1.91 1.91l1.036.258a.75.75 0 0 1 0 1.456l-1.036.258c-.94.236-1.674.97-1.91 1.91l-.258 1.036a.75.75 0 0 1-1.456 0l-.258-1.036a2.625 2.625 0 0 0-1.91-1.91l-1.036-.258a.75.75 0 0 1 0-1.456l1.036-.258a2.625 2.625 0 0 0 1.91-1.91l.258-1.036A.75.75 0 0 1 18 1.5ZM16.5 15a.75.75 0 0 1 .712.513l.394 1.183c.15.447.5.799.948.948l1.183.395a.75.75 0 0 1 0 1.422l-1.183.395c-.447.15-.799.5-.948.948l-.395 1.183a.75.75 0 0 1-1.422 0l-.395-1.183a1.5 1.5 0 0 0-.948-.948l-1.183-.395a.75.75 0 0 1 0-1.422l1.183-.395c.447-.15.799-.5.948-.948l.395-1.183A.75.75 0 0 1 16.5 15Z"
                              clipRule="evenodd"
                            />
                          </svg>
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
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="size-7">
                            <path
                              fillRule="evenodd"
                              d="M12.908 1.581a1 1 0 0 0-1.816 0l-2.87 6.22l-6.801.807a1 1 0 0 0-.562 1.727l5.03 4.65l-1.335 6.72a1 1 0 0 0 1.469 1.067L12 19.426l5.977 3.346a1 1 0 0 0 1.47-1.068l-1.335-6.718l5.029-4.651a1 1 0 0 0-.562-1.727L15.777 7.8z"
                              clipRule="evenodd"
                            />
                          </svg>
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
                            className="size-8">
                            <path
                              fillRule="evenodd"
                              d="M10 .4A9.6 9.6 0 0 0 .4 10a9.6 9.6 0 1 0 19.2-.001C19.6 4.698 15.301.4 10 .4m0 17.199a7.6 7.6 0 1 1 0-15.2V10l6.792-3.396A7.548 7.548 0 0 1 17.6 10a7.6 7.6 0 0 1-7.6 7.599"
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
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="size-7">
                            <path
                              fillRule="evenodd"
                              d="M14.615 1.595a.75.75 0 0 1 .359.852L12.982 9.75h7.268a.75.75 0 0 1 .548 1.262l-10.5 11.25a.75.75 0 0 1-1.272-.71l1.992-7.302H3.75a.75.75 0 0 1-.548-1.262l10.5-11.25a.75.75 0 0 1 .913-.143Z"
                              clipRule="evenodd"
                            />
                          </svg>
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
    </div>
  );
};

export default PokemonCard;
