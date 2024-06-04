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

  return (

    <>
    {/* <div className="border rounded-lg p-4 m-4 text-center shadow-lg transition-transform transform hover:scale-105 bg-gray-100"
       onClick={onClick}>
      <h3 className="text-lg font-semibold mb-2">{pokemon.name.english}</h3>
      {imageUrl ? <img src={imageUrl} alt={pokemon.name.english} className="w-44 h-24 mx-auto" /> : <p>Loading image...</p>}
      <p>HP: {pokemon.base.HP}</p>
      <p>Attack: {pokemon.base.Attack}</p>
      <p>Defense: {pokemon.base.Defense}</p>
      <p>Sp. Attack: {pokemon.base['Sp. Attack']}</p>
      <p>Sp. Defense: {pokemon.base['Sp. Defense']}</p>
      <p>Speed: {pokemon.base.Speed}</p>
    </div>  */}


      {/* Card 2*/}
      <div className="card bg-base-100 m-2 p-5 justify-center border-8 border-slate-900 shadow-2xl transition-transform transform hover:scale-105">
          <div className="flex flex-col">
              {/* Image */}
              <div className=''>
              {imageUrl ? <img src={imageUrl} alt={pokemon.name.english} className="h-full mx-auto w-8/12 rounded-xl" /> : <p>Loading image...</p>}
              </div>
              {/* Stats */}
            <div className="card-body items-end rounded-b-md bg-gray-300">
            <div className="flex flex-col">
                <div className="flex flex-row">
                  <p className="min-w-96 max-w-96 text-6xl font-bold text-gray-700 select-none">{pokemon.name.english}&nbsp;</p>

                </div>
                <div className='flex flex-row mt-5'>
                    <ul>
                      {Object.keys(pokemon.type).map((key) => (
                        <li className="badge text-gray-100 text-xl p-5 bg-gray-700 select-none" key={key}>{pokemon.type[key]}</li>
                      ))}
                    </ul>
                </div>
                <br/>

                {/* Stats section */}
                <div className="flex flex-row justify-center">

                  {/* Left column */}
                  <div className="flex flex-col items-center justify-end">

                    {/* Health */}
                    <div className="flex flex-row m-1 w-full items-center justify-center rounded-xl bg-gray-200">
                      <div className='flex flex-col py-2 mx-2 w-full'>
                        <div className='flex flex-row items-center'>
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
                            <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
                          </svg>
                          <p className=" text-gray-600 text-2xl px-1 font-semibold select-none">Health</p>
                          <p className="text-4xl pb-1 font-semibold px-1 font-mono text-green-400 select-none">{pokemon.base.HP}</p>
                        </div>
                        <progress className="flex flex-row progress" value={pokemon.base.HP} max="200"></progress>
                      </div>
                    </div>

                    {/* Defense */}
                    <div className="flex flex-row m-1 w-full items-center justify-center rounded-xl bg-gray-200">
                      <div className='flex flex-col py-2 mx-2 w-full'>
                        <div className='flex flex-row items-center'>
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
                            <path fill-rule="evenodd" d="M11.484 2.17a.75.75 0 0 1 1.032 0 11.209 11.209 0 0 0 7.877 3.08.75.75 0 0 1 .722.515 12.74 12.74 0 0 1 .635 3.985c0 5.942-4.064 10.933-9.563 12.348a.749.749 0 0 1-.374 0C6.314 20.683 2.25 15.692 2.25 9.75c0-1.39.223-2.73.635-3.985a.75.75 0 0 1 .722-.516l.143.001c2.996 0 5.718-1.17 7.734-3.08ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75ZM12 15a.75.75 0 0 0-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 0 0 .75-.75v-.008a.75.75 0 0 0-.75-.75H12Z" clip-rule="evenodd" />
                          </svg>
                          <p className=" text-gray-600 text-2xl px-1 font-semibold select-none">Defense</p>
                          <p className="text-4xl pb-1 font-semibold px-1 font-mono text-blue-400 select-none">{pokemon.base.Defense}</p>
                        </div>
                        <progress className="flex flex-row progress" value={pokemon.base.HP} max="200"></progress>
                      </div>
                    </div>

                    {/* Special Defense */}
                    <div className="flex flex-row m-1 w-full items-center justify-center rounded-xl bg-gray-200">
                      <div className='flex flex-col py-2 mx-2 w-full'>
                        <div className='flex flex-row items-center'>
                          <div className='w-6'>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" class="svg_dd790ee3">
                              <path d="M960 0q53 0 98 6t89 20 84 34 86 48q74 46 145 75t145 45 150 22 163 6v352q0 157-30 308t-89 292-143 266-190 233-235 194-273 147q-145-60-273-146t-234-194-191-234-142-266-89-291T0 608V256q87 0 164-6t149-22 144-45 147-76q43-27 85-47t84-33 89-20 98-7zm832 382q-152-7-286-48t-263-122q-68-43-134-63t-149-21q-82 0-149 21t-135 64q-128 80-262 121t-286 48v226q0 210 58 406t167 366 262 305 345 223q191-88 345-223t262-304 166-366 59-407V382zM960 256q62 0 110 14t101 48q115 73 236 117t257 64v109q0 182-49 354t-141 323-222 274-292 207q-162-84-292-207t-222-273-141-323-49-355V499q136-19 256-62t235-118q51-32 101-47t112-16zm96 640l128-256H960l-224 448h192l-192 384 576-576h-256z"></path>
                            </svg>
                          </div>
                          <p className=" text-gray-600 text-md px-1 font-semibold select-none">S-Defense</p>
                          <p className="text-4xl pb-1 font-semibold px-1 font-mono text-purple-400 select-none">{pokemon.base['Sp. Defense']}</p>
                        </div>
                        <progress className="flex flex-row progress" value={pokemon.base['Sp. Defense']} max="200"></progress>
                      </div>
                    </div>

                  </div>

                  {/* Column Divider */}
                  <div className="flex flex-col w-3 items-end">
                  </div>
                  
                  {/* Right Column */}
                  <div className="flex flex-col justify-end items-center">

                    {/* Attack */}
                    <div className="flex flex-row m-1 w-full items-center justify-center rounded-xl bg-gray-200">
                      <div className='flex flex-col py-2 mx-2 w-full'>
                        <div className='flex flex-row items-center'>
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
                            <path fill-rule="evenodd" d="M14.615 1.595a.75.75 0 0 1 .359.852L12.982 9.75h7.268a.75.75 0 0 1 .548 1.262l-10.5 11.25a.75.75 0 0 1-1.272-.71l1.992-7.302H3.75a.75.75 0 0 1-.548-1.262l10.5-11.25a.75.75 0 0 1 .913-.143Z" clip-rule="evenodd" />
                          </svg>
                          <p className=" text-gray-600 text-2xl px-1 font-semibold select-none">Attack</p>
                          <p className="text-4xl pb-1 font-semibold px-1 font-mono text-red-400 select-none">{pokemon.base.Attack}</p>
                        </div>
                        <progress className="flex flex-row progress" value={pokemon.base.Attack} max="200"></progress>
                      </div>
                    </div>

                    {/* Speed */}
                    <div className="flex flex-row m-1 w-full items-center justify-center rounded-xl bg-gray-200">
                      <div className='flex flex-col py-2 mx-2 w-full'>
                        <div className='flex flex-row items-center'>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
                          <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 6a.75.75 0 0 0-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 0 0 0-1.5h-3.75V6Z" clip-rule="evenodd" />
                        </svg>
                          <p className=" text-gray-600 text-2xl px-1 font-semibold select-none">Speed</p>
                          <p className="text-4xl pb-1 font-semibold px-1 font-mono text-yellow-400 select-none">{pokemon.base.Speed}</p>
                        </div>
                        <progress className="flex flex-row progress" value={pokemon.base.Speed} max="200"></progress>
                      </div>
                    </div>

                  {/* Special Attack */}
                    <div className="flex flex-row m-1 w-full items-center justify-center rounded-xl bg-gray-200">
                      <div className='flex flex-col py-2 mx-2 w-full'>
                        <div className='flex flex-row items-center'>
                          <div className='w-6'>
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
                            <path fill-rule="evenodd" d="M9 4.5a.75.75 0 0 1 .721.544l.813 2.846a3.75 3.75 0 0 0 2.576 2.576l2.846.813a.75.75 0 0 1 0 1.442l-2.846.813a3.75 3.75 0 0 0-2.576 2.576l-.813 2.846a.75.75 0 0 1-1.442 0l-.813-2.846a3.75 3.75 0 0 0-2.576-2.576l-2.846-.813a.75.75 0 0 1 0-1.442l2.846-.813A3.75 3.75 0 0 0 7.466 7.89l.813-2.846A.75.75 0 0 1 9 4.5ZM18 1.5a.75.75 0 0 1 .728.568l.258 1.036c.236.94.97 1.674 1.91 1.91l1.036.258a.75.75 0 0 1 0 1.456l-1.036.258c-.94.236-1.674.97-1.91 1.91l-.258 1.036a.75.75 0 0 1-1.456 0l-.258-1.036a2.625 2.625 0 0 0-1.91-1.91l-1.036-.258a.75.75 0 0 1 0-1.456l1.036-.258a2.625 2.625 0 0 0 1.91-1.91l.258-1.036A.75.75 0 0 1 18 1.5ZM16.5 15a.75.75 0 0 1 .712.513l.394 1.183c.15.447.5.799.948.948l1.183.395a.75.75 0 0 1 0 1.422l-1.183.395c-.447.15-.799.5-.948.948l-.395 1.183a.75.75 0 0 1-1.422 0l-.395-1.183a1.5 1.5 0 0 0-.948-.948l-1.183-.395a.75.75 0 0 1 0-1.422l1.183-.395c.447-.15.799-.5.948-.948l.395-1.183A.75.75 0 0 1 16.5 15Z" clip-rule="evenodd" />
                          </svg>
                          </div>
                          <p className=" text-gray-600 text-md px-1 font-semibold select-none">S-Attack</p>
                          <p className="text-4xl pb-1 font-semibold px-1 font-mono text-orange-400 select-none">{pokemon.base['Sp. Attack']}</p>
                        </div>
                        <progress className="flex flex-row progress" value={pokemon.base['Sp. Attack']} max="200"></progress>
                      </div>
                    </div>

                  {/* Special Attack */}
                    {/* <div className="flex flex-row m-1 w-full items-center justify-center rounded-xl bg-gray-200">
                      <div className='flex flex-col py-2 mx-2 w-full'>
                        <div className='flex flex-row items-center'>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" class="svg_dd790ee3" focusable="false">
                          <path d="M2048 1024l-384 256 96 480-480-96-256 384-256-384-480 96 96-480L0 1024l384-256-96-480 480 96L1024 0l256 384 480-96-96 480 384 256z"></path>
                        </svg>
                          <p className=" text-gray-600 text-2xl px-1 font-semibold select-none">Special Defense</p>
                          <p className="text-4xl pb-1 font-semibold px-1 font-mono text-red-400 select-none">{pokemon.base['Sp. Defense']}</p>
                        </div>
                        <progress className="flex flex-row progress" value={pokemon.base['Sp. Defense']} max="105"></progress>
                      </div>
                    </div> */}


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
