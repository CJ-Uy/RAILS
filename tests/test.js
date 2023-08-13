import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const controlNumbers = await prisma.schoolYear.findFirst({
    where: {
        currentSchoolYear: true,
    },
});

const updatedControlNumberCounter = await prisma.schoolYear.update({
    where: {
        id: controlNumbers.id,
    },
    data: {
        laboratoryRequestControlNumberCounter: (controlNumbers.laboratoryRequestControlNumberCounter + 1),
    },
});


const controlNumber = `${updatedControlNumberCounter.yearStart}-${
    updatedControlNumberCounter.yearEnd
}-${updatedControlNumberCounter.laboratoryRequestControlNumberCounter
    .toString()
    .padStart(3, "0")}`;

console.log(controlNumber);