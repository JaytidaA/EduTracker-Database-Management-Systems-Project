const path = require('path')
const bcrypt = require('bcrypt')

// Get the database handle
const db = require('../db/database.js')

function signupGetController (req, res) {
	res.json({ message: 'Signup page reached' })
}

function signupPostController (req, res) {
	res.json({ message: 'Need to be admin to access this route' })
}

module.exports = {
	get: signupGetController,
	put: signupPostController
}
