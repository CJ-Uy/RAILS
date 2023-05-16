import puppeteer from "puppeteer";

export default async function convertHtmlToPdf(
    htmlContent: string,
    outputPath: string
) {
    const browser = await puppeteer.launch({ headless: "new" });
    const page = await browser.newPage();
    await page.setContent(htmlContent);
    await page.pdf({ path: outputPath, format: "A4" });
    await browser.close();
}
