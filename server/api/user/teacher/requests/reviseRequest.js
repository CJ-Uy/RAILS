import prisma from "~/server/db/prisma";

export default defineEventHandler(async (event) => {
    const data = await readBody(event);

    await prisma.laboratoryRequests.update({
        where: {
            id: data.id,
        },
        data: {
            equipmentRequestsTeacherApproval:
                data.equipmentRequestsAnnotation !== ""
                    ? "REVISION_NEEDED"
                    : "PENDING",
            reagentRequestsTeacherApproval:
                data.reagentRequestsAnnotation !== ""
                    ? "REVISION_NEEDED"
                    : "PENDING",
            materialRequestsTeacherApproval:
                data.materialRequestsAnnotation !== ""
                    ? "REVISION_NEEDED"
                    : "PENDING",
            laboratoryReservationsTeacherApproval:
                data.laboratoryReservationsAnnotation !== ""
                    ? "REVISION_NEEDED"
                    : "PENDING",
            equipmentRequestsTeacherAnnotation:
                data.equipmentRequestsAnnotation,
            reagentRequestsTeacherAnnotation: data.reagentRequestsAnnotation,
            materialRequestsTeacherAnnotation: data.materialRequestsAnnotation,
            laboratoryReservationsTeacherAnnotation:
                data.laboratoryReservationsAnnotation,
        },
    });
});
