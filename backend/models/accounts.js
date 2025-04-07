const path = require('path')

const db = require('../db/database.js')

function accountLogin (ID, role) {
	return new Promise ((resolve, reject) => {
		const sql = 'SELECT * FROM Account WHERE (ID = ? AND role = ?)'
		const params = [ID, role]

		db.get(sql, params, (err, row) => {
			if (err) return reject(err);
			resolve(row);
		});
	});
}

module.exports = {
	accountLogin
};
