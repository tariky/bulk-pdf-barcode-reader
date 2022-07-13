const NodeCanvasFactory = require("../lib/NodeCanvasFactory");
const fs = require("fs-extra");

/**
 *
 * @param {PDFDocumentProxy} pdfData
 * @param {number} pageCount
 * @param {number} viewportScale
 * @param {string} tempDir
 */
async function generateImageFromPdf(
	pdfData,
	pageCount,
	viewportScale,
	tempDir
) {
	for (let index = 1; index <= pageCount; index++) {
		// Get specific page
		const page = await pdfData.getPage(index);

		// Get viewport data
		const viewport = page.getViewport({ scale: viewportScale });

		// Create canvas
		const canvasFactory = new NodeCanvasFactory();
		const canvasAndContext = canvasFactory.create(
			viewport.width,
			viewport.height
		);

		const renderContext = {
			canvasContext: canvasAndContext.context,
			viewport,
			canvasFactory,
		};

		// Render page on canvas
		const renderTask = page.render(renderContext);
		await renderTask.promise;

		// Convert canvas to buffer
		const image = canvasAndContext.canvas.toBuffer("image/jpeg");

		// Write file to temp directory
		fs.writeFileSync(`${tempDir}/img-temp-${index}.jpeg`, image);
	}
}

module.exports = generateImageFromPdf;
