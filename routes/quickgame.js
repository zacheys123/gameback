import express from 'express';

import { createGame, getGame } from '../controllers/quickgame.js';
const router = express.Router();
router.route('/quickmatch/:id').put(createGame);
router.route('/:id').get(getGame);

export default router;
