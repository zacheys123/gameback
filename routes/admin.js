import express from 'express';
import {
	login,
	register,
	getAdmins,
	checkEmail,
} from '../controllers/admin.js';
import { adminLogin } from '../controllers/adminLogin.js';
const router = express.Router();
router.route('/check').post(checkEmail);
router.route('/register').post(register);
router.route('/login').post(login);
router.route('/adminlogin').post(adminLogin);

export default router;
