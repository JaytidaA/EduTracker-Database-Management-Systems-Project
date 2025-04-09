const express = require('express')
const app = express()

const { PORT } = require('./config/config.js')

const routes = require('./routes/routeIndex.js')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const loggers = require('./middleware/logging.js')
const auth = require('./middleware/authorisation.js')

app.use(loggers.request)
app.use(loggers.ipv4)

app.get('/', (req, res) => {
	res.send("<h1>EduTracker: Tracking your Attendance</h1>");
})

app.use('/signup', routes.routeSignup)
app.use('/login', routes.routeLogin)
app.use('/home', auth.jwt, routes.routeHome)
app.use('/mark', auth.jwt, routes.routeMark)

module.exports = {
	app: app,
	port: PORT
}
