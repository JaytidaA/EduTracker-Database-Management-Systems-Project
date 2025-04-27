const { lectureData, attendanceData } = require('../models/attendance.js')
const { courseData } = require('../models/courses.js')

async function attendanceGetController (req, res) {

	const { ID, role } = req.jwtUser;
	// .log(ID, role, courseID);
	const courseID = req.params.cID;
	console.log(ID, role, courseID);

	if (!ID || !role || !courseID) {
		return res.json({ success: false, message: 'ID, role and courseID required!' });
	}

	if (role == 'student') {
		const course = await courseData(courseID);
		if (!course) {
			return res.status(404).json({ success: false, message: 'Course not found!' });
		}

		try {
			const lectures = await lectureData(courseID);
			const attendance = await attendanceData(ID, courseID);
		} catch (err) {
			console.error(`Error while fetching attendance data: ${err}`);
			return res.status(500).json({ success: false, message: 'Interval server error.' })
		}

		res.json({
			success: true,
			courseInfo: course,
			lectureInfo: lectures,
			attendanceInfo: attendance
		})
	} else if (role == 'faculty') {
		const course = await courseData(courseID);
		if (!course) {
			return res.status(404).json({ success: false, message: 'Course not found!' });
		}

		teachesCourse = (course['fac_ID'] == ID);
		if (!teachesCourse) {
			console.error('Tried to read attendance data for somebody else\'s course!');
			return res.status(403).json({ success: false, message: `This course is not taught by faculty: ${ID}` })			
		}

		try {
			const lectures = await lectureData(courseID);
			const studentAttendance = await totalStudentAttendanceData(courseID, lectures);

			if (studentAttendance == 1) {
				console.log(`No students registered yet for course ${courseID}`);
				return res.json({
					success: true,
					courseInfo: course,
					lectureInfo: lectures,
					attendanceInfo: studentAttendance,
					message: 'No students registered for course yet.'
				});
			}
		} catch (err) {
			console.error(`Error while fetching attendance data: ${err}`);
			return res.status(500).json({ success: false, message: 'Interval server error.' })
		}

		res.json({
			success: true,
			courseInfo: course,
			lectureInfo: lectures,
			attendanceInfo: studentAttendance
		});
	}
}

module.exports = {
	get: attendanceGetController
};
