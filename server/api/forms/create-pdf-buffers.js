import prisma from "~/server/db/prisma";
import convertHtmlToPdf from "../../app/forms/PDFconverter.js";
import makeLaboratoryReservationForm from "../../app/forms/makeLaboratoryReservationForm.js";
import makeAccountabilityForm from "../../app/forms/makeAccountabilityForm.js";

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const requestDetails = await prisma.laboratoryRequests.findUnique({
        where: {
            id: body.id,
        },
        include: {
            requestor: true,
            gradeSection: true,
            unit: true,
            teacherInCharge: true,

            materialsRequested: true,
            equipmentRequested: true,
            reagentsRequested: true,
            laboratoryReservations: true,
            
            signedTeacher: true,
            signedAdmin: true;

            schoolYear: true,
        },
    });

    console.log(requestDetails);

    return "TEST";

    // const pdfBuffers = {};
    // let pdfBuffer;

    // // Make CID 19
    // if (
    //     body.requestData.laboratorySetting.hasLaboratoryReservation === "false"
    // ) {
    //     pdfBuffer = await convertHtmlToPdf(
    //         await makeLaboratoryReservationForm(body),
    //     );
    //     console.log("CREATED CID19.pdf at assets/pdftests/CID19.pdf");
    //     pdfBuffers.CID19 = pdfBuffer;
    // }

    // // Make CID 20
    // pdfBuffer = await convertHtmlToPdf(
    //     String(await makeAccountabilityForm(body)),
    // );
    // pdfBuffers.CID20 = pdfBuffer;
    // console.log("CREATED CID20.pdf at assets/pdftests/CID20.pdf");

    // return pdfBuffers;
});
