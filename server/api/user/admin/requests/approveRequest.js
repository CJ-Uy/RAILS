import prisma from "~/server/db/prisma";

export default defineEventHandler(async (event) => {
    const data = await readBody(event);

    await prisma.laboratoryRequests.update({
        where: {
            id: data.id,
        },
        data: {
            equipmentRequestsAdminApproval: "APPROVED",
            reagentRequestsAdminApproval: "APPROVED",
            materialRequestsAdminApproval: "APPROVED",
            laboratoryReservationsAdminApproval: "APPROVED",
            equipmentRequestsAdminApproverId: data.approverId,
            reagentRequestsAdminApproverId: data.approverId,
            materialRequestsAdminApproverId: data.approverId,
            laboratoryReservationsAdminApproverId: data.approverId,
        },
    });
});
