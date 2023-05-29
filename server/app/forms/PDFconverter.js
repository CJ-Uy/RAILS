import puppeteer from "puppeteer";

export default async function convertHtmlToPdf(htmlContent, outputPath) {
    const browser = await puppeteer.launch({ headless: "new" });
    const page = await browser.newPage();
    await page.setContent(htmlContent);
    await page.pdf({ path: outputPath, format: "A4" });
    await browser.close();
}

// ChatGPT generated answer (test later)
// export default async function convertHtmlToPdf(htmlContent, outputPath) {
//   const browser = await puppeteer.launch({ headless: true });
//   const page = await browser.newPage();

//   // Inject CSS styles to add page numbers
//   await page.addStyleTag({
//     content: `
//       @page {
//         @bottom-right {
//           content: counter(page) "/" counter(pages);
//         }
//       }

//       body {
//         counter-reset: page;
//       }

//       .page {
//         page-break-after: always;
//       }

//       .page::after {
//         counter-increment: page;
//         content: counter(page);
//         display: none;
//       }
//     `
//   });

//   await page.setContent(htmlContent);

//   // Wait for the page to finish rendering
//   await page.waitForSelector('.page');

//   // Get the total number of pages
//   const totalPages = await page.$$eval('.page', pages => pages.length);

//   // Set the total number of pages in the counter
//   await page.evaluate(totalPages => {
//     const pageElements = document.querySelectorAll('.page');
//     pageElements.forEach((element, index) => {
//       element.style.counterSet = `page ${index + 1}/${totalPages}`;
//       element.style.display = 'block';
//     });
//   }, totalPages);

//   // Generate the PDF
//   await page.pdf({ path: outputPath, format: "A4" });

//   await browser.close();
// }
