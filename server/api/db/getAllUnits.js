import { prisma } from "~/server/db/prisma";

export default defineEventHandler(async () => {
    const allUnits = await prisma.Units.findMany();

    const formatedUnits = {};
    for (const { id, name } of allUnits) {
        formatedUnits[id] = name;
    }

    return formatedUnits;
});
