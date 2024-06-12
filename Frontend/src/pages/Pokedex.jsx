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

<>
<div className="flex flex-row min-w-full">

    {/* Pokemon Output */}
    <div className="flex flex-wrap justify-start">
      {pokemonData.map((pokemon) => (
        <div key={pokemon.id} className="cursor-pointer">
          <PokemonCard className="scale-50" pokemonId={pokemon.id} onClick={() => handleCardClick(pokemon.id)} />
        </div>
        
      ))}
      </div>
    </div>

    </>
  );
}

export default Pokedex;
