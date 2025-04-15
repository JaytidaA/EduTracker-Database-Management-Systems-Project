module.exports = {
	DB_NAME: 'test/edutracker.db',
	PORT: 3000,
	SALT_ROUNDS: 10,

	// This is very unsafe, move it elsewhere
	JWT_SECRET: 'lachure',

	utility: {
		getDateTime
	}
};

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
