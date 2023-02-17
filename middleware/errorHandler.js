import { logEvents } from './logger.js';

export const errorHandler = (err, req, res, next) => {
	logEvents(
		`${err.name}: ${err.message}\t${req.method}\t${req.url}\t${req.header.origin}`,
		'errorLog.log',
	);
	console.log(err.stack);
	const status =
		res.statusCode >= 100 && statusCode < 600 ? err.code : 500;
	res.status = status;
	res.json({ message: err.message });
};
