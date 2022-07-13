# Bulk PDF Barcode Reader

This app is create in need for easy and simple way to extract barcodes from .pdf documents. You can extract all types of barcodes from .pdf documents.

Supported symbology
- EAN-13/UPC-A
- UPC-E 
- EAN-8
- Code 128
- Code 93
- Code 39
- Codabar
- Interleaved 2 of 5
- QR Code
- SQ Code

It uses PDF.js for .pdf reading. For barcode decoding it uses Zbar.wasm package.

## How to install

```
npm install bulk-pdf-barcode-reader
or
yarn add bulk-pdf-barcode-reader
```

## Installation troubleshooting

This app is dependent on canvas and zBar.wasm. On some machines like M1 Mac you need to compile canvas. To do so please check this [LINK](https://github.com/Automattic/node-canvas). If you have problem with running zBar check for Node.JS version you are running.

⚠️ I recommend using Node.JS 16 LTS.

## How to use it

```js
const bpbr = require("bulk-pdf-barcode-reader");

async function main() {
    // First input is .pdf file location
    // Second input is viewport scale - bigger the scale = better reading resolution
    const result = await bpbr("./file.pdf", 1.0);
    console.log(result);
}

main();
```

Licence: MIT

## Want to support my work

[BUY ME ☕️](https://www.buymeacoffee.com/tariky)

