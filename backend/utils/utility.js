function isUnauthorised(jwtUser) {
	// 0: Authorised, no error
	// 1: Unauthorised
	const { ID, role } = jwtUser;

	if (role != 'faculty') {
	 	console.log('Not faculty')
	 	return 1;
	}
	
	const { isAdmin } = jwtUser;
		if (!isAdmin) {
		return 1;
	}
}

function getDateTime() {
	const now = new Date();

	const yyyy = now.getFullYear();
	const mm = String(now.getMonth() + 1).padStart(2, '0');
	const dd = String(now.getDate()).padStart(2, '0');

	const hh = String(now.getHours()).padStart(2, '0');
	const min = String(now.getMinutes()).padStart(2, '0');
	const ss = String(now.getSeconds()).padStart(2, '0');

	const formatted = `${yyyy}-${mm}-${dd} ${hh}:${min}:${ss}`;
	return formatted;
}

module.exports = {
	isUnauthorised,
	getDateTime
};
