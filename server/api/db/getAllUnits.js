import { prisma } from "~/server/db/prisma";

export default defineEventHandler(async () => {
    const allUnits = await prisma.Units.findMany();

    const formatedUnits = [];
    for (const { name } of allUnits) {
        formatedUnits.push(name);
    }

    return formatedUnits;
});
