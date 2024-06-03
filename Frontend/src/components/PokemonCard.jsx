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

                <div className="flex flex-row justify-center">
                  <div className="flex flex-col items-center justify-end">
                    <div className="flex flex-row px-3 py-0.5 m-1 w-full items-center justify-end rounded-xl bg-gray-200">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
                      <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
                    </svg>
                      <p className=" text-gray-600 text-2xl px-1 font-semibold select-none">Health</p>
                      <p className="text-4xl pb-1 font-semibold px-1 font-mono text-green-400 select-none">{pokemon.base.HP}</p>
                    </div>
                    <div className="flex flex-row px-3 py-0.5 m-1 w-full items-center rounded-xl bg-gray-200">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
                        <path fill-rule="evenodd" d="M11.484 2.17a.75.75 0 0 1 1.032 0 11.209 11.209 0 0 0 7.877 3.08.75.75 0 0 1 .722.515 12.74 12.74 0 0 1 .635 3.985c0 5.942-4.064 10.933-9.563 12.348a.749.749 0 0 1-.374 0C6.314 20.683 2.25 15.692 2.25 9.75c0-1.39.223-2.73.635-3.985a.75.75 0 0 1 .722-.516l.143.001c2.996 0 5.718-1.17 7.734-3.08ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75ZM12 15a.75.75 0 0 0-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 0 0 .75-.75v-.008a.75.75 0 0 0-.75-.75H12Z" clip-rule="evenodd" />
                      </svg>
                      <p className=" text-gray-600 text-2xl px-1 font-semibold select-none">Defense</p>
                      <p className="text-4xl pb-1 font-semibold font-mono text-blue-400 select-none">{pokemon.base.Defense}</p>
                    </div>
                    <div className="flex flex-row px-2 py-0.5 m-1 w-full items-center rounded-xl bg-gray-200">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
                      <path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clip-rule="evenodd" />
                    </svg>
                      <p className=" text-gray-600 text-xl leading-none px-2 font-semibold select-none">S-Defense</p>
                      <p className=" text-4xl pb-1 font-semibold font-mono text-purple-400 select-none">{pokemon.base['Sp. Defense']}</p>
                    </div>
                  </div>
                  <div className="flex flex-col w-3 items-end">
                    </div>
                  <div className="flex flex-col items-start justify-stretch">
                  <div className="flex flex-row px-3 py-0.5 m-1 w-full items-center rounded-xl bg-gray-200">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
                      <path fill-rule="evenodd" d="M14.615 1.595a.75.75 0 0 1 .359.852L12.982 9.75h7.268a.75.75 0 0 1 .548 1.262l-10.5 11.25a.75.75 0 0 1-1.272-.71l1.992-7.302H3.75a.75.75 0 0 1-.548-1.262l10.5-11.25a.75.75 0 0 1 .913-.143Z" clip-rule="evenodd" />
                    </svg>
                    <p className=" text-gray-600 text-2xl px-1 font-semibold select-none">Attack</p>
                      <p className="text-4xl pb-1 font-semibold font-mono text-red-400 select-none">{pokemon.base.Attack}</p>
                    </div>
                    <div className="flex flex-row px-3 py-0.5 m-1 w-full items-center rounded-xl bg-gray-200">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
                      <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 6a.75.75 0 0 0-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 0 0 0-1.5h-3.75V6Z" clip-rule="evenodd" />
                    </svg>
                    <p className=" text-gray-600 text-2xl px-1 font-semibold select-none">Speed</p>
                      <p className="text-4xl pb-1 font-semibold font-mono text-yellow-400 select-none">{pokemon.base.Speed}</p>
                    </div>
                    <div className="flex flex-row px-3 py-0.5 m-1 w-full items-center rounded-xl bg-gray-200">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
                      <path fill-rule="evenodd" d="M9 4.5a.75.75 0 0 1 .721.544l.813 2.846a3.75 3.75 0 0 0 2.576 2.576l2.846.813a.75.75 0 0 1 0 1.442l-2.846.813a3.75 3.75 0 0 0-2.576 2.576l-.813 2.846a.75.75 0 0 1-1.442 0l-.813-2.846a3.75 3.75 0 0 0-2.576-2.576l-2.846-.813a.75.75 0 0 1 0-1.442l2.846-.813A3.75 3.75 0 0 0 7.466 7.89l.813-2.846A.75.75 0 0 1 9 4.5ZM18 1.5a.75.75 0 0 1 .728.568l.258 1.036c.236.94.97 1.674 1.91 1.91l1.036.258a.75.75 0 0 1 0 1.456l-1.036.258c-.94.236-1.674.97-1.91 1.91l-.258 1.036a.75.75 0 0 1-1.456 0l-.258-1.036a2.625 2.625 0 0 0-1.91-1.91l-1.036-.258a.75.75 0 0 1 0-1.456l1.036-.258a2.625 2.625 0 0 0 1.91-1.91l.258-1.036A.75.75 0 0 1 18 1.5ZM16.5 15a.75.75 0 0 1 .712.513l.394 1.183c.15.447.5.799.948.948l1.183.395a.75.75 0 0 1 0 1.422l-1.183.395c-.447.15-.799.5-.948.948l-.395 1.183a.75.75 0 0 1-1.422 0l-.395-1.183a1.5 1.5 0 0 0-.948-.948l-1.183-.395a.75.75 0 0 1 0-1.422l1.183-.395c.447-.15.799-.5.948-.948l.395-1.183A.75.75 0 0 1 16.5 15Z" clip-rule="evenodd" />
                    </svg>
                    <p className=" text-gray-600 text-xl leading-none px-2 font-semibold select-none">S-Attack</p>
                      <p className=" text-4xl pb-1 font-semibold font-mono text-orange-400 select-none">{pokemon.base['Sp. Attack']}</p>
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
