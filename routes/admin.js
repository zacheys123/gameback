import express from 'express';
import { login, register, getAdmins } from '../controllers/admin.js';
const router = express.Router();

router.route('/register').post(register);
router.route('/login').post(login);
router.route('/').get(getAdmins);

export default router;
