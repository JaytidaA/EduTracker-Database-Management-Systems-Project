const path = require('path')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const { JWT_SECRET } = require('../config/config.js')

const { accountRetrieval } = require('../models/accounts.js')

function loginGetController (req, res) {
	res.json({ success: true, message: 'Login page reached' })
}

async function loginPostController (req, res) {
	const { ID, username, password, role } = req.body;

	if (!ID || !role) {
		return res.json({ success: false, message: 'ID and role required!' });
	} else if (!username || !password) {
		return res.json({ success: false, message: 'Username and password required!' });
	}

	try {
		const account = await accountRetrieval(ID, role);

		if (!account) {
			return res.status(404).json({ success: false, message: 'Account not found' });
		}

		if (account.username !== username) {
			return res.status(401).json({ success: false, message: 'Username does not match' });
    	}

		const match = await bcrypt.compare(password, account.passwordHash);
		
		if (!match) {
			return res.status(401).json({ success: false, message: 'Password does not match' });
		}

		const privateKey = JWT_SECRET;

		jwt.sign({ ID: ID, role: role, iat: Date.now() }, privateKey, { expiresIn: '30d' }, (err, token) => {
			if (err) {
				console.error('Error while generating token:', err);
				return res.status(500).json({ success: false, message: 'Token generation failed' });
			}

			return res.json({
				success: true,
				jwt: token,
				message: 'Logged in successfully, rerouting'
			});
		});

	} catch (err) {
		console.error('Error while logging in:', err.message || err);
		return res.status(500).json({ success: false, message: 'Internal Server Error' });
	}
}


module.exports = {
	get: loginGetController,
	post: loginPostController
}
