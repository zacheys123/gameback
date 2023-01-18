import express from 'express';
import {
	register,
	login,
	users,
	additional,
} from '../controllers/user.js';
const router = express.Router();

router.route('/register').post(register);
router.route('/additional/:id').put(additional);
router.route('/login').post(login);
router.route('/').post(users);
// router.route('/googleSignin').post(googleSignin);

// router.route('/forgotpassword').post(forgotpassword);

// router.route('/resetpassword/:resettoken').put(resetpassword);

export default router;
