
const pokemonData = import('../pokemondata.json');

exports.getAllPokemon = (req, res) => {
  res.json(pokemonData);
};


exports.getPokemonById = (req, res) => {
  const id = req.params.id;
  const pokemon = pokemonData.find(p => p.id == id);
  if (pokemon) {
    res.json(pokemon);
  } else {
    res.status(404).send('Pokemon not found');
  }
};


exports.getPokemonInfoById = (req, res) => {
  const id = req.params.id;
  const info = req.params.info;
  const pokemon = pokemonData.find(p => p.id == id);
  if (pokemon) {
    if (pokemon[info]) {
      res.json({ [info]: pokemon[info] });
    } else {
      res.status(404).send('Info not found');
    }
  } else {
    res.status(404).send('Pokemon not found');
  }
};
