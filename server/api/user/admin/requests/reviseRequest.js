import prisma from "~/server/db/prisma";

export default defineEventHandler(async (event) => {
    const data = await readBody(event);

    await prisma.laboratoryRequests.update({
        where: {
            id: data.id,
        },
        data: {
            equipmentRequestsTeacherApproval: "PENDING",
            reagentRequestsTeacherApproval: "PENDING",
            materialRequestsTeacherApproval: "PENDING",
            laboratoryReservationsTeacherApproval: "PENDING",
            equipmentRequestsAdminApproval:
                data.equipmentRequestsAnnotation !== ""
                    ? "REVISION_NEEDED"
                    : "PENDING",
            reagentRequestsAdminApproval:
                data.reagentRequestsAnnotation !== ""
                    ? "REVISION_NEEDED"
                    : "PENDING",
            materialRequestsAdminApproval:
                data.materialRequestsAnnotation !== ""
                    ? "REVISION_NEEDED"
                    : "PENDING",
            laboratoryReservationsAdminApproval:
                data.laboratoryReservationsAnnotation !== ""
                    ? "REVISION_NEEDED"
                    : "PENDING",
            equipmentRequestsAdminAnnotation: data.equipmentRequestsAnnotation,
            reagentRequestsAdminAnnotation: data.reagentRequestsAnnotation,
            materialRequestsAdminAnnotation: data.materialRequestsAnnotation,
            laboratoryReservationsAdminAnnotation:
                data.laboratoryReservationsAnnotation,
        },
    });
});
