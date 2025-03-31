const path = require('path')

const db = require('../db/database.js')

function studentData (ID) {
	return new Promise ((resolve, reject) => {
		const sql = 'SELECT * FROM Student WHERE (ID = ?)'
		const params = [ID]

		db.get(sql, params, (err, row) => {
			if (err) return reject(err);
			else resolve(row);
		});
	});
}

function studentCoursesData(ID) {
	return new Promise ((resolve, reject) => {
		const sql = `
			SELECT c.courseName, d.depName
			FROM Course c
			JOIN Enrolls e ON c.ID = e.course_ID
			JOIN Student s ON e.student_ID = s.ID
			JOIN Department d ON c.dep_ID = d.ID
			WHERE s.ID = ?;
		`

		const params = [ID]

		db.all(sql, params, (err, rows) => {
			if (err) return reject(err);
			else resolve(rows);
		});
	});
}

module.exports = {
	studentData,
	studentCoursesData
};
