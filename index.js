/**
 * Name: Bulk PDF Barcode Reader
 * Author: Tarik Caplja
 * Licence: MIT
 *
 * This package extracts barcodes from .pdf files. You can configure extraction resolution with
 * viewportScale option. Default viewportScale is 1.
 *
 * Please do not confuse PDF417 Barcode format with this package. PDF417 is format of 2D barcode.
 *
 */

const fs = require("fs-extra");
const pdfjs = require("pdfjs-dist/legacy/build/pdf.js");
const _ = require("lodash");
const path = require("path");

// Libs import
const checkIfTempDirExist = require("./lib/checkIfDirExist");
const emptyDir = require("./lib/emptyDir");
const generateImageFromPdf = require("./lib/generateImageFromPdf");
const barcodeReader = require("./lib/barcodeReader");

// Directories
const TEMP_DIR = __dirname + "/temp";

/**
 *
 * @param {string} tempDir
 * @returns {object}
 */
async function processBarcodes(tempDir) {
	// Read files from directory
	const files = await fs.readdir(tempDir);

	// Extract barcodes from files
	const codes = files.map(async (file) => {
		return barcodeReader(`${tempDir}/${file}`);
	});

	// Resolve promises
	const resolveCodes = await Promise.all(codes);

	// Flatten codes
	const codesList = _.flatten(resolveCodes);

	// Check if codes founded
	if (codesList.length === 0)
		return {
			message: "No barcodes in document",
			codesCount: codesList.length,
			codes: codesList,
		};
	return {
		message: "Codes extracted succefully",
		codesCount: codesList.length,
		codes: codesList,
	};
}

async function main(pdfLocation, viewportScale = 1) {
	// Read .pdf file
	const fileExtension = path.extname(pdfLocation);

	// Check if provided file is .pdf
	if (fileExtension !== ".pdf")
		return { message: "You need to provide .pdf file" };

	// Read file
	const file = fs.readFileSync(pdfLocation);

	// Open document in pdfjs
	const pdfData = await pdfjs.getDocument(file).promise;

	// Get total number of pages for pagination
	const pageCount = pdfData.numPages;

	// Empty temp directory
	await emptyDir(TEMP_DIR);

	// Check if temp directory exist, if not create it
	await checkIfTempDirExist(TEMP_DIR);

	// Generate .jpeg images from pdf pages
	await generateImageFromPdf(pdfData, pageCount, viewportScale, TEMP_DIR);

	// Process all images with zbar and get all barcodes
	const data = await processBarcodes(TEMP_DIR);
	return data;
}

module.exports = main;
