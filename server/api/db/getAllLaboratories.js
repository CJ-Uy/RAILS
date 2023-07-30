import prisma from "~/server/db/prisma";

export default defineEventHandler(async () => {
    const allLaboratories = await prisma.laboratories.findMany();

    const formattedLaboratories = {};
    for (const { id, name } of allLaboratories) {
        formattedLaboratories[id] = name;
    }

    const sortedLaboratories = [];
    for (const id in formattedLaboratories) {
        sortedLaboratories.push([id, formattedLaboratories[id]]);
    }
    sortedLaboratories.sort((a, b) => {
        return a[1].localeCompare(b[1]);
    });

    return Object.fromEntries(sortedLaboratories);
});
