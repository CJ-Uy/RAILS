import prisma from "~/server/db/prisma";

export default defineEventHandler(async (event) => {
    const data = await readBody(event);
    if (
        data.equipmentRequestsAnnotation === "" &&
        data.materialRequestsAnnotation === "" &&
        data.reagentRequestsAnnotation === "" &&
        data.laboratoryReservationsAnnotation === ""
    ) {
        await prisma.laboratoryRequests.update({
            where: {
                id: data.id,
            },
            data: {
                completeStatus: "CLEARED",
            },
        });
    } else {
        await prisma.laboratoryRequests.update({
            where: {
                id: data.id,
            },
            data: {
                completeStatus: "NOT_CLEARED",
                equipmentRequestsAdminAnnotation:
                    data.equipmentRequestsAnnotation,
                materialRequestsAdminAnnotation:
                    data.materialRequestsAnnotation,
                reagentRequestsAdminAnnotation: data.reagentRequestsAnnotation,
                laboratoryReservationsAdminAnnotation:
                    data.laboratoryReservationsAnnotation,
            },
        });
    }
});
