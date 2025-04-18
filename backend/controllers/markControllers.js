const { activeLectureData, markAttendance, createLecture } = require('../models/attendance.js');
const { utility } = require('../config/config.js')

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
	console.log(activeSessions);
	if (activeSessions.length == 0) {
		return res.json({ success: true, activeSessions: activeSessions, message: 'No active sessions!' });
	} else {
		return res.json({ success: true, activeSessions: activeSessions });
	}
}

async function markPostController(req, res) {
  const { ID, role } = req.jwtUser;
  console.log(`Request received: User ID=${ID}, role=${role}`);

  if (role === 'student') {
    const { course_ID, lecture_Number } = req.body;
    try {
      await markAttendance(utility.getDateTime(), 'p', course_ID, ID, lecture_Number);
      console.log(`Student attendance marked: course_ID=${course_ID}, student_ID=${ID}`);
      return res.status(200).json({ 
        success: true, 
        message: `Marked Attendance for Course: ${course_ID}` 
      });
    } catch (err) {
      console.error(`Error while marking attendance: ${err}`);
      return res.status(500).json({
        success: false,
        message: 'Internal Server Error'
      });
    }
  } else if (role === 'faculty') {
    const { course_ID, lecture_Number } = req.body;
    
    if (!course_ID || !lecture_Number) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: course_ID or lecture_Number'
      });
    }

    try {
      console.log(`Creating lecture: course_ID=${course_ID}, date=${utility.getDateTime()}, lecture_Number=${lecture_Number}`);
      await createLecture(course_ID, utility.getDateTime(), lecture_Number);
      console.log(`Faculty created lecture: course_ID=${course_ID}, lecture_Number=${lecture_Number}`);
      
      return res.status(200).json({ 
        success: true, 
        message: `Created Lecture for Course: ${course_ID}` 
      });
    } catch (err) {
      console.error(`Error while creating Lecture Instance: ${err}`);
      return res.status(500).json({
        success: false,
        message: 'Internal Server Error: ' + err.message
      });
    }
  } else {
    return res.status(403).json({
      success: false,
      message: 'Unauthorized role'
    });
  }
}

module.exports = {
	filter: filterRequests,
	get: markGetController,
	post: markPostController
}
