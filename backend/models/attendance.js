const path = require('path')

const db = require('../db/database.js')

function attendanceData(studentID, courseID) {
	return new Promise ((resolve, reject) => {
		const sql = 'SELECT * FROM Attendance WHERE (student_ID = ? AND course_ID = ?)'
		const params = [studentID, courseID]

		db.all(sql, params, (err, rows) => {
			if (err) return reject(err);
			else resolve(rows);
		});
	});
}

module.exports = {
	attendanceData,
};
