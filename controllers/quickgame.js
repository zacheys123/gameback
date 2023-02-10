import User from '../models/user.js';

export const createGame = async (req, res, next) => {
	const {
		player1,
		player2,
		player1_team,
		player2_team,
		telno1,
		telno2,
		station,
	} = req.body;
	console.log(req.body.extra_data.p1goals);
	try {
		const newUser = await User.findById(req.params.id);
		await newUser.updateOne({
			$push: {
				games: {
					player1_team,
					player1,
					player2_team,
					player2,
					telno1,
					telno2,
					station,
					p1goals: req.body.extra_data?.p1goals,
					p2goals: req.body.extra_data?.p2goals,
					amount: req.body.extra_data?.amount,
					paid: req.body.extra_data?.paid,
					outcome: req.body.extra_data?.outcome,
				},
			},
		});

		res.status(200).json('Game Successfully Added');
	} catch (error) {
		res.status(500).json(error);
	}
};

export const getGame = async (req, res, next) => {
	const curr = await User.findById(req.params.id);
	return res.status(200).json({ success: true, result: curr.games });
};
