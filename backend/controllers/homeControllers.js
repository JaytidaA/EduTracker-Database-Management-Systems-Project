const path = require('path');
const jwt = require('jsonwebtoken');

const { studentData, studentCoursesData } = require('../models/students.js')
const { facultyData, facultyCoursesData } = require('../models/faculty.js')

async function homeGetController (req, res) {
	const { ID, role } = req.jwtUser;

	if (!ID || !role) {
		return res.json({ success: false, message: 'ID and role required!' })
	}

	if (role != 'student' && role != 'faculty') {
		return res.json({ success: false, message: 'Invalid role provided!' })
	}

	try {
		if (role == 'student') {
			const student = await studentData(ID);
			// console.log(studentCourses);
			const studentCourses = await studentCoursesData(ID);
			// console.log(studentCourses);


			if (!student) {
				return res.status(404).json({ success: false, message: 'Student not found!' });
			}

			if (studentCourses.length == 0) {
				return res.json({
					success: true,
					data: {
						...student,
						courses: studentCourses,
						message: 'Student has not registered for any courses'
					}
				});
			} else {
				return res.json({
					success: true,
					data: {
						...student,
						courses:studentCourses
					}
				});
			}
		} else {
			const faculty = await facultyData(ID);
			const facultyCourses = await facultyCoursesData(ID);

			if (!faculty) {
				return res.status(404).json({ success: false, message: 'Faculty not found!' });
			}

			if (facultyCourses.length == 0) {
				return res.json({
					success: true,
					data: {
						...faculty,
						courses: facultyCourses,
						message: 'Faculty has not been assigned any courses.'
					}
				});
			} else {
				return res.json({
					success: true,
					data: {
						...faculty,
						courses: facultyCourses
					}
				});
			}
		}
	} catch (err) {
		console.error('Error while accessing home page in:', err.message || err);
		res.status(500).json({ success: false, message: 'Internal Server Error' });
	}
}

module.exports = {
	get: homeGetController
}
