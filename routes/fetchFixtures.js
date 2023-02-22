import express from 'express';

import { fetchFixtures } from '../controllers/fetch_fixtures.js';
const router = express.Router();
router.route('/fixtures').get(fetchFixtures);
export default router;
