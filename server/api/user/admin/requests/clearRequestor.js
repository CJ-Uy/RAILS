import prisma from "~/server/db/prisma";

export default defineEventHandler(async (event) => {
    const data = await readBody(event);
    await prisma.laboratoryRequests.update({
        where: {
            id: data.id,
        },
        data: {
            completeStatus: "CLEARED",
        },
    });
});
