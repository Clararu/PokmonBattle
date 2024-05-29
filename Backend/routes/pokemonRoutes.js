const express = require('express');
const router = express.Router();
const pokemonController = require('../controllers/pokemonController');

// 모든 포켓몬 데이터 반환
router.get('/', pokemonController.getAllPokemon);
// 특정 ID의 포켓몬 데이터 반환
router.get('/:id', pokemonController.getPokemonById);

// 특정 ID의 특정 정보 반환 (이름, 타입 또는 기본 스탯)
router.get('/:id/:info', pokemonController.getPokemonInfoById);

module.exports = router;
