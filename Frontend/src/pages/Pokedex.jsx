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
<div className="">

    {/* Pokemon Output in Flexbox*/}
    {/* <div className="flex flex-wrap">
      {pokemonData.map((pokemon) => (
        // size values to change card size: size-1/5 size-3/12 size-min
        <div key={pokemon.id} className="cursor-pointer size-1/5 ">
          <PokemonCard className="scale-75" pokemonId={pokemon.id} onClick={() => handleCardClick(pokemon.id)} />
        </div>
      ))}
      </div>
    </div> */}

    {/* Pokemon Output in Grid */}
    <div className="grid gap-1 overflow-auto xl:grid-cols-5 sm:grid-cols-4 md:grid-cols-3 lg:grid-cols-4">
      {pokemonData.map((pokemon) => (
        <div key={pokemon.id} className="scale-100 cursor-pointer">
          <PokemonCard pokemonId={pokemon.id} onClick={() => handleCardClick(pokemon.id)} />
        </div>
      ))}
    </div>

    </div>
    </>
  );
}

export default Pokedex;
