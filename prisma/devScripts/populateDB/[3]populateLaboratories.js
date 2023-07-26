import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const laboratoryLocations = await prisma.laboratoryLocations.createMany({
    data: [
        { name: "1st floor CReST" },
        { name: "2nd floor CReST" },
        { name: "3rd floor CReST" },
        { name: "1st Floor ACA 1 Building" },
        { name: "2nd Floor ACA 1 Building" },
        { name: "3rd Floor ACA 1 Building" },
        { name: "1st Floor ACA 2 Building" },
        { name: "2nd Floor ACA 2 Building" },
        { name: "3rd Floor ACA 2 Building" },
        { name: "1st Floor ACA 3 Building" },
        { name: "2nd Floor ACA 3 Building" },
        { name: "3rd Floor ACA 3 Building" },
    ],
    skipDuplicates: true,
});

async function getLaboratoryLocationId(name) {
    return (
        await prisma.laboratoryLocations.findFirst({
            where: {
                // eslint-disable-next-line object-shorthand
                name: name,
            },
        })
    ).id;
}

const laboratories = await prisma.laboratories.createMany({
    data: [
        {
            name: "CReST - Research Laboratory",
            locationId: await getLaboratoryLocationId("3rd floor CReST"),
        },
        {
            name: "CReST - Biology Laboratory",
            locationId: await getLaboratoryLocationId("3rd floor CReST"),
        },
        {
            name: "CReST - ADTech Laboratory",
            locationId: await getLaboratoryLocationId("2nd floor CReST"),
        },
        {
            name: "ACA 2 - Chemistry Laboratory",
            locationId: await getLaboratoryLocationId(
                "3rd Floor ACA 2 Building",
            ),
        },
        {
            name: "ACA 2 - Research Laboratory",
            locationId: await getLaboratoryLocationId(
                "2nd Floor ACA 2 Building",
            ),
        },
        {
            name: "ACA 2 - Biology Laboratory",
            locationId: await getLaboratoryLocationId(
                "2nd Floor ACA 2 Building",
            ),
        },
        {
            name: "ACA 2 - Physics Laboratory",
            locationId: await getLaboratoryLocationId(
                "2nd Floor ACA 2 Building",
            ),
        },
        {
            name: "ACA 3 - Robotics Laboratory",
            locationId: await getLaboratoryLocationId(
                "3rd Floor ACA 3 Building",
            ),
        },
    ],
    skipDuplicates: true,
});

console.log(laboratoryLocations);
console.log(laboratories);
