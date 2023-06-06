import jwt from 'jsonwebtoken';

export const verifyToken = async (req, res, next) => {
	/*const token = req.header('x-auth-token');
	if (!token) {
		res.status(403).json({ msg: 'Access Denied' });
	}
	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		req.user = decoded.user;
		next();
	} catch (err) {
		res.status(401).json({ msg: 'Token is not valid' });
	}*/
	try {
		let token = req.header('Authorisation');
		if (!token) {
			return res.status(403).send('Access Denied');
		}
		if (token.startsWith('Bearer ')) {
			token = token.slice(7, token.length).trimLeft();
		}
		const verified = jwt.verify(token, process.env.JWT_SECRET);

		req.user = verified;
		next();
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};
