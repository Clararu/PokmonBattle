import express from 'express';
import pokemonController from '../controllers/pokemonController.js';

const router = express.Router();

router.get('/', pokemonController.getAllPokemon);
router.get('/:id', pokemonController.getPokemonById);
router.get('/:id/:info', pokemonController.getPokemonInfoById);

export default router;
