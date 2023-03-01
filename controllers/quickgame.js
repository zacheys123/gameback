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
		},
		info,
	} = req.body;
	console.log(req.body);
	const matchno = /^[0-9]*$/;
	try {
		if (
			req.body.player_data?.extra_data?.p1goals.match &&
			req.body.player_data?.extra_data?.p2goals.match
		) {
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
						outcome:
							info.current +
							req.body.player_data?.extra_data?.outcome,
						best_amount:
							req.body.player_data?.extra_data?.best_amount,
						penalty_amount:
							req.body.player_data?.extra_data?.penalty_amount,
					},
				},
			});

			res.status(200).json({ message: 'Game Successfully Added' });
		} else {
			res.status(200).json({
				message: 'All fields are needed,Only tel no(optional)',
			});
		}
	} catch (error) {
		res.status(400).json({
			message: error.message,
		});
		res.status(500).json(error);
	}
};

//
export const tournName = async (req, res) => {
	const { tourn_name } = req.body;

	try {
		if (tourn_name) {
			const newUser = await User.findById(req.params.id);
			await newUser.updateOne({
				$set: {
					tourn: tourn_name,
				},
			});

			res.status(200).json({ message: 'done' });
		} else {
			res.status(400).json({
				message:
					'No Empty Inputs allowed,check your inputs and try again',
			});
		}
	} catch (error) {
		console.log(error.message);
		res.status(400).json({
			message: error.message,
		});
		res.status(400).json({
			message: error.message,
		});
		res.status(500).json(error);
	}
};
// create tournament
export const createTournament = async (req, res, next) => {
	const { facilitator, tourn_name, type, noplayers, amount } =
		req.body;

	const matchno = /^[0-9]*$/;
	try {
		if (facilitator && tourn_name && type && noplayers && amount) {
			const newUser = await User.findById(req.params.id);
			await newUser.updateOne({
				$push: {
					tournament: {
						facilitator,
						tournname: tourn_name,
						type,
						noplayers,
						amount,
					},
				},
			});

			res
				.status(200)
				.json({ message: 'Tournament Successfully Registered' });
		} else {
			res.status(400).json({
				message:
					'No Empty Inputs allowed,check your inputs and try again',
			});
		}
	} catch (error) {
		console.log(error.message);
		res.status(500).json(error);
	}
};

// // create tournament
export const createFinalTourn = async (req, res, next) => {
	const { first_runner, second_runner, prize, winner } = req.body;

	const matchno = /^[0-9]*$/;
	try {
		if (first_runner && second_runner && prize && winner) {
			const newUser = await User.findById(req.params.id);
			await newUser.updateOne({
				$push: {
					tournament: {
						first_runner: first_runner,
						second_runner: second_runner,
						winner,
						prize,
					},
				},
			});

			res.status(200).json({
				message: `End Of Tournament \n Congratulations ${winner}`,
			});
		} else {
			res.status(400).json({
				message:
					'No Empty Inputs allowed,check your inputs and try again',
			});
		}
	} catch (error) {
		console.log(error.message);
		res.status(500).json(error);
	}
};
//
export const getGame = async (req, res, next) => {
	const curr = await User.findById(req.params.id);
	return res.status(200).json({ success: true, result: curr.games });
};
