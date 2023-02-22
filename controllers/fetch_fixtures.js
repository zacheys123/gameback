import axios from 'axios';
export const fetchFixtures = async (req, res) => {
	const year = req.query.season;
	const standings = req.query.league;
	const dat = req.query.date;

	const options = {
		method: 'GET',
		url: 'https://api-football-v1.p.rapidapi.com/v3/fixtures',
		params: { date: dat, league: standings, season: year },
		headers: {
			'X-RapidAPI-Key': process.env.REACT_APP_FIXTURES,
			'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com',
		},
	};
	try {
		let resp = await axios.request(options);
		return res.json(resp.data);
	} catch (error) {
		console.log(error.message);
	}
};
