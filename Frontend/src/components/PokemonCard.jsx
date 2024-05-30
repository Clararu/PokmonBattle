import { useEffect, useState } from 'react';
import axios from 'axios';

function PokemonCard({ pokemon }) {
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
    {/* <div className="border rounded-lg p-4 m-4 text-center shadow-lg transition-transform transform hover:scale-105 bg-gray-100">
      <h3 className="text-lg font-semibold mb-2">{pokemon.name.english}</h3>
      {imageUrl ? <img src={imageUrl} alt={pokemon.name.english} className="w-44 h-24 mx-auto" /> : <p>Loading image...</p>}
      <p>HP: {pokemon.base.HP}</p>
      <p>Attack: {pokemon.base.Attack}</p>
      <p>Defense: {pokemon.base.Defense}</p>
      <p>Sp. Attack: {pokemon.base['Sp. Attack']}</p>
      <p>Sp. Defense: {pokemon.base['Sp. Defense']}</p>
      <p>Speed: {pokemon.base.Speed}</p>
    </div> */}
    {/* PokemonCard */}
    <div className="card bg-base-100 m-5 p-10 justify-center border-6 border-slate-600 shadow-2xl transition-transform transform hover:scale-105">
      {/* Card container */}
      <div className="flex flex-col">

        {/* Image */}
        <div className='flex justify-center bg-slate-300'>
          {imageUrl ? <img src={imageUrl} alt={pokemon.name.english} className="h-full mx-auto w-8/12 bg-slate-300 rounded-xl" /> : <p>Loading image...</p>}
        </div>
        <br/>


        {/* Card layout*/}
        
        <div className="card-body pt-0">
        <div className="flex flex-row justify-evenly">
          <div>

            <p className="card-title text-4xl">{pokemon.name.english}</p>
              </div>
            <br/>
              <div className="badge text-white text-xl p-5 bg-gray-800">=<ul><li>{pokemon.type}</li></ul></div>
            <br/>
        </div>

        

          <div className="flex flex-col items-start">
            <br/>


            <div className="flex flex-row justify-between">
              <div className="flex flex-col items-end">

                {/* Attack */}
                <div className="flex flex-row items-baseline">
                {/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-10 text-red-400">
  <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0 1 12 21 8.25 8.25 0 0 1 6.038 7.047 8.287 8.287 0 0 0 9 9.601a8.983 8.983 0 0 1 3.361-6.867 8.21 8.21 0 0 0 3 2.48Z" />
  <path strokeLinecap="round" strokeLinejoin="round" d="M12 18a3.75 3.75 0 0 0 .495-7.468 5.99 5.99 0 0 0-1.925 3.547 5.975 5.975 0 0 1-2.133-1.001A3.75 3.75 0 0 0 12 18Z" />
</svg> */}

                  <p className=" text-gray-600 text-xl font-semibold">{'Attack'}&nbsp;</p>
                  <p className=" text-4xl font-semibold font-mono  text-red-400">{pokemon.base.Attack}&nbsp;</p>
                </div>

               {/* Speed */}
              <div className="flex flex-row items-baseline">
                {/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-10 text-yellow-400">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg> */}
                <p className=" text-gray-600 text-xl font-semibold">{'Speed'}&nbsp;</p>
                <p className="text-4xl pb-1 font-semibold font-mono  text-yellow-400">{pokemon.base.Speed}&nbsp;</p>
              </div>

                {/* Special-Attack */}
                <div className="flex flex-row items-baseline">
                {/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-10 text-orange-400">
  <path strokeLinecap="round" strokeLinejoin="round" d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z" />
</svg> */}
                  <p className=" text-gray-600 text-xl font-semibold">{'Special Attack'}&nbsp;</p>
                  <p className="text-4xl pb-1 font-semibold font-mono  text-orange-400">{pokemon.base['Sp. Attack']}&nbsp;</p>
                </div>

              </div>

              <div className="flex flex-col items-end">
                {/* HP */}
                <div className="flex flex-row items-baseline">
                {/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-10 text-green-400">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                </svg> */}

                  <p className=" text-gray-600 text-xl font-semibold">{'HP'}&nbsp;</p>
                  <p className="text-4xl font-semibold font-mono text-green-400">{pokemon.base.HP}&nbsp;</p>
                </div>

                {/* Defense */}
                <div className="flex flex-row items-baseline">
                {/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-10 text-blue-400"> 
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
                </svg> */}

                  <p className=" text-gray-600 text-xl font-semibold">{'Defense'}&nbsp;</p>
                  <p className=" text-4xl pb-1 font-semibold font-mono text-blue-400">{pokemon.base.Defense}&nbsp;</p>
                </div>

                {/* Special Defense */}
              <div className="flex flex-row items-baseline">
              {/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-10 text-purple-400">
  <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
</svg> */}

                  <p className=" text-gray-600 text-xl font-semibold">{'Special Defence'}&nbsp;</p>
                  <p className="text-4xl pb-1 font-semibold font-mono  text-purple-400">{pokemon.base['Sp. Defense']}&nbsp;</p>
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
