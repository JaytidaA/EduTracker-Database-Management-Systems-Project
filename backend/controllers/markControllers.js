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

function logPrivateRequests	(req, res, next) {
	let rawIpHeader = req.headers['x-forwarded-for'];
	let rawIp = rawIpHeader
    	? rawIpHeader.split(',')[0].trim()
		: req.socket.remoteAddress;
	
	let clientIp = rawIp.startsWith('::ffff:') ? rawIp.slice(7) : rawIp;

	console.log('===============================');

	if (isPrivate(clientIp)) {
		console.log('New connection via Private IP: ');
    	console.log(`Private IP Request: ${clientIp}`);
		console.log('===============================');
		next();
	} else {
		console.log('Non-private IP Request')
		console.log('===============================');
		res.json({ message: 'Access denied, non-private IP' })
	}
}


function markGetController(req, res) {
	res.json({ message: 'Mark page reached' })
}


module.exports = {
	log: logPrivateRequests,
	get: markGetController
}
