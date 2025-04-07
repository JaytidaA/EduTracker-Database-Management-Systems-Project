const express = require('express')

const signupControllers = require('../controllers/signupControllers')
const loginControllers = require('../controllers/loginControllers')
const homeControllers = require('../controllers/homeControllers')
const markControllers = require('../controllers/markControllers')

const routeSignup = express()
const routeLogin = express()
const routeHome = express()
const routeCourses = express()
const routeAttendance = express()
const routeMark = express()

routeSignup.get('/', signupControllers.get);
routeSignup.post('/', signupControllers.post);

routeLogin.get('/', loginControllers.get);
routeLogin.post('/', loginControllers.post);

routeHome.get('/', homeControllers.get);

routeMark.use('/', markControllers.log);
routeMark.get('/', markControllers.get);

module.exports = {
	routeSignup,
	routeLogin,
	routeHome,
	routeCourses,
	routeAttendance,
	routeMark
}
