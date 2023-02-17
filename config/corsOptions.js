import { allowed } from './allowed.js';

export const corsOptions = {
	origin: (origin, callback) => {
		if (allowed.indexOf(origin) !== -1 || !origin) {
			callback(null, true);
		} else {
			callback(new Error('Not allowed by Cors'));
		}
	},
	credentials: true,
	optionsSuccessStatus: true,
};
