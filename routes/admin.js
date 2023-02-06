import express from 'express';
import {
	login,
	register,
	getAdmins,
	checkEmail,
} from '../controllers/admin.js';
const router = express.Router();
router.route('/check').post(checkEmail);
router.route('/register').post(register);
router.route('/login').post(login);

export default router;
