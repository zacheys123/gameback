import User from '../models/user.js';

export const createGame = async (req, res, next) => {
	try {
		const newUser = await User.findById(req.params.id);
		await newUser.updateOne({ $push: { games: req.body } });

		res.status(200).json('Game Successfully Added');
	} catch (error) {
		res.status(500).json(error);
	}
};

export const getGame = async (req, res, next) => {
	const curr = await User.findById(req.params.id);
	return res.status(200).json({ success: true, result: curr });
};
