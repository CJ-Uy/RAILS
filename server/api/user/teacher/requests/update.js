import prisma from "~/server/db/prisma";
import signedStatus from "~/server/db/signedStatus";

export default defineEventHandler(async (event) => {
    const body = await readBody(event);

    switch (body.action) {
        case "APPROVE":
            for (const request of body.items) {
                await prisma.laboratoryRequests.update({
                    where: {
                        id: request,
                    },
                    data: {
                        equipmentRequestsTeacherApproval: signedStatus.APPROVED,
                        materialRequestsTeacherApproval: signedStatus.APPROVED,
                        reagentRequestsTeacherApproval: signedStatus.APPROVED,
                        laboratoryReservationsTeacherApproval:
                            signedStatus.APPROVED,
                    },
                });
            }
            break;
        case "REJECT":
            for (const request of body.items) {
                await prisma.laboratoryRequests.update({
                    where: {
                        id: request,
                    },
                    data: {
                        equipmentRequestsTeacherApproval: signedStatus.REJECTED,
                        materialRequestsTeacherApproval: signedStatus.REJECTED,
                        reagentRequestsTeacherApproval: signedStatus.REJECTED,
                        laboratoryReservationsTeacherApproval:
                            signedStatus.REJECTED,
                    },
                });
            }
            break;
        case "PENDING":
            for (const request of body.items) {
                await prisma.laboratoryRequests.update({
                    where: {
                        id: request,
                    },
                    data: {
                        isSignedByAdmin: signedStatus.PENDING,
                        signedAdminId: null,
                    },
                });
            }
            break;
    }
});
