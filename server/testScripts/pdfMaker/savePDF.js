const fs = require("fs");
const pdf = require("html-pdf");

let html = require("./templates/CID-20_Accountability.js");

pdf
  .create(html)
  .toFile("./server/scripts/pdfs/outputs/output.pdf", function (err, res) {
    if (err) return console.log(err);
    console.log(res);
  });
