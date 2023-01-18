import axios from 'axios';
export const fetchStandings = async (req, res) => {
	const year = req.query.season;
	const standings = req.query.league;
	const options = {
		method: 'GET',
		url: 'https://api-football-v1.p.rapidapi.com/v3/standings',
		params: { season: year, league: standings },
		headers: {
			'X-RapidAPI-Key': process.env.REACT_APP_RAPID_STANDINGS_KEY,

			'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com',
		},
	};

	try {
		let resp = await axios.request(options);
		res.status(200).json(resp.data);
	} catch (error) {
		console.error(error);
	}
};
