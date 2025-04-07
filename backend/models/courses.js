const path = require('path')

const db = require('../db/database.js')

function courseData(ID) {
	return new Promise ((resolve, reject) => {
		const sql = 'SELECT * FROM Course WHERE (ID = ?)'
		const params = [ID]

		db.get(sql, params, (err, row) => {
			if (err) return reject(err);
			else resolve(row);
		});
	});
}

module.exports = {
	courseData,
};
