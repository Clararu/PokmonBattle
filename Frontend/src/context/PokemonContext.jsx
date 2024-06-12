import { createContext, useState, useEffect } from 'react';

export const PokemonContext = createContext();

// Provider component
export const PokemonProvider = ({ children }) => {
  const [playerPokemonId, setPlayerPokemonId] = useState(null);
  const [opponentPokemonId, setOpponentPokemonId] = useState(null);
  const [username, setUsername] = useState('Trainer');
  const [pokemonData, setPokemonData] = useState([]);

  const [pokemonDataLength, setPokemonDataLength] = useState(0);

  // once pokemonData is set, update the length
  useEffect(() => {
    setPokemonDataLength(pokemonData.length);
  }, [pokemonData]);

  return (
    <PokemonContext.Provider
      value={{
        playerPokemonId,
        setPlayerPokemonId,
        opponentPokemonId,
        setOpponentPokemonId,
        username,
        setUsername,
        pokemonData,
        setPokemonData,
        pokemonDataLength,
      }}>
      {children}
    </PokemonContext.Provider>
  );
};
