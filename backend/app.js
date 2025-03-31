const express = require('express')
const app = express()

const { PORT } = require('./config/config.js')

const routes = require('./routes/routeIndex.js')

app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
	res.send("<h1>Hello World</h1>");
})

app.use('/signup', routes.routeSignup)
app.use('/login', routes.routeLogin)
app.use('/home', routes.routeHome)
app.use('/mark', routes.routeMark)

module.exports = {
	app: app,
	port: PORT
}
