import React, { useEffect, useState } from 'react';
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
    <div className="border rounded-lg p-4 m-4 text-center shadow-lg transition-transform transform hover:scale-105 bg-gray-100">
      <h3 className="text-lg font-semibold mb-2">{pokemon.name.english}</h3>
      {imageUrl ? <img src={imageUrl} alt={pokemon.name.english} className="w-44 h-24 mx-auto" /> : <p>Loading image...</p>}
      <p>HP: {pokemon.base.HP}</p>
      <p>Attack: {pokemon.base.Attack}</p>
      <p>Defense: {pokemon.base.Defense}</p>
      <p>Sp. Attack: {pokemon.base['Sp. Attack']}</p>
      <p>Sp. Defense: {pokemon.base['Sp. Defense']}</p>
      <p>Speed: {pokemon.base.Speed}</p>
    </div>
  );
}

export default PokemonCard;

