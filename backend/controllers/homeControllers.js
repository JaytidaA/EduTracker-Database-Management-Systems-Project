const path = require('path');

const { studentData, studentCoursesData } = require('../models/students.js')
// const { attendanceData } = require('../models/attendance.js')

async function homeGetController (req, res) {
	const { ID } = req.query;

	if (!ID) {
		return res.json({ success: false, message: 'ID required!' })
	}

	try {
		const student = await studentData(ID);
		const studentCourses = await studentCoursesData(ID);

		if (!student) {
			return res.status(404).json({ success: false, message: 'Student not found!' });
		}

		if (studentCourses.length == 0) {
			return res.json({
				success: true,
				data: {
					...student,
					message: 'Student has not registered for any courses'
				}
			});
		} else {
			const combinedData = {
				...student,
				courses: studentCourses
			};

			return res.json({
				success: true,
				data: combinedData
			});
		}
	} catch (err) {
		console.error('Error while logging in:', err.message || err);
		res.status(500).json({ success: false, message: 'Internal Server Error' });
	}
}

module.exports = {
	get: homeGetController,
}
