import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import connectDB from './config/db.js';

import multer from 'multer';
import helmet from 'helmet';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';

/**CONFIGURATION */

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//Invoke express
const app = express();
//Invoke Database
connectDB();
app.use(express.json());
app.use(helmet());

app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
app.use(morgan('common'));
app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
app.use(cors());
app.use('assets', express.static(path.join(__dirname, 'public/assets')));

/**FILE STORAGE */
const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, 'public/assets');
	},
	filename: function (req, file, cb) {
		cb(null, file.originalname);
	},
});
const upload = multer({ storage });

/**MONGOOSE SETUP */
const PORT = process.env.PORT || 6001;

const server = app.listen(PORT, () =>
	console.log(`Server is running on port ${PORT}`)
);

process.on('unhandledRejection', (error) => {
	console.log(`Logged Error: ${error}`);
	server.close(() => process.exit(1));
});

/*mongoose
	.connect(process.env.Mongo_URL, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => {
		app.listen(PORT, () => console.log(`Server Port:${PORT} `));
	})
	.catch((error) => console.log(`${error} did not connect`));*/