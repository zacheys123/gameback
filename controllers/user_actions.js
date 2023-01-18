import User from '../models/user.js';
import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';

export const update_user = async (req, res) => {
	let { userId, ...alldata } = req;

	let passw = alldata?.prevData?.current.password;

	if (userId === req.params.id || req.body.isAdmin) {
		if (passw) {
			try {
				const salt = await bcrypt.genSalt(10);
				passw = await bcrypt.hash(passw, salt);
			} catch (err) {
				return res.status(500).json(err);
			}
		}

		try {
			const user = await User.updateOne(
				{ _id: userId },

				{
					$set: {
						username: alldata?.prevData?.current.username,
						email: alldata?.prevData?.current.email,
						bsname: alldata?.prevData?.current.bsname,
						marital: alldata?.prevData?.current.marital,
						occupation: alldata?.prevData?.current.occupation,
						city: alldata?.prevData?.current.city,
						password: passw,
					},
				},
			);
			return res
				.status(200)
				.json({ message: 'Account is Updated', result: user });
		} catch (error) {
			console.log(error);
			res.status(500).json(error);
		}
	} else {
		return res.status(403).json('Update your Account Only');
	}
};

export const delete_user = async (req, res) => {
	let { userId, ...alldata } = req.body;

	try {
		await User.findOneAndDelete({ _id: userId });
		res.status(200).json('User Deleted');
	} catch (error) {
		res.status(200).json({ message: error.stack });
	}
};

export const get_user = async (req, res) => {
	const { userId } = req.body;
	console.log(userId);
	const user = await User.findById(req.params.id);
	res.status(200).json(user);
};

export const update_plan = async (req, res, next) => {
	const { userId, free } = req.body;
	console.log(userId);
	try {
		const user = await User.updateOne(
			{ _id: userId },

			{
				$set: {
					package: free,
				},
			},
		);
		res.status(200).json('Successfully Chose A package');
	} catch (error) {
		res.status(500).json(error);
	}
};
