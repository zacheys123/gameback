import express from 'express';

import {
	createGame,
	getGame,
	createTournament,
} from '../controllers/quickgame.js';
const router = express.Router();
router.route('/quickmatch/:id').put(createGame);
router.route('/tournament/:id').put(createTournament);
router.route('/:id').get(getGame);

export default router;
