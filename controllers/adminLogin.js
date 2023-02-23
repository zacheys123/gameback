export const adminLogin = async (req, res) => {
	const {
		adm,
		adminref: {
			current: { username, secret, secret_question },
		},
	} = req.body;
	console.log(username);
	try {
		if (username && secret && secret_question) {
			const result = await User.findOne(
				{ _id: adm },
				{
					username,
					secret,
					secret_question,
				},
			);

			if (!result) {
				res
					.status(404)
					.json({ message: 'Sorry,You are Not An Admin' });
			}

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
