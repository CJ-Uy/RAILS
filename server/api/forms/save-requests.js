import prisma from "~/server/db/prisma";
import dayjs from "dayjs";

export default defineEventHandler(async (event) => {
    // Extra helper functions
    function formatDates(allDates) {
        // Initialize Laboratory Reservation Request
        const formatedDates = [];
        for (const dates of allDates) {
            for (const date of dates.requestDates) {
                // TODO: Fix this
                const startDatTime = dayjs(date)
                    .set("hour", dates.inclusiveTimeOfUse[0].hours)
                    .set("minute", dates.inclusiveTimeOfUse[0].minutes);
                const endDateTime = dayjs(date)
                    .set("hour", dates.inclusiveTimeOfUse[1].hours)
                    .set("minute", dates.inclusiveTimeOfUse[1].minutes);
                formatedDates.push({
                    startDateTime: startDatTime.format(),
                    endDateTime: endDateTime.format(),
                });
            }
        }
        return formatedDates;
    }

    async function getControlNumbers(form) {
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
                            controlNumbers.equipmentRequestControlNumberCounter +
                            1,
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
                            controlNumbers.reagentRequestControlNumberCounter +
                            1,
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
                            controlNumbers.materialsRequestControlNumberCounter +
                            1,
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

    const body = await readBody(event);
    // Initialize Base Request
    const controlNumbers = await prisma.schoolYear.findFirst({
        where: {
            currentSchoolYear: true,
        },
    });

    // Make base request
    const request = await prisma.laboratoryRequests.create({
        data: {
            requestorId: body.user.id,
            forSubject: body.formValues.data.basicInfo.subject,
            concurrentTopic: body.formValues.data.basicInfo.concurrentTopic,
            gradeSectionId: body.formValues.data.basicInfo.gradeSection,
            unitId: body.formValues.data.basicInfo.unit,
            teacherInChargeId: body.formValues.data.basicInfo.teacherInCharge,
            noOfStudents: parseInt(
                body.formValues.data.basicInfo.numberOfStudents,
            ),
            otherGroupMembers: body.formValues.data.basicInfo.nameOfStudents,
            schoolYearId: controlNumbers.id,
        },
    });

    // Make Laboratory Reservation Request(s)
    if (
        body.formValues.data.laboratorySetting.hasLaboratoryReservation ===
        "false" // Id they DONT have a reservation make one
    ) {
        // Make control number
        const labResControlNumber = await getControlNumbers(
            "laboratoryReservation",
        );

        // Format dates
        const formatedDates = formatDates(
            body.formValues.data.laboratorySetting.allDates,
        );

        // Create a Laboratory Reservation Request and connect to the Base Laboratory Request
        for (const date of formatedDates) {
            await prisma.laboratoryReservations.create({
                data: {
                    controlNumber: labResControlNumber,
                    startTime: date.startDateTime,
                    endTime: date.endDateTime,
                    laboratoryId: body.formValues.data.laboratorySetting.venue,
                    laboratoryRequestId: request.id,
                },
            });
        }
    }

    // Make Equipment Request(s)
    if (body.formValues.data.equipment.details.length > 0) {
        const requestedEquipment = body.formValues.data.equipment.details;
        const controlNumber = await getControlNumbers("equipmentRequest");

        for (const equipment of requestedEquipment) {
            await prisma.equipmentRequests.create({
                data: {
                    quantity: Number(equipment.requestedQuantity),
                    name: equipment.equipmentName,
                    description: equipment.description,
                    modelNoOrManufacturer: equipment.modelNoOrManufacturer,
                    laboratoryRequestsId: request.id,
                    schoolYearId: controlNumbers.id,
                    controlNumber: controlNumber,
                    equipment: {
                        connect: equipment.ids.map((id) => ({ id })),
                    },
                },
            });
        }
    }

    // Make Reagent Request(s)
    if (body.formValues.data.reagents.details.length > 0) {
        const requestedReagents = body.formValues.data.reagents.details;
        const controlNumber = await getControlNumbers("reagentRequest");

        for (const reagent of requestedReagents) {
            await prisma.reagentRequests.create({
                data: {
                    quantity: Number(reagent.requestedQuantity),
                    name: reagent.chemicalName,
                    description: reagent.description,
                    unit: reagent.unit,
                    laboratoryRequestsId: request.id,
                    schoolYearId: controlNumbers.id,
                    controlNumber: controlNumber,
                    reagents: {
                        connect: reagent.ids.map((id) => ({ id })),
                    },
                },
            });
        }
    }

    // TODO: Make materials request too after clarifying

    return "SAVED";
});
