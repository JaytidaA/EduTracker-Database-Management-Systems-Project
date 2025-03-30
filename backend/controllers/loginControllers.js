const path = require('path')
const bcrypt = require('bcrypt')

const { accountLogin } = require('../models/accounts.js')

function loginGetController (req, res) {
	res.json({ message: 'Login page reached' })
}

async function loginPostController (req, res) {
	const { ID, username, password, role } = req.body;

	if (!ID || !role) {
		res.json({ message: 'ID and role required!' })
	} else if (!username || !password) {
		res.json({ message: 'Username and password required!' })
	}

	try {
		const account = await accountLogin(ID, role);

		if (!account) {
			return res.status(404).json({ message: 'Account not found' });
		}

		if (account.username !== username) {
	      return res.status(401).json({ message: 'Username does not match' });
    	}

		const match = await bcrypt.compare(password, account.password);
		
		if (!match) {
			return res.status(401).json({ message: 'Password does not match' });
		}

		res.json({ message: 'Logged in successfully, rerouting' });

	} catch (err) {
		console.error('Error while logging in:', err.message || err);
		res.status(500).json({ message: 'Internal Server Error' });
	}
}

module.exports = {
	get: loginGetController,
	post: loginPostController
}
