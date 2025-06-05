const bcrypt = require('bcrypt');
const SALT_ROUNDS = 10;

async function getHash (password) {
	const hashPass = await bcrypt.hash(password, SALT_ROUNDS);
	return hashPass;
}

getHash('admin_password').then(hash => {
	console.log(hash);
});
