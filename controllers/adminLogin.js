import User from '../models/user.js';
import jwt from 'jsonwebtoken';
export const adminLogin = async (req, res) => {
	const { username, secret, secret_question } = req.body;
	console.log(req.body);
	try {
		if (username && secret && secret_question) {
			const result = await User.findOne({
				username,
				secret,
				secret_question,
			});

			if (username !== result?.username) {
				res.status(404).json({
					message: 'Sorry,Username does not match our database',
				});
			} else if (secret !== result?.secret) {
				res.status(404).json({
					message: 'Sorry,secret does not match our database',
				});
			} else if (secret_question !== result?.secret_question) {
				res.status(404).json({
					message: 'Sorry,secret query does not match our database',
				});
			} else {
				return jwt.sign(
					{ username: result.username, id: result._id },
					process.env.JWT_SECRET,
					{ expiresIn: process.env.JWT_EXPIRE },
					(err, token) => {
						res.status(200).json({
							success: true,
							message: `Welcome ${username}`,
							result,
							token,
						});
					},
				);
			}
		} else {
			return res.status(400).json({
				success: false,
				message: 'All fields Should be Entered',
			});
		}
	} catch (error) {
		console.log(error.message);
	}
};
