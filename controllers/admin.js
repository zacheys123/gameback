import User from '../models/user.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { sendEmail } from '../utils/sendEmail.js';
export const checkEmail = async (req, res) => {
	const newemail = req.body.email;
	const username = req.body.username;
	console.log(req.body);
	const user = await User.findOne({ email: newemail });
	const user1 = await User.findOne({ username });
	//  finding user in db
	if (user)
		return res.status(400).json({
			success: false,
			message: 'Email is  already in use',
		});
	else if (user1) {
		return res.status(400).json({
			success: false,
			message: 'Username is  already in use',
		});
	} else {
		return res.status(200).json({
			success: true,
			message: 'Valid Email',
		});
	}
};

export const register = async (req, res) => {
	const {
		firstname,
		lastname,
		company,
		company_type,
		phone1,
		state,
		phone,
		email,
		password,
		confirmpassword,
		username,
	} = req.body;

	if (password.length < 8) {
		return res.status(400).json({
			success: false,
			message: 'Password should be at least 8 characters long',
		});
	}
	if (password !== confirmpassword) {
		return res.status(400).json({
			success: false,
			message: 'Both Passwords should match',
		});
	}

	const newUser = new User({
		firstname,
		lastname,
		company,
		company_type,
		phone1,
		state,
		phone,
		email,
		password,
		secret,
		username,
	});
	// hashing the password

	const savedAdmin = await newUser.save();

	if (savedAdmin) {
		const token = jwt.sign(
			{ email: savedAdmin.username, id: savedAdmin._id },
			process.env.JWT_SECRET,
			{ expiresIn: process.env.JWT_EXPIRE },
		);
		const send_to = email;
		const send_from = process.env.EMAIL;
		const subject = 'Welcome to GameHubz';
		const message = `
		<h2>Hello there ${firstname}</h2>
		<br />
		<p>Welcome to the most popular and used Gamin platform for  managing and accounting your game data.</p>
		<p>By getting this confirmation email it shows you have registered successfully.</p><span>On the website you're already navigated to the package page,Choose A package That suits you better Free,Amateur,World(recomended),Premium(recomended),and you will be able to access Gamehubz.</span>
<p>We are happy to welcome you to our family,enjoy everything about gamehubz.
You will be sent reminders and notifications of any updates or promotions.</p>
<h5>Regards from:</h5>
<h6>Zacharia Muigai,<span style={{color:'red',fontWeight:'bold',fontSize:'.9rem}}>Head of Technology</span></h6>
		`;
		await sendEmail(subject, send_to, send_from, message);
		console.log('Email Sent');
		return res.status(200).json({
			message: 'Successfully registered',
			result: savedAdmin,
			token,
		});
	}
};
export const login = async (req, res) => {
	const { email, password } = req.body;
	console.log(req.body);
	try {
		if (email && password) {
			const result = await User.findOne({ email: email });

			if (!result) {
				res.status(404).json({ message: 'User Not Found' });
			}
			let matchpass = await bcrypt.compare(password, result.password);
			if (matchpass) {
				const send_to = email;
				const send_from = process.env.EMAIL;
				const subject = 'GameHubz Cloud';
				const message = `
		<h2>Successful sign-in ${email}</h2>
		<br />
		<h3 style={{color:'cyan',fontWeight:'bold'}}>GameHubz Co</h3>
<p>This email is to verify that you have logged in for ${email}</p>
<p>Date:${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}</p>
<p>If you're aware of this sign-in,you can continue to access and use gamehubz </p>
<h5>Regards from:</h5>
<h6>Zacharia Muigai,<span style={{color:'red',fontWeight:'bold',fontSize:'.9rem}}>Head of Technology</span></h6>
		`;
				await sendEmail(subject, send_to, send_from, message);
				console.log('Email Sent');
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
export const getAdmins = async () => {};
