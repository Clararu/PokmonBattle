import { useState, useEffect } from 'react';
import axios from 'axios';

// ! → gets the data from the express server
export function usePokemonList() {
  const [pokemonList, setPokemonList] = useState([]);

  useEffect(() => {
    const fetchPokemonList = async () => {
      try {
        const response = await axios.get('http://localhost:3000/pokemon');
        // const response = await axios.get('https://pokemonbattle-5ur0.onrender.com/pokemon');
        setPokemonList(response.data);
      } catch (error) {
        console.error('Error fetching pokemon:', error);
      }
    };

    fetchPokemonList();
  }, []);

  return pokemonList;
}

// TODO: I coudn't get it to work! Had do code everything without this function
// export async function fetchPokemonById(id) {
//   try {
//     const response = await axios.get(`http://localhost:3000/pokemon/${id}`);
//     return response.data;
//   } catch (error) {
//     console.error(`Error fetching pokemon with id ${id}:`, error);
//   }
// }
