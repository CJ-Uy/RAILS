import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const createSchoolYear = await prisma.schoolYear.createMany({
    data: [
        {
            yearStart: 2020,
            yearEnd: 2021,
        },
        {
            yearStart: 2021,
            yearEnd: 2022,
        },
        {
            yearStart: 2022,
            yearEnd: 2023,
        },
        {
            yearStart: 2023,
            yearEnd: 2024,
            currentSchoolYear: true,
        },
    ],
});

console.log(createSchoolYear);
