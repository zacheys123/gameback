import express from 'express';
import {
	update_user,
	delete_user,
	get_user,
	update_plan,
	update_pass,
} from '../controllers/user_actions.js';
import multer from 'multer';
const upload = multer({ dest: 'uploads/' });
const router = express.Router();
// router.put('/:id', upload.single('image'), update_user);
router.route('/update/:id').put(update_user);
router.route('/package/:id').put(update_plan);
router.route('/update_auth/:id').put(update_pass);
router.route('/deleteuser').post(delete_user);
router.route('/:id').get(get_user);

export default router;
