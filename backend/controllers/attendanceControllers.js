const { lectureData, attendanceData } = require('../models/attendance.js')
const { courseData } = require('../models/courses.js')

async function attendanceGetController (req, res) {
	const { ID, role } = req.jwtUser;
	const courseID = req.params.cID;

	if (!ID || !role || !courseID) {
		return res.json({ success: false, message: 'ID, role and courseID required!' });
	}

	if (role != 'student') {
		return res.json({ success: false, message: 'Attendance is only marked for student!' });
	}

	const course = await courseData(courseID);
	if (!course) {
		return res.status(404).json({ success: false, message: 'Course not found!' });
	}

	const lectures = await lectureData(courseID);
	const attendance = await attendanceData(ID, courseID);

	res.json({
		success: true,
		courseInfo: course,
		lectureInfo: lectures,
		attendanceInfo: attendance
	})
}

module.exports = {
	get: attendanceGetController
};
