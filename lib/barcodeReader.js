const zbar = require("zbar.wasm");
const fs = require("fs-extra");
const jpeg = require("jpeg-js");

/**
 *
 * @param {string} imageLocation
 * @returns {array}
 */
const barcodeReader = async (imageLocation) => {
	// Create Image Buffer
	const imageBuffer = await fs.readFile(imageLocation);

	// Decode jpeg image buffer
	const rawImageData = jpeg.decode(imageBuffer);

	// Read barcodes from image
	const barcodes = await zbar.scanImageData(rawImageData);

	// Decode barcodes and return types
	const barcodesList = barcodes.map((barcode) => {
		// Decode every code in list
		return { type: barcode.typeName, code: barcode.decode() };
	});

	return barcodesList;
};

module.exports = barcodeReader;
