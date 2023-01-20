import User from '../models/user.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
export const register = async (req, res) => {
	const {
		firstname,
		lastname,
		email,
		company,
		phone,
		password,
		confirmpassword,
	} = req.body;

	if (!email || !password)
		return res.status(400).json({
			success: false,
			message: 'Password and email are required',
		});

	if (password.length < 6) {
		return res.status(400).json({
			success: false,
			message: 'Password should be at least 6 characters long',
		});
	}
	if (password !== confirmpassword) {
		return res.status(400).json({
			success: false,
			message: 'Both Passwords should match',
		});
	}

	const user1 = await User.findOne({ company }); //
	const user = await User.findOne({ email });
	//  finding user in db
	if (user)
		return res.status(400).json({
			message: 'Email/username already in use',
		});
	if (user1)
		return res.status(400).json({
			message: 'Company name already Exist',
		});

	const newUser = new User({
		username: `${firstname}${lastname}`,
		email,
		company,
		phone,
		password,
	});
	// hashing the password

	const savedUser = await newUser.save();

	if (savedUser) {
		const token = jwt.sign(
			{ email: savedUser.username, id: savedUser._id },
			process.env.JWT_SECRET,
			{ expiresIn: process.env.JWT_EXPIRE },
		);
		// const {
		// 	password,
		// 	movies,
		// 	latest,
		// 	suggested,
		// 	users,
		// 	upddatedAt,
		// 	createdAt,
		// 	...rest
		// } = savedUser._doc;
		return res.status(200).json({
			message: 'Successfully registered',
			result: savedUser,
			token,
		});
	}
};
export const login = async (req, res) => {
	const { email, password } = req.body;

	try {
		const result = await User.findOne({ email: email });

		if (!result) {
			res.status(404).json({ message: 'User Not Found' });
		}
		let matchpass = await bcrypt.compare(password, result.password);
		if (matchpass) {
			return jwt.sign(
				{ username: result.username, id: result._id },
				process.env.JWT_SECRET,
				{ expiresIn: process.env.JWT_EXPIRE },
				(err, token) => {
					res.status(200).json({
						success: true,
						message: 'You have logged in successfully',
						result,
						token,
					});
				},
			);
		} else {
			return res
				.status(400)
				.json({ success: false, message: 'Invalid password' });
		}
	} catch (error) {
		console.log(error.message);
	}
};
export const getUsers = async () => {};
