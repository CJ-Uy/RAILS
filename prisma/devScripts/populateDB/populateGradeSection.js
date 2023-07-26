import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const createGradeSection = await prisma.gradeSection.createMany({
    data: [
        // Grade 7
        { grade: 7, section: "Diamond" },
        { grade: 7, section: "Emerald" },
        { grade: 7, section: "Ruby" },
        // Grade 8
        { grade: 8, section: "Camia" },
        { grade: 8, section: "Jasmine" },
        { grade: 8, section: "Sampaguita" },
        // Grade 9
        { grade: 9, section: "Potassium" },
        { grade: 9, section: "Rubidium" },
        { grade: 9, section: "Sodium" },
        // Grade 10
        { grade: 10, section: "Electron" },
        { grade: 10, section: "Neutron" },
        { grade: 10, section: "Proton" },
        // Grade 11
        { grade: 11, section: "A" },
        { grade: 11, section: "B" },
        { grade: 11, section: "C" },
        // Grade 12
        { grade: 12, section: "A" },
        { grade: 12, section: "B" },
        { grade: 12, section: "C" },
    ],
    skipDuplicates: true,
});

console.log(createGradeSection);
