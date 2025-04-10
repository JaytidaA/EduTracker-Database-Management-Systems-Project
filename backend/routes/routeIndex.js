const express = require('express')

const signupControllers = require('../controllers/signupControllers')
const loginControllers = require('../controllers/loginControllers')
const homeControllers = require('../controllers/homeControllers')
const attendanceControllers = require('../controllers/attendanceControllers')
const markControllers = require('../controllers/markControllers')

const routeSignup = express()
const routeLogin = express()
const routeHome = express()
const routeAttendance = express()
const routeMark = express()

routeSignup.get('/', signupControllers.get);
routeSignup.post('/', signupControllers.post);

routeLogin.get('/', loginControllers.get);
routeLogin.post('/', loginControllers.post);

routeHome.get('/', homeControllers.get);

routeAttendance.get('/:cID', attendanceControllers.get);

routeMark.use('/', markControllers.log);
routeMark.get('/', markControllers.get);

module.exports = {
	routeSignup,
	routeLogin,
	routeHome,
	routeAttendance,
	routeMark
}
