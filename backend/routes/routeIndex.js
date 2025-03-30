const express = require('express')

const signupControllers = require('../controllers/signupControllers')

const routeSignup = express()
const routeLogin = express()
const routeHome = express()
const routeAttendance = express()

routeSignup.get('/', signupControllers.get);

module.exports = {
	routeSignup,
	routeLogin,
	routeHome,
	routeAttendance
}
