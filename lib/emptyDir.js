const fs = require("fs-extra");

/**
 *
 * @param {string} dir
 */
async function emptyTempDir(dir) {
	if (fs.existsSync(dir)) await fs.emptyDir(dir);
}

module.exports = emptyTempDir;
