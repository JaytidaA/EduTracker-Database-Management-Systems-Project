const path = require('path')

const db = require('../db/database.js')

function enrolledStudents (ID) {
	return new Promise ((resolve, reject) => {
		const sql = 'SELECT student_ID FROM Enrolls WHERE (course_ID = ?)'
		const params = [ID]

		db.all(sql, params, (err, rows) => {
			if (err) return reject(err);
			else resolve(rows);
		});
	});
}

module.exports = {
	enrolledStudents
};
