import puppeteer from "puppeteer";

export default async function convertHtmlToPdf(htmlContent) {
    const browser = await puppeteer.launch({
        headless: "new",
        // These args are still required for the Docker environment
        args: [
            "--no-sandbox",
            "--disable-setuid-sandbox",
            "--disable-dev-shm-usage",
        ],
    });
    const page = await browser.newPage();
    await page.setContent(htmlContent);
    const pdfBuffer = await page.pdf({ format: "A4" });
    await browser.close();
    return pdfBuffer;
}
