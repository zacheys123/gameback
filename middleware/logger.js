import { format } from 'date-fns';
import { v4 as uuid } from 'uuid';

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const fsPromises = fs.promises;
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
export const logEvents = async (message, logFileName) => {
	const dateTime = `${format(new Date(), 'yyyyMMdd\tHH:mm:ss')}`;
	const logItem = `${dateTime}\t${uuid()}\t${message}\n`;
	try {
		if (!fs.existsSync(path.join(__dirname, '..', 'logs'))) {
			await fsPromises.mkdir(path.join(__dirname, '..', 'logs'));
		}
		await fsPromises.appendFile(
			path.join(__dirname, '..', 'logs', logFileName),
			logItem,
		);
	} catch (err) {
		console.log(err);
	}
};

export const logger = (req, res, next) => {
	logEvents(
		`${req.method}\t${req.url}\t${req.headers.origin}`,
		'reqLog.log',
	);
	next();
};
