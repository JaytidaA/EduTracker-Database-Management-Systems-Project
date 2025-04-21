const { activeLectureData, markAttendance, createLecture } = require('../models/attendance.js');
const { getDateTime } = require('../utils/utility.js')

function isPrivate(ip) {
	ip = ip.replace('::ffff', '')

	const parts = ip.split('.').map(Number);
	if (parts.length != 4 || parts.some(p => isNaN(p))) return false;

	const [a, b] = parts;

	return (
		a === 10 ||								// 10.0.0.0/8
		(a === 127 && b >= 16 && b <= 31) ||	// 172.16.0.0/12
		(a === 192 && b === 168) ||				// 193.168.0.0/16
		a === 127								// loopback
	);
}

function filterRequests (req, res, next) {
	let rawIpHeader = req.headers['x-forwarded-for'];
	let rawIp = rawIpHeader
    	? rawIpHeader.split(',')[0].trim()
		: req.socket.remoteAddress;
	
	let clientIp = rawIp.startsWith('::ffff:') ? rawIp.slice(7) : rawIp;

	if (isPrivate(clientIp)) {
		next();
	} else {
		console.log(`Non-private IP Request: ${clientIp}`)
		return res.json({ success: false, message: 'Access denied, non-private IP' })
	}
}

async function markGetController(req, res) {
	const { ID, role } = req.jwtUser;

	// Get data of curerntly active sessions
	const activeSessions = await activeLectureData(ID, role);
	if (activeSessions.length == 0) {
		return res.json({ success: true, activeSessions: activeSessions, message: 'No active sessions!' });
	} else {
		return res.json({ success: true, activeSessions: activeSessions });
	}
}

async function markPostController(req, res) {
	const { ID, role } = req.jwtUser;

	if (role != 'faculty') {
		console.log(`${ID}: Unauthorised access to /mark`)
		return res.status(403).json({ success: false, message: 'Students are unauthorised to view this page.' })
	} else {
		const { course_ID, lecture_Number } = req.body;
		try {
			await createLecture(course_ID, getDateTime(), lecture_Number)
		} catch (err) {
			console.error(`Error while creating Lecture Instance : ${err}`)
			return res.status(500).json({
				success: false,
				message: 'Internal Server Error'
			});
		}

		return res.status(200).json({ success: true, message: `Created Lecture for Course: ${ID}` });
	}
}

async function markPatchController (req, res) {
	const { ID, role } = req.jwtUser;

	if (role == 'student') {
		const { course_ID, lecture_Number } = req.body;
		try {
			await markAttendance(getDateTime(), 'p', course_ID, ID, lecture_Number);
		} catch (err) {
			console.error(`Error while marking attendance: ${err}`)
			return res.status(500).json({
				success: false,
				message: 'Internal Server Error'
			});
		}
	} else if (role == 'faculty') {
		const { course_ID, lecture_Number, student_ID, attend_Status } = req.body;
		try {
			if (attend_Status != 'a' && attend_Status != 'p') {
				console.error(`Invalid value of attend_Status: ${attend_Status}`);
				return res.status(400).json({ success: false, message: 'Invalid value of attend_Status provided' })
			}
			await markAttendance(getDateTime(), attend_Status, course_ID, student_ID, lecture_Number);
			return res.status(200).json({ success: true, message: 'Successfully updated attendance.' })
		} catch (err) {
			console.error(`Error while updating attendance: ${err}`)
			return res.status(500).json({
				success: false,
				message: 'Internal Server Error'
			});
		}
	}
}

module.exports = {
	filter: filterRequests,
	get: markGetController,
	post: markPostController,
	patch: markPatchController
}
