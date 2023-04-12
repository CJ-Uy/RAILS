const fs = require("fs");
const pdf = require("html-pdf");

let html = require("./templates/Form1_HTML.js"); 

pdf.create(html).toFile("./server/scripts/pdfs/outputs/output.pdf", function (err, res) {
	if (err) return console.log(err);
	console.log(res);
});
