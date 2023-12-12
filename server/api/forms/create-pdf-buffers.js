import dayjs from "dayjs";
import getRequest from "~/utils/forms/getRequest.js";
import makeLaboratoryReservationForm from "~/utils/forms/makeLaboratoryReservationForm.js";
import makeReagentRequestForm from "~/utils/forms/makeReagentRequestForm.js";
import makeAccountabilityForm from "~/utils/forms/makeAccountabilityForm.js";
import convertHtmlToPdf from "~/utils/forms/PDFconverter.js";

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const request = await getRequest(body);

    const pdfBuffers = {};
    let pdfBuffer;

    // Make CID 05 - Laboratory Reservation Form
    if (request.laboratoryReservations.length > 0) {
        pdfBuffer = await convertHtmlToPdf(
            await makeLaboratoryReservationForm(body),
        );
        pdfBuffers.CID05 = pdfBuffer;
    }

    // Make CID 19 - Reagent Request Form
    if (request.equipmentRequested.length > 0) {
        pdfBuffer = await convertHtmlToPdf(await makeReagentRequestForm(body));
        pdfBuffers.CID19 = pdfBuffer;
    }

    // Make CID 20 - Accounatbility for Materials and Equipment Request Form
    if (
        request.materialsRequested.length > 0 ||
        request.equipmentRequested.length > 0
    ) {
        pdfBuffer = await convertHtmlToPdf(await makeAccountabilityForm(body));
        pdfBuffers.CID20 = pdfBuffer;
    }

    const prefix = `${dayjs(request.createdAt).format("MM-DD-YY")}_${
        request.requestor.lastName
    },${request.requestor.firstName}`;

    return [pdfBuffers, prefix];
});
