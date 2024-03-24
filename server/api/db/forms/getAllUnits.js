import prisma from "~/server/db/prisma";

export default defineEventHandler(async () => {
    const allUnits = await prisma.units.findMany({
        where: {
            hidden: false,
        },
    });

    const sortedUnits = [];
    for (const { id, name, frequencyRank } of allUnits) {
        sortedUnits[frequencyRank - 1] = [id, name];
    }

    return Object.fromEntries(sortedUnits);
});
