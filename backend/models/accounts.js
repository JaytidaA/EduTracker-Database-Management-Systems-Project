const path = require('path')

const db = require('../db/database.js')

// Student and Faculty Data
const { studentData } = require('./students.js')
const { facultyData } = require('./faculty.js')

function accountRetrieval (ID, role) {
	return new Promise ((resolve, reject) => {
		const sql = 'SELECT * FROM Account WHERE (ID = ? AND role = ?)'
		const params = [ID, role]

		db.get(sql, params, (err, row) => {
			if (err) return reject(err);
			resolve(row);
		});
	});
}

async function accountSignup (username, ID, password, role) {
	let userExists = false
	let accountExists = false

	// Search if user exists
	if (role == 'student') {
		let person = await studentData(ID);
		if (person) userExists = true
	} else if (role == 'faculty') {
		let person = await facultyData(ID);
		if (person) userExists = true
	}

	// Search if account exists
	let account = await accountRetrieval(ID, role)
	if (account) {
		accountExists = true
	}
		
	if (userExists && !accountExists) {
		// Create an account
		const sql = `INSERT INTO Account (ID, username, passwordHash, role)
			VALUES (?, ?, ?, ?)`;
		const params = [ID, username, password, role];

		return new Promise ((resolve, reject) => {
			db.run(sql, params, (err) => {
				if (err) return reject(err);
				resolve(2);
			});
		});
	} else if (userExists && accountExists) {
		return 1;
	} else {
		return 0;
	}
}

function accountRetrievalUsername (username) {
	if (!username) {
		console.error('accountFromUsername: Empty string entered!!')
		return 0;
	} else {
		const sql = 'SELECT * FROM Account WHERE (username = ?)';
		const params = [username];

		return new Promise ((resolve, reject) => {
			db.get(sql, params, (err, row) => {
				if (err) return reject(err);
				resolve(row);
			})
		});
	}
}

module.exports = {
	accountRetrieval,
	accountRetrievalUsername,
	accountSignup
};
