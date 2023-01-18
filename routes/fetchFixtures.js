import express from 'express';

import { fetchFixtures } from '../controllers/fetch_fixtures.js';
const router = express.Router();
router
	.route('/fixtures/:year(\\d{4})-:month(\\d{2})-:day(\\d{2})')
	.get(fetchFixtures);
export default router;
