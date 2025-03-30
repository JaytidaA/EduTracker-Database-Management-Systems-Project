const express = require('express')
const app = express()

const { PORT } = require('./config/config.js')

const routes = require('./routes/routeIndex');

app.get('/', (req, res) => {
	res.send("<h1>Hello World</h1>");
})

app.use('/signup', routes.routeSignup)

module.exports = {
	app: app,
	port: PORT
}
