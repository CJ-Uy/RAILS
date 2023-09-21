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
        case "materialEquipmentRequest":
            updatedControlNumberCounter = await prisma.schoolYear.update({
                where: {
                    id: controlNumbers.id,
                },
                data: {
                    materialEquipmentRequestControlNumberCounter:
                        controlNumbers.materialEquipmentRequestControlNumberCounter +
                        1,
                },
            });
            counter =
                updatedControlNumberCounter.materialEquipmentRequestControlNumberCounter;
            break;
        default:
            return "Control Number Error";
    }

    return `${controlNumbers.yearStart}-${controlNumbers.yearEnd}-${counter
        .toString()
        .padStart(3, "0")}`;
}