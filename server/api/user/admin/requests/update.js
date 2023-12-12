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
                        isSignedByAdmin: signedStatus.APPROVED,
                        signedAdminId: body.user,
                    },
                });
            }
            break;
        case "REJECT":
            console.log("REJECT", body);
            break;
        case "DELETE":
            console.log("DELETE", body);
            break;
    }
});
