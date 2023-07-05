import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
	try {
		await mongoose.connect(process.env.Mongo_URL, {
			useNewUrlParser: true,
			useUnifiedTopology: true,

			useNewUrlParser: true,
		});
		console.log('Mongodb connected');
	} catch (error) {
		console.log(`${error} did not connect`);

		//exit process with failure
		process.exit(1);
	}
};

export default connectDB;
