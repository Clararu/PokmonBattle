import { useContext, useEffect, useState } from 'react';
import { PokemonContext } from '../context/PokemonContext';
import PokemonCard from '../components/PokemonCard';
import AshKetchum from '../assets/images/Ash_Ketchum.png';
import { GetPokemonBackGIF, GetPokemonFrontGIF } from '../components/GetPokemonImages.jsx';

function Arena() {
  const { username, setOpponentPokemonId, pokemonDataLength, opponentPokemonId } = useContext(PokemonContext);
  const [backGif, setBackGif] = useState('');
  const [frontGif, setFrontGif] = useState('');

  useEffect(() => {
    const newRandomNumber = Math.floor(Math.random() * pokemonDataLength) + 1;
    setOpponentPokemonId(newRandomNumber); // Save the randomNumber as opponentPokemonId
  }, [pokemonDataLength, setOpponentPokemonId]);

  useEffect(() => {
    const fetchImages = async () => {
      const backGifUrl = await GetPokemonBackGIF(opponentPokemonId);
      const frontGifUrl = await GetPokemonFrontGIF(opponentPokemonId);
      setBackGif(backGifUrl);
      setFrontGif(frontGifUrl);
    };

    fetchImages();
  }, [opponentPokemonId]);

  return (
    <div
      className="fixed inset-0 grid grid-cols-3 grid-rows-3 items-center justify-items-center gap-4 bg-cover bg-center pt-5"
      style={{ backgroundImage: "url('/src/assets/images/stadium1.png')" }}>
      <img src={AshKetchum} alt="Ash Ketchum" className="absolute bottom-0 left-[20%] h-96 w-96" />
      <div className="absolute top-0 col-span-1 col-start-2 mt-5 w-64 rounded bg-white bg-opacity-30 p-6 backdrop-blur-md">
        <h1 className="text-3xl font-bold text-black">Welcome {username}</h1>
      </div>
      <div className="col-span-1 col-start-1 row-start-2 flex flex-col items-center">
        <div className="flex space-x-4">
          <button className="btn btn-primary">Choose different Pokémon</button>
          <button className="btn btn-secondary">Other random Pokémon</button>
        </div>
        {opponentPokemonId && <PokemonCard pokemonId={opponentPokemonId} />}
      </div>
      <div className="col-span-1 col-start-3 row-start-2 flex flex-col items-center">
        <div className="flex space-x-4">
          <button className="btn btn-primary">Choose different opponent</button>
          <button className="btn btn-secondary">Other random opponent</button>
        </div>
        {opponentPokemonId && <PokemonCard pokemonId={opponentPokemonId} />}
      </div>
      <div className="col-span-1 col-start-2 row-span-1 row-start-2 grid grid-cols-2 grid-rows-2 items-center justify-items-center">
        <img
          src={backGif}
          alt="Pokemon back"
          className="col-span-1 col-start-1 row-span-1 row-start-2 mr-24 h-32 w-32"
        />
        <img
          src={frontGif}
          alt="Pokemon front"
          className="col-span-1 col-start-2 row-span-1 row-start-1 ml-24 h-24 w-24"
        />
      </div>
    </div>
  );
}

export default Arena;
