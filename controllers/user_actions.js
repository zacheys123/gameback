import User from '../models/user.js';
import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';

export const update_user = async (req, res) => {
	let { userId, ...alldata } = req.body;

	if (userId === req.params.id || req.body.isAdmin) {
		try {
			const user = await User.updateOne(
				{ _id: userId },

				{
					$set: {
						username: alldata?.form?.prevData?.current.username,
						email: alldata?.form?.prevData?.current.email,
						company: alldata?.form?.prevData?.current.company,
						company_type: alldata?.form?.prevData?.current.type,
						state: alldata?.form?.prevData?.current.state,
						phone: alldata?.form?.prevData?.current.phone,
						phone1: alldata?.form?.prevData?.current.phone1,
						marital: alldata?.form?.prevData?.current.marital,
						occupation: alldata?.form?.prevData?.current.occupation,
						city: alldata?.form?.prevData?.current.city,
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
	console.log(req.body);
	try {
		const user = await User.updateOne(
			{ _id: userId },

			{
				$set: {
					package: free,
				},
			},
		);
		res.status(200).json({
			message: 'Successfully Chose A package',
			result: user,
		});
	} catch (error) {
		res.status(500).json(error);
	}
};
export const update_pass = async (req, res) => {
	let { userId, ...alldata } = req.body;

	let passw = alldata?.prevAuth?.current.password;

	if (userId === req.params.id || req.body.isAdmin) {
		if (passw) {
			try {
				const salt = await bcrypt.genSalt(10);
				passw = await bcrypt.hash(passw, salt);
			} catch (err) {
				return res.status(500).json(err);
			}
		}
		console.log(alldata.prevAuth.current);
		try {
			if (
				alldata?.prevAuth?.current.password &&
				alldata?.prevAuth?.current.confirmpassword
			) {
				if (
					alldata?.prevAuth?.current.password ===
					alldata?.prevAuth?.current.confirmpassword
				) {
					if (
						alldata?.prevAuth?.current.password.length > 6 &&
						alldata?.prevAuth?.current.confirmpassword.length > 6
					) {
						const user = await Admin.updateOne(
							{ _id: userId },

							{
								$set: {
									password: passw,
								},
							},
						);
						return res.status(200).json({
							message: 'Password Changed Successfuly',
							result: user,
						});
					} else {
						return res.status(400).json({
							sucess: false,
							message: 'Password should have more than 6 characters',
						});
					}
				} else {
					return res.status(400).json({
						sucess: false,
						message:
							'Both passwords should match,confirm password and try again',
					});
				}
			} else {
				return res.status(400).json({
					message: 'All fields should be entered',
					success: false,
				});
			}
		} catch (error) {
			console.log(error);
			res.status(500).json(error);
		}
	} else {
		return res.status(403).json('Update your Account Only');
	}
};
