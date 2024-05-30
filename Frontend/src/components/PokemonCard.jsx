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
    <div className="m-4 transform rounded-lg border bg-gray-100 p-4 text-center shadow-lg transition-transform hover:scale-105">
      <h3 className="mb-2 text-lg font-semibold">{pokemon.name.english}</h3>
      {imageUrl ? (
        <img src={imageUrl} alt={pokemon.name.english} className="mx-auto h-24 w-44" />
      ) : (
        <p>Loading image...</p>
      )}
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
