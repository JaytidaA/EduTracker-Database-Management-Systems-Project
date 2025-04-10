const jwt = require('jsonwebtoken');

const { JWT_SECRET } = require('../config/config.js')

function authenticateToken (req, res, next) {
	const authHeader = req.headers['authorization'];
	const token = authHeader && authHeader.split(' ')[1];

	if (!token) {
		console.error('No token provided!');
		return res.status(401).json({ success: false, message: 'Token missing.' })
	}

	privateKey = JWT_SECRET;
	
	jwt.verify(token, privateKey, (err, decoded) => {
		if (err) {
			console.error('Error while verifying token:', err)
			return res.json({ success: false, message: 'Invalid or expired token' })
		}

		req.jwtUser = decoded;
		next();
	});
}

module.exports = {
	jwt: authenticateToken
}
