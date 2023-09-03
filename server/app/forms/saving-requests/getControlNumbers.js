import prisma from "../../../db/prisma.js";

export default async function getControlNumbers(form, controlNumbers) {
    // form = laboratoryReservation, equipmentRequest, reagentRequest
    let updatedControlNumberCounter;
    let counter;
    switch (form) {
        case "laboratoryReservation":
            updatedControlNumberCounter = await prisma.schoolYear.update({
                where: {
                    id: controlNumbers.id,
                },
                data: {
                    laboratoryRequestControlNumberCounter:
                        controlNumbers.laboratoryRequestControlNumberCounter +
                        1,
                },
            });
            counter =
                updatedControlNumberCounter.laboratoryRequestControlNumberCounter;
            break;
        case "equipmentRequest":
            updatedControlNumberCounter = await prisma.schoolYear.update({
                where: {
                    id: controlNumbers.id,
                },
                data: {
                    equipmentRequestControlNumberCounter:
                        controlNumbers.equipmentRequestControlNumberCounter + 1,
                },
            });
            counter =
                updatedControlNumberCounter.equipmentRequestControlNumberCounter;
            break;
        case "reagentRequest":
            updatedControlNumberCounter = await prisma.schoolYear.update({
                where: {
                    id: controlNumbers.id,
                },
                data: {
                    reagentRequestControlNumberCounter:
                        controlNumbers.reagentRequestControlNumberCounter + 1,
                },
            });
            counter =
                updatedControlNumberCounter.reagentRequestControlNumberCounter;
            break;
        case "materialsRequest":
            updatedControlNumberCounter = await prisma.schoolYear.update({
                where: {
                    id: controlNumbers.id,
                },
                data: {
                    materialsRequestControlNumberCounter:
                        controlNumbers.materialsRequestControlNumberCounter + 1,
                },
            });
            counter =
                updatedControlNumberCounter.materialsRequestControlNumberCounter;
            break;
        default:
            return "Control Number Error";
    }

    return `${controlNumbers.yearStart}-${controlNumbers.yearEnd}-${counter
        .toString()
        .padStart(3, "0")}`;
}