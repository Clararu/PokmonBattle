import { useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { PokemonContext } from '../context/PokemonContext';
import PokemonCard from '../components/PokemonCard';
import 'daisyui/dist/full.css';

function Pokedex() {
  const { pokemonData, setPlayerPokemonId, setOpponentPokemonId } = useContext(PokemonContext);
  const navigate = useNavigate();
  const { player } = useParams();

  const handleCardClick = (id) => {
    if (player === 'myPokemon') {
      setPlayerPokemonId(id);
    } else if (player === 'opponent') {
      setOpponentPokemonId(id);
    }
    navigate('/arena');
  };

  // TODO:  // Fetch pokemonData here if it's not already fetched via fetchPokemonList() from Frontend/src/components/GetPokemonData.jsx
  // useEffect(() => {
  // }, []);

  return (
    <div className="xl:grid-cols-auto-fill grid h-screen w-screen grid-cols-1 gap-4 overflow-auto sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {pokemonData.map((pokemon) => (
        <div key={pokemon.id} className="cursor-pointer">
          <PokemonCard pokemonId={pokemon.id} onClick={() => handleCardClick(pokemon.id)} />
        </div>
      ))}
    </div>
  );
}

export default Pokedex;
