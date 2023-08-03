import prisma from "~/server/db/prisma";
import dayjs from "dayjs";

export default defineEventHandler(async () => {
    return await prisma.users.findMany();
});
