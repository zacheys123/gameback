import User from '../models/user.js';

export const createGame = async (req, res, next) => {
	const {
		player_data: {
			player1,
			player2,
			player1_team,
			player2_team,
			telno1,
			telno2,
			station,

			best_amount,
		},
		info,
	} = req.body;
	console.log(req.body.info);
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
					p1goals: req.body.player_data?.extra_data?.p1goals,
					p2goals: req.body.player_data?.extra_data?.p2goals,
					amount: req.body.player_data?.extra_data?.amount,
					paid: req.body.player_data?.extra_data?.paid,
					outcome: info + req.body.player_data?.extra_data?.outcome,
					best_amount: req.body.player_data?.extra_data?.best_amount,
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
