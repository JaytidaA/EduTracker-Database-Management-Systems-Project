const path = require('path');
const db = require('../db/database.js');

function facultyData(ID) {
	return new Promise((resolve, reject) => {
		const sql = 'SELECT * FROM Faculty WHERE ID = ?';
		const params = [ID];

		db.get(sql, params, (err, row) => {
			if (err) return reject(err);
			else resolve(row);
		});
	});
}

function facultyCoursesData(ID) {
	return new Promise((resolve, reject) => {
		const sql = `
			SELECT c.ID, c.courseName, d.depName
			FROM Course c
			JOIN Department d ON c.dep_ID = d.ID
			WHERE c.fac_ID = ?;
		`;
		const params = [ID];

		db.all(sql, params, (err, rows) => {
			if (err) return reject(err);
			else resolve(rows);
		});
	});
}

function addFaculty(ID, name, email, isAdmin, phone, dep_ID) {
	return new Promise((resolve, reject) => {
			// Convert isAdmin to integer if needed
			const isAdminInt = isAdmin ? 1 : 0;
			
			const sql = `
					INSERT OR IGNORE INTO Faculty (ID, facName, facEmail, facIsAdmin, facPhone, dep_ID)
					VALUES (?, ?, ?, ?, ?, ?);
			`;
			
			const params = [ID, name, email, isAdminInt, phone, dep_ID];

			db.run(sql, params, function(err) {
					if (err) {
							console.error(`Error inserting faculty:`, err.message);
							return reject(err);
					}

					if (this.changes === 0) {
							console.warn(`No faculty inserted. Possibly duplicate ID: ${ID}`);
					} else {
							console.log(`✅ Successfully added Faculty (${ID}: ${name}). Rows inserted: ${this.changes}`);
					}
					resolve();
			});
	});
}

module.exports = {
	facultyData,
	facultyCoursesData,
	addFaculty
};
