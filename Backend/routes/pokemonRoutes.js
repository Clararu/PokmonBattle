const express = import('express');
const router = express.Router();
const pokemonController = require('../controllers/pokemonController');


router.get('/', pokemonController.getAllPokemon);

router.get('/:id', pokemonController.getPokemonById);


router.get('/:id/:info', pokemonController.getPokemonInfoById);

module.exports = router;
