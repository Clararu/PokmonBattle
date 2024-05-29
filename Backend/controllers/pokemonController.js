// controllers/pokemonController.js

const pokemonData = require('../../pokemondata.json');

// 모든 포켓몬 데이터 반환
exports.getAllPokemon = (req, res) => {
  res.json(pokemonData);
};

// 특정 ID의 포켓몬 데이터 반환
exports.getPokemonById = (req, res) => {
  const id = req.params.id;
  const pokemon = pokemonData.find(p => p.id == id);
  if (pokemon) {
    res.json(pokemon);
  } else {
    res.status(404).send('Pokemon not found');
  }
};

// 특정 ID의 특정 정보 반환 (이름, 타입 또는 기본 스탯)
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
