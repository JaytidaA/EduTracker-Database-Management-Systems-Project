const path = require('path')

const db = require('../db/database.js')

function accountLogin (ID, role) {
	return new Promise ((resolve, reject) => {
		const sql = 'SELECT * FROM Accounts WHERE (ID = ? AND role = ?)'
		const params = [ID, role]

		db.get(sql, params, (err, rows) => {
			if (err) return reject(err);
			resolve(rows);
		});
	});
}

module.exports = {
	accountLogin
}
