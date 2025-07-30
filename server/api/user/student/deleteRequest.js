import prisma from "~/server/db/prisma";

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const { requestId } = body;

    if (!requestId) {
        throw createError({
            statusCode: 400,
            statusMessage: "Request ID is required.",
        });
    }

    try {
        await prisma.laboratoryRequests.delete({
            where: {
                id: requestId,
            },
        });
        return { status: "success", message: "Request deleted successfully." };
    } catch (error) {
        console.error("Error deleting request:", error);
        throw createError({
            statusCode: 500,
            statusMessage: "Failed to delete request.",
        });
    }
});
