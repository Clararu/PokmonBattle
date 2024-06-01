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
              <div>
              {imageUrl ? <img src={imageUrl} alt={pokemon.name.english} className="h-full mx-auto w-8/12 rounded-xl" /> : <p>Loading image...</p>}
              </div>
              {/* Stats */}
            <div className="card-body items-end rounded-b-md bg-gray-300">
            <div className="flex flex-col">
                <div className="flex flex-row">
                  <p className="text-6xl font-bold text-gray-700 select-none">{pokemon.name.english}&nbsp;</p>

                </div>
                <div className='flex flex-row mt-5'>
                    <div className="badge text-gray-100 text-xl p-5 bg-gray-700 select-none">{pokemon.type}&nbsp;</div>
                    <div className="badge text-gray-100 text-xl p-5 bg-gray-700 select-none">{pokemon.type}&nbsp;</div>
                  </div>
                <br/>

                <div className="flex flex-row">
                  <div className="flex flex-col items-end">
                    <div className="flex flex-row px-3 py-0.5 m-1 rounded-xl bg-gray-200">
                      <p className=" text-gray-600 text-2xl font-semibold select-none">HP&nbsp;</p>
                      <p className=" text-4xl pb-1 font-semibold font-mono text-green-400 select-none">{pokemon.base.HP}</p>
                    </div>
                    <div className="flex flex-row px-3 py-0.5 m-1 rounded-xl bg-gray-200">
                      <p className=" text-gray-600 text-2xl font-semibold select-none">DEF&nbsp;</p>
                      <p className="text-4xl pb-1 font-semibold font-mono text-blue-400 select-none">{pokemon.base.Defense}</p>
                    </div>
                    <div className="flex flex-row px-2 py-0.5 m-1 rounded-xl bg-gray-200">
                      <p className=" text-gray-600 text-2xl font-semibold select-none">S-DEF&nbsp;</p>
                      <p className=" text-4xl pb-1 font-semibold font-mono text-purple-400 select-none">{pokemon.base['Sp. Defense']}&nbsp;</p>
                    </div>
                  </div>
                  <div className="flex flex-col mx-0.5 items-end">
                    </div>
                  <div className="flex flex-col items-end">
                  <div className="flex flex-row px-3 py-0.5 m-1 rounded-xl bg-gray-200">
                      <p className="text-gray-600 text-2xl font-semibold select-none">ATK&nbsp;</p>
                      <p className="text-4xl pb-1 font-semibold font-mono text-red-400 select-none">{pokemon.base.Attack}</p>
                    </div>
                    <div className="flex flex-row px-3 py-0.5 m-1 rounded-xl bg-gray-200">
                      <p className=" text-gray-600 text-2xl font-semibold select-none">SPD&nbsp;</p>
                      <p className="text-4xl pb-1 font-semibold font-mono text-yellow-400 select-none">{pokemon.base.Speed}</p>
                    </div>
                    <div className="flex flex-row px-3 py-0.5 m-1 rounded-xl bg-gray-200">
                      <p className="text-gray-600 text-2xl font-semibold select-none">S-ATK&nbsp;</p>
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
