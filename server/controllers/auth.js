import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

/**REGISTER USER */
export const register = async (req, res) => {
	try {
		const {
			firstName,
			lastName,
			email,
			password,
			confirmPassword,
			picturePath,
			friends,
			location,
			occupation,
		} = req.body;

		//Check if email is already registered
		let emailExist = await User.findOne({ email });
		if (emailExist) {
			return res.status(400).json({
				error: [{ msg: 'This email has been taken and not available' }],
			});
		}
		//Check if password matches
		if (password !== confirmPassword) {
			return res.status(400).json({
				error: [{ msg: 'Password Does not match, please try again' }],
			});
		}

		//Encrypt Password
		const salt = await bcrypt.genSalt(10);
		const passwordHash = await bcrypt.hash(password, salt);

		const newUser = new User({
			firstName,
			lastName,
			email,
			password: passwordHash,
			picturePath,
			friends,
			location,
			occupation,
			viewedProfile: Math.floor(Math.random() * 10000),
			impressions: Math.floor(Math.random() * 10000),
		});
		const savedUser = await newUser.save();
		res.status(201).json(savedUser);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

/**LOGGING IN */
export const login = async (req, res) => {
	try {
		const { email, password } = req.body;
		const user = await User.findOne({ email: email });
		if (!user) {
			return res.status(400).json({
				error: [{ msg: 'User does not exist' }],
			});
		}
		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) {
			return res.status(400).json({
				error: [{ msg: 'Invalid Credentials.' }],
			});
		}
		const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
		delete user.password;
		res.status(200).json({ token, user });
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};
