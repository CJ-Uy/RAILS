import dayjs from "dayjs";
import getRequest from "~/utils/forms/getRequest.js";
import makeLaboratoryReservationForm from "~/utils/forms/makeLaboratoryReservationForm.js";
import makeReagentRequestForm from "~/utils/forms/makeReagentRequestForm.js";
import makeAccountabilityForm from "~/utils/forms/makeAccountabilityForm.js";
import convertHtmlToPdf from "~/utils/forms/PDFconverter.js";

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const id = body.id;
    const request = await getRequest(body.id);

    const pdfBuffers = {};
    let pdfBuffer;

    // Make CID 05 - Laboratory Reservation Form
    if (request.laboratoryReservations.length > 0) {
        pdfBuffer = await convertHtmlToPdf(
            await makeLaboratoryReservationForm(id),
        );
        pdfBuffers.CID05 = pdfBuffer;
    }

    // Make CID 19 - Reagent Request Form
    if (request.reagentsRequested.length > 0) {
        pdfBuffer = await convertHtmlToPdf(await makeReagentRequestForm(id));
        pdfBuffers.CID19 = pdfBuffer;
    }

    // Make CID 20 - Accountability for Materials and Equipment Request Form
    if (
        request.materialsRequested.length > 0 ||
        request.equipmentRequested.length > 0
    ) {
        pdfBuffer = await convertHtmlToPdf(await makeAccountabilityForm(id));
        pdfBuffers.CID20 = pdfBuffer;
    }

    const prefix = `${dayjs(request.createdAt).format("MM-DD-YY")}_${
        request.requestor.lastName
    },${request.requestor.firstName}`;

    return [pdfBuffers, prefix];
});
