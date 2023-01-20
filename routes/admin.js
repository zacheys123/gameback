import express from 'express';
import { login, register, getUsers } from '../controllers/admin.js';
const router = express.Router();

router.route('/register').post(register);
router.route('/login').post(login);
router.route('/').get(getUsers);

export default router;
