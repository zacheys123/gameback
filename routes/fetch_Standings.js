import express from 'express';

import { fetchStandings } from '../controllers/fetch_Standings.js';
const router = express.Router();
router.route('/standings').get(fetchStandings);
export default router;
