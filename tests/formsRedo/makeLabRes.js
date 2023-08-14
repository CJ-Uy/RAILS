import puppeteer from "puppeteer";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { writeFileSync } from "fs";

async function convertHtmlToPDF(htmlContent, filePath) {
    const browser = await puppeteer.launch({ headless: "new" });
    const page = await browser.newPage();
    await page.setContent(htmlContent);
    const pdfBuffer = await page.pdf({ format: "A4" });
    await browser.close();

    // Save the PDF buffer to a file
    const currentDir = fileURLToPath(new URL(".", import.meta.url));
    writeFileSync(path.resolve(currentDir, filePath), pdfBuffer);
}

let html = ` <!doctype html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Document</title>
        <style>
            #table {
                width: 500px;
                border: 2px solid black;
            }
        </style>
    </head>
    <body>
        <div id="table"></div>
    </body>
    <script>
        let data = [
            {
                label: "Name",
                value: "John DDDDDDoe",
                minWidth: 200,
            },
            {
                label: "Description",
                value: "Your description goes here",
                minWidth: 200,
            },
            {
                label: "Something",
                value: "a",
                minWidth: 200,
            },
        ];

        // Create flex container
        let container = document.getElementById("table");
        container.style.display = "flex";
        container.style.flexWrap = "wrap";

        // Iterate over data to create flex items
        for (let i = 0; i < data.length; i++) {
            // Create label item
            let labelItem = document.createElement("div");
            labelItem.textContent = data[i].label + ":";
            labelItem.style.marginRight = "5px"
            container.appendChild(labelItem);

            // Create value item
            let valueItem = document.createElement("div");
            valueItem.textContent = data[i].value;
            valueItem.style.borderBottom = "1px solid black";
            container.appendChild(valueItem);

            // Space
            let spaceItem = document.createElement("div");
            spaceItem.style.borderBottom = "1px solid black";
            spaceItem.style.marginRight = "15px"

            let difference =
                data[i].minWidth -
                labelItem.offsetWidth -
                valueItem.offsetWidth;
            let offsetWidth = difference < 0 ? 0 : difference;

            spaceItem.style.minWidth = offsetWidth + "px";
            console.log(offsetWidth)
            container.appendChild(spaceItem);
        }
    </script>
</html>
`;

// ---- END ----- //

console.log("STARTED");
await convertHtmlToPDF(html, "./sample.pdf");
console.log("DONE");