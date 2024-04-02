export default function downloadPDF(pdfBuffers, lastName) {
    for (const property in pdfBuffers[0]) {
        const buffer = pdfBuffers[0][property].data;
        const url = window.URL.createObjectURL(
            new Blob([new Uint8Array(buffer).buffer]),
        );
        const link = document.createElement("a");
        link.href = url;
        const filename = `${lastName}-${property}-Request.pdf`;

        link.setAttribute("download", filename);
        document.body.appendChild(link);
        link.click();
    }
}
