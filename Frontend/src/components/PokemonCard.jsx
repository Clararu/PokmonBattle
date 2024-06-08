import { useEffect, useState } from 'react';
import axios from 'axios';

function PokemonCard({ pokemon, onClick }) {
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    if (pokemon) {
      const fetchImageUrl = async () => {
        try {
          const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon.id}`);
          setImageUrl(response.data.sprites.front_default);
        } catch (error) {
          console.error('Error fetching the pokemon image:', error);
        }
      };
      fetchImageUrl();
    }
  }, [pokemon]);

  if (!pokemon) return null;


  // Pokemon type colors
  const colors = {
    Fire:
      "badge text-gray-100 text-xl p-5 bg-red-400 select-none",
    Water:
      "badge text-gray-100 text-xl p-5 bg-blue-400 select-none",
    Air:
      "badge text-gray-100 text-xl p-5 bg-blue-400 select-none",
    Ice: 
      "badge text-gray-600 text-xl p-5 bg-blue-200 select-none",
    Grass:
      "badge text-gray-100 text-xl p-5 bg-green-600 select-none",
    Normal:
      "badge text-gray-100 text-xl p-5 bg-slate-400 select-none",
    Ground: 
      "badge text-gray-100 text-xl p-5 bg-orange-800 select-none",  
    Poison: 
      "badge text-gray-100 text-xl p-5 bg-green-500 select-none",
    Flying: 
      "badge text-gray-100 text-xl p-5 bg-yellow-400 select-none",
    Bug: 
      "badge text-gray-100 text-xl p-5 bg-orange-900 select-none", 
    Electric: 
      "badge text-gray-100 text-xl p-5 bg-yellow-500 select-none",
    Fairy: 
      "badge text-gray-100 text-xl p-5 bg-red-300 select-none",
    Psychic: 
      "badge text-gray-100 text-xl p-5 bg-purple-400 select-none",
    Fighting: 
      "badge text-gray-100 text-xl p-5 bg-gray-700 select-none",
    Rock: 
      "badge text-gray-100 text-xl p-5 bg-slate-700 select-none",
    Dark: 
      "badge text-gray-100 text-xl p-5 bg-slate-900 select-none",
    Ghost: 
      "badge text-gray-600 text-xl p-5 bg-gray-300 border-2 border-gray-800 select-none",
    Steel: 
      "badge text-gray-100 text-xl p-5 bg-slate-700 select-none", 
    Dragon: 
      "badge text-gray-100 text-xl p-5 bg-green-900 border-4 border-green-400 select-none",        

  };

  return (

    <>
      {/* PokemonCard */}
      <div className="card bg-base-100 m-2 p-5 justify-center border-8 border-slate-900 shadow-2xl transition-transform transform hover:scale-105 cursor-pointer" onClick={onClick}>
          <div className="flex flex-col">
              {/* Pokemon image */}
              <div className=''>
              {imageUrl ? <img src={imageUrl} alt={pokemon.name.english} className="h-full mx-auto w-8/12 rounded-xl" /> : <p>Loading image...</p>}
              </div>
            <div className="card-body items-end rounded-b-md bg-gray-300">
            <div className="flex flex-col">
              {/* Pokemon name */}
                <div className="flex flex-row">
                  <p className="min-w-96 max-w-96 text-6xl font-bold text-gray-700 select-none">{pokemon.name.english}&nbsp;</p>
                </div>
                {/* Pokemon type */}
                <div className='flex flex-row mt-5'>

                <ul>
                  {Object.keys(pokemon.type).map((key) => (
                    <li className={colors[pokemon.type]} key={key}>{pokemon.type[key]}</li>
                  ))}
                </ul>
                    
                </div>
                <br/>

                {/* Base stats section */}
                <div className="flex flex-row justify-center">

                  {/* Left column */}
                  <div className="flex flex-col min-w-56 items-center justify-end">

                    {/* Health */}
                    <div className="flex flex-row m-1 w-full items-center justify-center rounded-xl bg-gray-200">
                      <div className='flex flex-col py-2 mx-2 w-full'>
                        <div className='flex flex-row items-center'>
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-7">
                            <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
                          </svg>
                          <p className=" text-gray-600 text-2xl px-1 font-semibold select-none">Health</p>
                          <p className="text-4xl pb-1 font-semibold px-1 font-mono text-green-400 select-none">{pokemon.base.HP}</p>
                        </div>
                        <progress className="flex flex-row progress" value={pokemon.base.HP} max="215"></progress>
                      </div>
                    </div>

                    {/* Defense */}
                    <div className="flex flex-row m-1 w-full items-center justify-center rounded-xl bg-gray-200">
                      <div className='flex flex-col py-2 mx-2 w-full'>
                        <div className='flex flex-row items-center'>
                          {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
                            <path fill-rule="evenodd" d="M11.484 2.17a.75.75 0 0 1 1.032 0 11.209 11.209 0 0 0 7.877 3.08.75.75 0 0 1 .722.515 12.74 12.74 0 0 1 .635 3.985c0 5.942-4.064 10.933-9.563 12.348a.749.749 0 0 1-.374 0C6.314 20.683 2.25 15.692 2.25 9.75c0-1.39.223-2.73.635-3.985a.75.75 0 0 1 .722-.516l.143.001c2.996 0 5.718-1.17 7.734-3.08ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75ZM12 15a.75.75 0 0 0-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 0 0 .75-.75v-.008a.75.75 0 0 0-.75-.75H12Z" clip-rule="evenodd" />
                          </svg> */}
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-7">
                            <path fill-rule="evenodd" d="m11.998 2l.032.002l.086.005a1 1 0 0 1 .342.104l.105.062l.097.076l.016.015l.247.21a11 11 0 0 0 7.189 2.537l.342-.01a1 1 0 0 1 1.005.717a13 13 0 0 1-9.208 16.25a1 1 0 0 1-.502 0A13 13 0 0 1 2.54 5.718a1 1 0 0 1 1.005-.717a11 11 0 0 0 7.791-2.75l.046-.036l.053-.041a1 1 0 0 1 .217-.112l.075-.023l.036-.01a1 1 0 0 1 .12-.022l.086-.005zM12 4.296l-.176.135a13 13 0 0 1-7.288 2.572l-.264.006l-.064.31a11 11 0 0 0 1.064 7.175l.17.314a11 11 0 0 0 6.49 5.136l.068.019z" clip-rule="evenodd"></path>
                          </svg>
                          <p className=" text-gray-600 text-2xl px-1 font-semibold select-none">Defense</p>
                          <p className="text-4xl pb-1 font-semibold px-1 font-mono text-blue-400 select-none">{pokemon.base.Defense}</p>
                        </div>
                        <progress className="flex flex-row progress" value={pokemon.base.Defense} max="215"></progress>
                      </div>
                    </div>

                    {/* Special Defense */}
                    <div className="flex flex-row m-1 w-full items-center justify-center rounded-xl bg-gray-200">
                      <div className='flex flex-col py-2 mx-2 w-full'>
                        <div className='flex flex-row items-center'>
                          <div className='w-6'>
                            {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
                              <path fill-rule="evenodd" d="M3.783 2.826L12 1l8.217 1.826a1 1 0 0 1 .783.976v9.987a6 6 0 0 1-2.672 4.992L12 23l-6.328-4.219A6 6 0 0 1 3 13.79V3.802a1 1 0 0 1 .783-.976M13 10V5l-5 7h3v5l5-7z" clip-rule="evenodd"></path>
                            </svg> */}
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-7">
                              <path fill-rule="evenodd" d="M9 4.5a.75.75 0 0 1 .721.544l.813 2.846a3.75 3.75 0 0 0 2.576 2.576l2.846.813a.75.75 0 0 1 0 1.442l-2.846.813a3.75 3.75 0 0 0-2.576 2.576l-.813 2.846a.75.75 0 0 1-1.442 0l-.813-2.846a3.75 3.75 0 0 0-2.576-2.576l-2.846-.813a.75.75 0 0 1 0-1.442l2.846-.813A3.75 3.75 0 0 0 7.466 7.89l.813-2.846A.75.75 0 0 1 9 4.5ZM18 1.5a.75.75 0 0 1 .728.568l.258 1.036c.236.94.97 1.674 1.91 1.91l1.036.258a.75.75 0 0 1 0 1.456l-1.036.258c-.94.236-1.674.97-1.91 1.91l-.258 1.036a.75.75 0 0 1-1.456 0l-.258-1.036a2.625 2.625 0 0 0-1.91-1.91l-1.036-.258a.75.75 0 0 1 0-1.456l1.036-.258a2.625 2.625 0 0 0 1.91-1.91l.258-1.036A.75.75 0 0 1 18 1.5ZM16.5 15a.75.75 0 0 1 .712.513l.394 1.183c.15.447.5.799.948.948l1.183.395a.75.75 0 0 1 0 1.422l-1.183.395c-.447.15-.799.5-.948.948l-.395 1.183a.75.75 0 0 1-1.422 0l-.395-1.183a1.5 1.5 0 0 0-.948-.948l-1.183-.395a.75.75 0 0 1 0-1.422l1.183-.395c.447-.15.799-.5.948-.948l.395-1.183A.75.75 0 0 1 16.5 15Z" clip-rule="evenodd" />
                            </svg>
                          </div>
                          <p className=" text-gray-600 text-md px-2 font-semibold select-none">S-Defense</p>
                          <p className="text-4xl pb-1 font-semibold px-1 font-mono text-purple-400 select-none">{pokemon.base['Sp. Defense']}</p>
                        </div>
                        <progress className="flex flex-row progress" value={pokemon.base['Sp. Defense']} max="215"></progress>
                      </div>
                    </div>

                  </div>

                  {/* Column Divider */}
                  <div className="flex flex-col w-3 items-end">
                  </div>
                  
                  {/* Right Column */}
                  <div className="flex flex-col min-w-56 justify-end items-center">

                    {/* Attack */}
                    <div className="flex flex-row m-1 w-full items-center justify-center rounded-xl bg-gray-200">
                      <div className='flex flex-col py-2 mx-2 w-full'>
                        <div className='flex flex-row items-center'>
                        <div className='w-6'>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-7">
                          <path fill-rule="evenodd" d="M12.908 1.581a1 1 0 0 0-1.816 0l-2.87 6.22l-6.801.807a1 1 0 0 0-.562 1.727l5.03 4.65l-1.335 6.72a1 1 0 0 0 1.469 1.067L12 19.426l5.977 3.346a1 1 0 0 0 1.47-1.068l-1.335-6.718l5.029-4.651a1 1 0 0 0-.562-1.727L15.777 7.8z" clip-rule="evenodd" />
                        </svg>
                          </div>
                          <p className=" text-gray-600 text-2xl px-2 font-semibold select-none">Attack</p>
                          <p className="text-4xl pb-1 font-semibold px-1 font-mono text-red-400 select-none">{pokemon.base.Attack}</p>
                        </div>
                        <progress className="flex flex-row progress" value={pokemon.base.Attack} max="215"></progress>
                      </div>
                    </div>

                    {/* Speed */}
                    <div className="flex flex-row m-1 w-full items-center justify-center rounded-xl bg-gray-200">
                      <div className='flex flex-col py-2 mx-2 w-full'>
                        <div className='flex flex-row items-center'>
                        {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
                          <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 6a.75.75 0 0 0-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 0 0 0-1.5h-3.75V6Z" clip-rule="evenodd" />
                        </svg> */}
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-8">
                          <path fill-rule="evenodd" d="M10 .4A9.6 9.6 0 0 0 .4 10a9.6 9.6 0 1 0 19.2-.001C19.6 4.698 15.301.4 10 .4m0 17.199a7.6 7.6 0 1 1 0-15.2V10l6.792-3.396A7.548 7.548 0 0 1 17.6 10a7.6 7.6 0 0 1-7.6 7.599" clip-rule="evenodd" />
                        </svg>
                          <p className=" text-gray-600 text-2xl px-1 font-semibold select-none">Speed</p>
                          <p className="text-4xl pb-1 font-semibold px-1 font-mono text-yellow-400 select-none">{pokemon.base.Speed}</p>
                        </div>
                        <progress className="flex flex-row progress" value={pokemon.base.Speed} max="215"></progress>
                      </div>
                    </div>

                  {/* Special Attack */}
                    <div className="flex flex-row m-1 w-full items-center justify-center rounded-xl bg-gray-200">
                      <div className='flex flex-col py-2 mx-2 w-full'>
                        <div className='flex flex-row items-center'>
                          <div className='w-6'>
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-7">
                            <path fill-rule="evenodd" d="M14.615 1.595a.75.75 0 0 1 .359.852L12.982 9.75h7.268a.75.75 0 0 1 .548 1.262l-10.5 11.25a.75.75 0 0 1-1.272-.71l1.992-7.302H3.75a.75.75 0 0 1-.548-1.262l10.5-11.25a.75.75 0 0 1 .913-.143Z" clip-rule="evenodd" />
                          </svg>
                          </div>
                          <p className=" text-gray-600 text-md px-2 font-semibold select-none">S-Attack</p>
                          <p className="text-4xl pb-1 font-semibold px-1 font-mono text-orange-400 select-none">{pokemon.base['Sp. Attack']}</p>
                        </div>
                        <progress className="flex flex-row progress" value={pokemon.base['Sp. Attack']} max="215"></progress>
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
}

export default PokemonCard;
