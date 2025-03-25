const { app, port } = require('./app.js')

app.listen(port, () => {
	console.log(`Server is listening on port: ${port}`)
})
