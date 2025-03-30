const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const { DB_NAME } = require('../config/config.js');

const dbPath = path.resolve(__dirname, DB_NAME);

// Point to database file
const db = new sqlite3.Database(dbPath, (err) => {
	if (err) {
		console.error("Failed to connect to SQLite database:", err.message);
	} else {
		console.log("Connected to SQLite database at", dbPath);
	}
});

module.exports = db;
