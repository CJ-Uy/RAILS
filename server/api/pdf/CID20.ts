import convertHtmlToPdf from "../../app/forms/pdfConverter";

const html = `<html>
  <head>
    <title>HTML to PDF Conversion</title>
    <style>
      body {
        font-family: Arial, sans-serif;
      }
    </style>
  </head>
  <body>
    <h1>Example HTML to PDF Conversion</h1>
    <p>This is the content of the PDF.</p>
  </body>
</html>`;

const outputPath = "./server/filledForms/examples.pdf";

convertHtmlToPdf(html, outputPath)
    .then(() => console.log("PDF generated successfully"))
    .catch((error: any) => console.error("Error generating PDF:", error));
