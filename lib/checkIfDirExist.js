const fs = require("fs-extra");

/**
 *
 * @param {string} dir
 */
async function checkIfTempDirExist(dir) {
	if (!fs.existsSync(dir)) {
		await fs.mkdir(dir);
	}
}

module.exports = checkIfTempDirExist;
