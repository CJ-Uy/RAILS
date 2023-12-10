import dayjs from "dayjs";
import prisma from "~/server/db/prisma";
import convertHtmlToPdf from "~/utils/forms/PDFconverter.js";
import makeLaboratoryReservationForm from "~/utils/forms/makeLaboratoryReservationForm.js";
import makeReagentRequestForm from "~/utils/forms/makeReagentRequestForm.js";
import makeAccountabilityForm from "~/utils/forms/makeAccountabilityForm.js";

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const pdfBuffers = {};
    let pdfBuffer;

    // Make CID 05 - Laboratory Reservation Form
    if (body.requestedForms.includes(5)) {
        pdfBuffer = await convertHtmlToPdf(
            await makeLaboratoryReservationForm(body),
        );
        pdfBuffers.CID05 = pdfBuffer;
    }

    // Make CID 19 - Reagent Request Form
    if (body.requestedForms.includes(19)) {
        pdfBuffer = await convertHtmlToPdf(await makeReagentRequestForm(body));
        pdfBuffers.CID19 = pdfBuffer;
    }

    // Make CID 20 - Accounatbility for Materials and Equipment Request Form
    if (body.requestedForms.includes(20)) {
        pdfBuffer = await convertHtmlToPdf(await makeAccountabilityForm(body));
        pdfBuffers.CID20 = pdfBuffer;
    }

    const requestorDetails = await prisma.laboratoryRequests.findUnique({
        where: {
            id: body.id,
        },
        select: {
            createdAt: true,
            requestor: {
                select: {
                    firstName: true,
                    lastName: true,
                },
            },
        },
    });

    const prefix = `${dayjs(requestorDetails.createdAt).format("MM-DD-YY")}_${
        requestorDetails.requestor.lastName
    },${requestorDetails.requestor.firstName}`;

    return [pdfBuffers, prefix];
});
