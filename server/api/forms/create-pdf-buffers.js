import convertHtmlToPdf from "../../app/forms/PDFconverter.js";
import makeLaboratoryReservationForm from "../../app/forms/makeLaboratoryReservationForm.js";
import makeAccountabilityForm from "../../app/forms/makeAccountabilityForm.js";

export default defineEventHandler(async (event) => {
    const body = await readBody(event);

    let pdfBuffers = {};
    let pdfBuffer;

    // Make CID 19
    if (body.requestData.laboratorySetting.hasLaboratoryReservation == "false") {
        pdfBuffer = await convertHtmlToPdf(makeLaboratoryReservationForm(body));
        console.log("CREATED CID19.pdf at assets/pdftests/CID19.pdf");
        pdfBuffers["CID19"] = pdfBuffer;
    }

    // Make CID 20
    pdfBuffer = await convertHtmlToPdf(makeAccountabilityForm(body));
    pdfBuffers["CID20"] = pdfBuffer;
    console.log("CREATED CID20.pdf at assets/pdftests/CID20.pdf");

    return pdfBuffers;
});
