import { useContext, useEffect, useState } from 'react';
import { useCallback } from 'react';
import { PokemonContext } from '../context/PokemonContext';
import PokemonCard from '../components/PokemonCard';

import { GetPokemonBackGIF, GetPokemonFrontGIF } from '../components/GetPokemonImages.jsx';
import { useNavigate } from 'react-router-dom';

import AshKetchum from '../assets/images/Ash_Ketchum.png';
import Stadium from '../assets/images/stadium1.png';

function Arena() {
  const { username, setOpponentPokemonId, pokemonDataLength, opponentPokemonId, setPlayerPokemonId, playerPokemonId } =
    useContext(PokemonContext);
  const [backGif, setBackGif] = useState('');
  const [frontGif, setFrontGif] = useState('');
  const navigate = useNavigate();

  const generateRandomPokemonId = useCallback(
    () => Math.floor(Math.random() * pokemonDataLength) + 1,
    [pokemonDataLength],
  );

  useEffect(() => {
    const fetchImages = async () => {
      if (playerPokemonId && opponentPokemonId) {
        // only load, once the Context is done.
        const backGifUrl = await GetPokemonBackGIF(playerPokemonId);
        const frontGifUrl = await GetPokemonFrontGIF(opponentPokemonId);
        setBackGif(backGifUrl);
        setFrontGif(frontGifUrl);
      }
    };
    fetchImages();
  }, [opponentPokemonId, playerPokemonId]);

  // check if playerPokemonId or opponentPokemonId is null, and only then generate random number
  useEffect(() => {
    if (opponentPokemonId === null) {
      setOpponentPokemonId(generateRandomPokemonId()); // Save the randomNumber as opponentPokemonId
    }
  }, [pokemonDataLength, setOpponentPokemonId, generateRandomPokemonId, opponentPokemonId]);

  useEffect(() => {
    if (playerPokemonId === null) {
      setPlayerPokemonId(generateRandomPokemonId()); // Save the randomNumber as playerPokemonId
    }
  }, [pokemonDataLength, setPlayerPokemonId, generateRandomPokemonId, playerPokemonId]);

  const handleRandomPlayerPokemon = () => {
    setPlayerPokemonId(generateRandomPokemonId());
  };

  const handleRandomOpponentPokemon = () => {
    setOpponentPokemonId(generateRandomPokemonId());
  };

  return (
    <>
      <div className="mt-10 flex flex-row justify-between bg-red-400">
        {/* PokeBall */}
        <div className="w-96 -rotate-12 scale-100 transform cursor-pointer transition-transform hover:scale-105">
          <img
            className=""
            onClick={() => document.getElementById('my_modal_5').showModal()}
            src="./src/assets/icons/PokeBall.png"
          />
        </div>
      </div>
      {/* Grid */}
      <div
        className="fixed inset-0 grid grid-cols-3 grid-rows-3 items-center gap-4 bg-cover bg-center"
        style={{ backgroundImage: `url(${Stadium})` }}>
        <div className="flex size-40 flex-row justify-start"></div>

        {/* Welcome Player's name box */}
        <div className="absolute top-0 col-span-2 col-start-2 mx-32 w-64 rounded bg-white bg-opacity-30 p-6 px-10 backdrop-blur-md">
          <h1 className="text-center text-3xl font-bold text-black">
            Welcome <br /> {username}
          </h1>
        </div>
        {/* Body */}
        <div className="col-span-1 col-start-1 flex flex-col items-center">
          {/* Player's UI */}
          <div className="row flex space-x-4">
            <button onClick={() => navigate('/pokedex/myPokemon')} className="btn btn-primary">
              Choose different Pokémon
            </button>

            <button onClick={handleRandomPlayerPokemon} className="btn btn-secondary">
              Other random Pokémon
            </button>
          </div>
          <div className="scale-75 transform">{playerPokemonId && <PokemonCard pokemonId={playerPokemonId} />}</div>
        </div>

        {/* Opponent's UI */}
        <div className="flex flex-col items-center">
          <div className="row flex space-x-4">
            <button onClick={() => navigate('/pokedex/opponent')} className="btn btn-primary">
              Choose different opponent
            </button>

            <button onClick={handleRandomOpponentPokemon} className="btn btn-secondary">
              Other random opponent
            </button>
          </div>
          <div className="scale-75 transform">{opponentPokemonId && <PokemonCard pokemonId={opponentPokemonId} />}</div>
        </div>

        {/* Pokemon battle ground */}
        <div className="col-span-1 col-start-2 row-span-1 row-start-2 grid grid-cols-2 grid-rows-2 items-center justify-items-center">
          {/* Player's Pokemon backview */}
          <img
            src={backGif}
            alt="Pokemon back"
            className="col-span-1 col-start-1 row-span-1 row-start-2 mr-24 h-36 w-auto"
          />
          {/* Opponent Pokemon backview */}
          <img
            src={frontGif}
            alt="Pokemon front"
            className="col-span-1 col-start-2 row-span-1 row-start-1 ml-24 h-24 w-auto"
          />
        </div>
        {/* Fight Button */}
        <button className="btn btn-primary absolute bottom-[12%] left-[50%] -translate-x-[50%] transform whitespace-nowrap border-4 border-black bg-red-500 px-16 py-8 font-pixel text-4xl text-white shadow-lg">
          <div className="flex h-full w-full items-center justify-center">Fight!</div>
        </button>
      </div>
      {/* Ash Ketchum backview */}
      <img src={AshKetchum} alt="Ash Ketchum" className="absolute bottom-0 left-[20%] h-96 w-96" />
    </>
  );
}

export default Arena;
