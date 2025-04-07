const path = require('path')
const bcrypt = require('bcrypt')

const { accountRetrievalUsername, accountSignup } = require('../models/accounts.js')
const { SALT_ROUNDS } = require('../config/config.js')

function signupGetController(req, res) {
	res.json({ success: true, message: 'Signup page reached' })
}

async function signupPostController(req, res) {
	const { username, ID, password, role } = req.body;

	if (!username || !ID || !password || !role) {
		return res.status(400).json({ success: false, message: 'Username, ID, password and role required!' });
	}

	const account = await accountRetrievalUsername(username);
	if (account) {
		console.error('Same username already exists');
		return res.status(409).json({ success: false, message: 'Username already exists' });
	}

	let hashedPassword;
	try {
		hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
	} catch (err) {
		console.error('Error hashing password:', err);
		return res.status(500).json({ success: false, message: 'Internal server error' });
	}

	try {
		const rc = await accountSignup(username, ID, hashedPassword, role);

		if (rc === 2) {
			console.log(`Account created for ID: ${ID}`);
			return res.status(201).json({ success: true, message: 'Account created successfully' });
		} else if (rc === 1) {
			console.error(`Account already exists for ID: ${ID}`);
			return res.status(409).json({ success: false, message: 'Account already exists' });
		} else if (rc === 0) {
			console.error(`User with ID ${ID} not found`);
			return res.status(404).json({ success: false, message: 'User not found in records' });
		} else {
			console.error(`Unexpected result code: ${rc}`);
			return res.status(500).json({ success: false, message: 'Unexpected error during signup' });
		}
	} catch (err) {
		console.error(`Error while signing user with ID ${ID} up:`, err);
		return res.status(500).json({ success: false, message: 'Internal Server Error' });
	}
}

module.exports = {
	get: signupGetController,
	post: signupPostController
}

