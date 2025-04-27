const path = require('path')

const { facultyData } = require('./faculty.js');
const { departmentData } = require('./departm.js');

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

function allCoursesData () {
	return new Promise ((resolve, reject) => {
		const sql = 'SELECT * FROM Course';
		const params = [ID];

		db.get(sql, params, (err, rows) => {
			if (err) return reject(err);
			else resolve(rows);
		});
	});
}

function createCourse(courseName, courseCredits, courseCode, year, dep_ID, fac_ID) {
	return new Promise (async (resolve, reject) => {
		const faculty = await facultyData(fac_ID);
		const departm = await departmentData(dep_ID);

		if (!faculty) {
			reject(`No faculty with ID = ${fac_ID} present.`);
		} else if (!departm) {
			reject(`No department with ID = ${dep_ID} present.`)
		}

		const sql = `
			INSERT INTO Course (courseName, courseCredits, courseCode, year, dep_ID, fac_ID) VALUES
			(?, ?, ?, ?, ?, ?);
		`
		const params = [courseName, courseCredits, courseCode, year, dep_ID, fac_ID];
		db.run(sql, params, (err) => {
			if (err) return reject(err);
			else resolve();
		});
	});
}

function updateCourse(cID, courseName, courseCredits, courseCode, year, dep_ID, fac_ID) {
	return new Promise (async (reject, resolve) => {
		const faculty = await facultyData(fac_ID);
		const departm = await departmentData(dep_ID);

		if (!faculty) {
			reject(`No faculty with ID = ${fac_ID} present.`);
		} else if (!departm) {
			reject(`No department with ID = ${dep_ID} present.`)
		}

		const sql = `
			UPDATE Course
			SET courseName = ?,
				courseCredits = ?,
				courseCode = ?,
				year = ?,
				dep_ID = ?,
				fac_ID = ?
			WHERE (ID = ?);
		`

		const params = [courseName, courseCredits, courseCode, year, dep_ID, fac_ID, cID];
		db.run(sql, params, (err) => {
			if (err) return reject(err);
			else resolve();
		});
	})
}

module.exports = {
	courseData,
	allCoursesData,
	createCourse,
	updateCourse
};
