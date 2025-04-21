const { allCoursesData, createCourse, updateCourse } = require('../models/courses.js')
const { isUnauthorised } = require('../utils/utility.js')

async function courseGetController (req, res) {
	try {
		const courses = await allCoursesData();
		if (courses.length == 0) {
			return res.json({ success: true, courses: courses, message: 'No courses in the database, create some.' });
		}
	} catch (err) {
		console.error(`Error while accessing courses: ${err}`);
		return res.status(500).json({ success: false, message: 'Internal Server Error, could not access courses.' });
	}

	return res.json({ success: true, courses: courses });
}

async function coursePostController (req, res) {
	try {
		const { courseName, courseCredits, courseCode, year, dep_ID, fac_ID } = req.body;
		await createCourse(courseName, courseCredits, courseCode, year, dep_ID, fac_ID);
	} catch (err) {
		console.error(`Error while creating Course ${courseName}: ${err}`);
		return res.status(500).json({ success: false, message: 'Internal server error.' });
	}
}

async function coursePatchController (req, res) {
	const { cID } = req.params.cID;
	
	try {
		const { courseName, courseCredits, courseCode, year, dep_ID, fac_ID} = req.body;
		await updateCourse(courseName, courseCredits, courseCode, year, dep_ID, fac_ID);
	} catch (err) {
		console.error(`Error while updating Course ${courseName}: ${err}`);
		return res.status(500).json({ success: false, message: 'Internal server error.' });
	}
}

module.exports = {
	get: courseGetController,
	post: coursePostController,
	patch: coursePatchController
}
