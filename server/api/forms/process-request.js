import convertHtmlToPdf from "../../app/forms/PDFconverter.js";
import makeLaboratoryReservationForm from "../../app/forms/makeLaboratoryReservationForm.js";
import makeAccountabilityForm from "../../app/forms/makeAccountabilityForm.js";

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    console.log("BODY: ", body);
    if (body.requestData.laboratorySetting.hasLaboratoryReservation == "false") {
        convertHtmlToPdf(
            makeLaboratoryReservationForm(body),
            "assets/pdftests/CID19.pdf"
        );
        console.log("CREATED CID19.pdf at assets/pdftests/CID19.pdf");
    }
    convertHtmlToPdf(makeAccountabilityForm(body), "assets/pdftests/CID20.pdf");
    console.log("CREATED CID20.pdf at assets/pdftests/CID20.pdf");
    return "Completed";
});
