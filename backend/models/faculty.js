const path = require('path')

const db = require('../db/database.js')

function facultyData(ID) {
	return new Promise ((resolve, reject) => {
		const sql = 'SELECT * FROM Faculty WHERE (ID = ?)'
		const params = [ID]

		db.get(sql, params, (err, row) => {
			if (err) return reject(err);
			else resolve(row);
		});
	});
}

function facultyCoursesData(ID) {
	return new Promise ((resolve, reject) => {
		const sql = `
			SELECT c.ID, c.courseName, d.depName
			FROM Course c
			JOIN Department d ON c.dep_ID = d.ID
			WHERE c.fac_ID = ?;
		`	

		const params = [ID]

		db.all(sql, params, (err, rows) => {
			if (err) return reject(err);
			else resolve(rows);
		});
	});
}

function addFaculty (ID, name, email, isAdmin, phone, dep_ID) {
	return new Promise ((resolve, reject) => {
		const sql = `
			INSERT OR IGNORE INTO Faculty (ID, faceName, facEmail, facIsAdmin, facPhone, dep_ID)
			VALUES (?, ?, ?, ?, ?, ?);
		`
		const params = [ID, name, email, isAdmin, phone, dep_ID];

		db.run(sql, params, (err) => {
			if (err) reject (err);
			else {
				console.log(`Successfully added Faculty (${ID}: ${name}).`);
				resolve();
			}
		});
	});
}

module.exports = {
	facultyData,
	facultyCoursesData,
	addFaculty
};
