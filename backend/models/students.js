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
			SELECT c.ID, c.courseName, d.depName, f.facName
			FROM Course c
			JOIN Enrolls e ON c.ID = e.course_ID
			JOIN Student s ON e.student_ID = s.ID
			JOIN Department d ON c.dep_ID = d.ID
			JOIN Faculty f ON c.fac_ID = f.ID
			WHERE s.ID = ?;
		`

		const params = [ID]

		db.all(sql, params, (err, rows) => {
			if (err) return reject(err);
			else resolve(rows);
		});
	});
}

function addStudent(ID, name, email, phone, dep_ID) {
	return new Promise ((resolve, reject) => {
		const sql = `
			INSERT OR IGNORE INTO Student (ID, name, email, phone, dep_ID)
			VALUES (?, ?, ?, ?, ?);
		`
		const params = [ID, name, email, phone, dep_ID];

		db.run(sql, params, (err) => {
			if (err) return reject(err);
			else {
				console.log(`Successfully added Student (${ID}: ${name})`);
				resolve();
			}
		});
	});
}

module.exports = {
	studentData,
	studentCoursesData,
	addStudent
};
