import { PokemonContext } from '../context/PokemonContext';
import { useForm } from 'react-hook-form';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import PokeballIcon from '../assets/icons/Poké_Ball_icon.svg';

import { usePokemonList } from '../components/GetPokemonData';

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { setUsername, username, pokemonData, setPokemonData } = useContext(PokemonContext); // get setUsername, username, pokemonData, setPokemonData from context
  const navigate = useNavigate();
  const fetchPokemonList = usePokemonList(); // usePokemonList hook
  const [loading, setLoading] = useState(false); // loading state

  const onSubmit = async (data) => {
    setUsername(data.username); // set username in context

    if (!pokemonData.length) {
      setLoading(true); // set loading to true
      setPokemonData(fetchPokemonList); // directly use the pokemonList
    }

    setLoading(true); // set loading to true before navigation
    setTimeout(() => {
      setLoading(false); // stop loading after 2 seconds
      navigate('/arena'); // navigate to /arena after 2 seconds
    }, 1200);
  };

  return (
    <div
      className="fixed inset-0 flex flex-col items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: "url('/src/assets/images/wallpaper2.jpg')" }}>
      <form onSubmit={handleSubmit(onSubmit)} className="w-80 rounded bg-white bg-opacity-30 p-10 backdrop-blur-md">
        <h2 className="mb-6 text-2xl font-bold text-gray-900">
          Welcome <br />
          {username ? username : 'Trainer'}!
        </h2>
        <div className="mb-4">
          <input
            className={`input input-bordered mt-1 placeholder-gray-500 placeholder-opacity-50 ${errors.username && 'animate-shake'}`}
            {...register('username', { required: true })}
            placeholder={errors.username ? 'Name is required' : 'Enter your name'}
            autoComplete="username"
          />
        </div>
        <button type="submit" className="btn btn-primary w-full">
          Enter Arena
        </button>
      </form>
      {loading && (
        <div className="absolute bottom-80 flex items-center justify-center pb-20">
          <img src={PokeballIcon} alt="Loading" className="h-24 w-24 animate-spin" />
        </div>
      )}
    </div>
  );
}
