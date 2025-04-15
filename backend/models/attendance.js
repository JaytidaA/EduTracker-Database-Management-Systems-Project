const path = require('path')

const db = require('../db/database.js')

function lectureData(courseID) {
	return new Promise ((resolve, reject) => {
		const sql = 'SELECT * FROM Lectures WHERE (course_ID = ?)';
		const params = [courseID];

		db.all(sql, params, (err, rows) => {
			if (err) {
				console.error('Error fetching contents:', err)
				return reject(err);
			} else {
				resolve(rows);
			}
		});
	});
}

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

function activeLectureData(ID, role) {
	if (role == 'student') {
		return new Promise ((resolve, reject) => {
			const sql = `
				SELECT l.course_ID, l.lectureDate, l.lectureNumber, f.facName
				FROM Lectures l
				JOIN Course c on c.ID = l.course_ID
				JOIN Enrolls e ON c.ID = e.course_ID
				JOIN Student s ON e.student_ID = s.ID
				JOIN Faculty f ON c.fac_ID = f.ID
				WHERE (
					l.lectureDate <= datetime('now', '-15 minutes') AND
					s.ID = ?
				);
			`;

			const params = [ID];

			db.all(sql, params, (err, rows) => {
				if (err) return reject(err);
				else resolve(rows);
			});
		});
	} else if (role == 'faculty') {
		return new Promise ((resolve, reject) => {
			const sql = `
				SELECT l.course_ID, l.lectureDate, l.lectureNumber
				FROM Lectures l
				JOIN Course c on c.ID = l.course_ID
				JOIN Faculty f on c.fac_ID = f.ID
				WHERE (
					l.lectureDate <= datetime('now', '-15 minutes') AND
					f.ID = ?
				);
			`;

			const params = [ID];
			db.all(sql, params, (err, rows) => {
				if (err) return reject(err);
				else resolve(rows);
			});
		});
	}
}

function markAttendance(attendDate, attendStatus, course_ID, student_ID, lecture_Number) {
	return new Promise((resolve, reject) => {
		const sql = `
			INSERT INTO Attendance (attendDate, attendStatus, course_ID, student_ID, lecture_Number)
			VALUES (?, ?, ?, ?, ?);
		`;

		const params = [attendDate, attendStatus, course_ID, student_ID, lecture_Number];

		db.run(sql, params, (err) => {
			if (err) return reject(err);
			else resolve();
		});
	});
}

function createLecture(course_ID, lectureDate, lectureNumber) {
	return new Promise((resolve, reject) => {
		const sql = `
			INSERT INTO Lectures (course_ID, lectureDate, lectureNumber)
			VALUES (?, ?, ?);
		`;

		const params = [course_ID, lectureDate, lectureNumber];

		db.run(sql, params, (err) => {
			if (err) return reject(err);
			else resolve();
		});
	});
}


module.exports = {
	lectureData,
	attendanceData,
	activeLectureData,
	markAttendance,
	createLecture
};
