import axios from 'axios';
export const fetchFixtures = async (req, res) => {
	let queryDate = new Date(
		+req.params.year,
		+req.params.month - 1,
		+req.params.day,
	);
	const options = {
		method: 'GET',
		url:
			'https://api-football-v1.p.rapidapi.com/v2/fixtures/date/' +
			queryDate,
		headers: {
			'X-RapidAPI-Key': process.env.REACT_APP_RAPID_STANDINGS_KEY,
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
