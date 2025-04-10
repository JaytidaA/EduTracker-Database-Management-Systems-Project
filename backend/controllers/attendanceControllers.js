const path = require('path');

const { studentData, studentCoursesData } = require('../models/students.js')
const { facultyData, facultyCoursesData } = require('../models/faculty.js')
const { attendanceData } = require('../models/attendance.js')

async function attendanceGetController (req, res) {
	const { ID, role, courseID } = req.query;

	if (!ID || !role || !courseID) {
		return res.json({ success: false, message: 'ID, role and Course ID required!' })
	}

	if (role != 'student') {
		return res.json({ success: false, message: 'Invalid role provided!' })
	}

	try {
		const attendances = await attendanceData(ID, courseID);

		if (attendances.length == 0) {
			return res.json({ success: true, message: 'Student has not attended a single lecture 💀' });
		}

		return res.json({
			success: true,
			attendanceData:...attendances
		})
	} catch (err) {
		console.error('Error while accessing home page in:', err.message || err);
		res.status(500).json({ success: false, message: 'Internal Server Error' });
	}
}

module.exports = {
	get: homeGetController
}
