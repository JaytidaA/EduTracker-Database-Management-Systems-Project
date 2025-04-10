function logRequest (req, res, next) {
	const now = new Date().toISOString();
	console.log(`[${now}] ${req.method} ${req.originalUrl}`);
	next();
}

function logIP (req, res, next) {
	let rawIpHeader = req.headers['x-forwarded-for'];
	let rawIp = rawIpHeader
		 ? rawIpHeader.split(',')[0].trim()
		 : req.socket.remoteAddress;
		
	let clientIp = rawIp.startsWith('::ffff:') ? rawIp.slice(7) : rawIp;

	const now = new Date().toISOString();

	console.log(`[${now}] Incoming request from: ${clientIp}`);
	next();
}


module.exports = {
	request: logRequest,
	ipv4: logIP
};
