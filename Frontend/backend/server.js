const { app, port } = require('./app.js')

app.listen(port, '0.0.0.0', () => {
	console.log(`Server is listening on port: ${port}`)
})
