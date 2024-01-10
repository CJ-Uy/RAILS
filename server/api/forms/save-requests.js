import dayjs from "dayjs";
import getControlNumbers from "~/utils/forms/saving-requests/getControlNumbers.js";
import prisma from "~/server/db/prisma";

export default defineEventHandler(async (event) => {
    const body = await readBody(event);

    // Initialize Base Request
    const schoolYear = await prisma.schoolYear.findFirst({
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
            schoolYearId: schoolYear.id,
        },
    });

    // Make Laboratory Reservation Request(s)
    if (
        body.formValues.data.laboratorySetting.hasLaboratoryReservation ===
        "false" // They DONT have a reservation make one
    ) {
        // Format dates
        const formattedDates = { startDate: [], endDate: [] };
        for (const reservation of body.formValues.data.laboratorySetting
            .allDates) {
            if (reservation.ranged) {
                formattedDates.startDate.push(
                    dayjs(reservation.requestDates[0]).format("YYYY-MM-DD"),
                );
                formattedDates.endDate.push(
                    dayjs(reservation.requestDates[1]).format("YYYY-MM-DD"),
                );
            } else {
                for (const requestDate of reservation.requestDates) {
                    formattedDates.startDate.push(
                        dayjs(requestDate).format("YYYY-MM-DD"),
                    );
                    formattedDates.endDate.push(
                        dayjs(requestDate).format("YYYY-MM-DD"),
                    );
                }
            }
            formattedDates.startTime = dayjs()
                .set("hour", reservation.startTime.hours)
                .set("minute", reservation.startTime.minutes)
                .format("HH:mm");
            formattedDates.endTime = dayjs()
                .set("hour", reservation.endTime.hours)
                .set("minute", reservation.endTime.minutes)
                .format("HH:mm");
        }

        // Create a Laboratory Reservation Request and connect to the Base Laboratory Request
        // Make control number
        const labResControlNumber = await getControlNumbers(
            "laboratoryReservation",
            schoolYear,
        );

        // Save Reservation
        await prisma.laboratoryReservations.create({
            data: {
                controlNumber: labResControlNumber,
                laboratoryId: body.formValues.data.laboratorySetting.venue,
                laboratoryRequestId: request.id,
                dates: {
                    startDate: formattedDates.startDate,
                    endDate: formattedDates.endDate,
                },
                time: {
                    startTime: formattedDates.startTime,
                    endTime: formattedDates.endTime,
                },
            },
        });
    } else {
        // If they already have a laboratory reservation, save the date time independently for forms
        const timeJSON = {};
        for (const timeOfUse of body.formValues.data.laboratorySetting
            .allDates) {
            const formatedDates = [];
            for (const index in timeOfUse.requestDates) {
                formatedDates[index] = dayjs(
                    timeOfUse.requestDates[index],
                ).format("MMMM DD, YYYY");
            }

            timeJSON[
                `${String(timeOfUse.inclusiveTimeOfUse[0].hours).padStart(
                    2,
                    "0",
                )}:${String(timeOfUse.inclusiveTimeOfUse[0].minutes).padStart(
                    2,
                    "0",
                )}-${String(timeOfUse.inclusiveTimeOfUse[1].hours).padStart(
                    2,
                    "0",
                )}:${String(timeOfUse.inclusiveTimeOfUse[0].minutes).padStart(
                    2,
                    "0",
                )}`
            ] = formatedDates;
        }

        let location;
        // Save Location Independently
        if (
            body.formValues.data.laboratorySetting.hasLaboratoryReservation ===
            "true"
        ) {
            // They already have a reservation
            const findLocation = await prisma.laboratories.findUnique({
                where: {
                    id: body.formValues.data.laboratorySetting.venue,
                },
                select: {
                    name: true,
                },
            });
            location = findLocation.name;
        } else if (
            body.formValues.data.laboratorySetting.hasLaboratoryReservation ===
            "custom"
        ) {
            // They have a custom location
            location = body.formValues.data.laboratorySetting.customLocation;
        }

        // Update the request
        await prisma.laboratoryRequests.update({
            where: {
                id: request.id,
            },
            data: {
                independentTime: timeJSON,
                independentLocation: location,
            },
        });
    }

    // Control Numbers for Materials Equipment Requests
    let materialEquipmentControlNumber;
    if (
        body.formValues.data.materials.details.length > 0 ||
        body.formValues.data.equipment.details.length > 0
    ) {
        materialEquipmentControlNumber = await getControlNumbers(
            "materialEquipmentRequest",
            schoolYear,
        );
    }

    if (body.formValues.data.materials.details.length > 0) {
        // Make Materials Requests(s)
        const requestedMaterials = body.formValues.data.materials.details;

        for (const material of requestedMaterials) {
            await prisma.materialRequests.create({
                data: {
                    quantity: Number(material.requestedQuantity),
                    name: material.itemName,
                    description: material.description,
                    schoolYearId: schoolYear.id,
                    controlNumber: materialEquipmentControlNumber,
                    materials: {
                        connect: { id: material.id },
                    },
                    laboratoryRequestId: request.id,
                },
            });
        }
    }

    // Make Equipment Request(s)
    if (body.formValues.data.equipment.details.length > 0) {
        const requestedEquipment = body.formValues.data.equipment.details;

        for (const equipment of requestedEquipment) {
            await prisma.equipmentRequests.create({
                data: {
                    quantity: Number(equipment.requestedQuantity),
                    name: equipment.equipmentName,
                    description: equipment.description,
                    modelNoOrManufacturer: equipment.modelNoOrManufacturer,
                    schoolYearId: schoolYear.id,
                    controlNumber: materialEquipmentControlNumber,
                    equipment: {
                        connect: equipment.ids.map((id) => ({ id })),
                    },
                    laboratoryRequestId: request.id,
                },
            });
        }
    }

    // Make Reagent Request(s)
    if (body.formValues.data.reagents.details.length > 0) {
        const requestedReagents = body.formValues.data.reagents.details;
        const controlNumber = await getControlNumbers(
            "reagentRequest",
            schoolYear,
        );

        for (const reagent of requestedReagents) {
            await prisma.reagentRequests.create({
                data: {
                    quantity: Number(reagent.requestedQuantity),
                    name: reagent.chemicalName,
                    description: reagent.description,
                    unit: reagent.unit,
                    schoolYearId: schoolYear.id,
                    controlNumber,
                    reagents: {
                        connect: [reagent.id].map((id) => ({ id })),
                    },
                    laboratoryRequestId: request.id,
                },
            });
        }
    }

    return request.id;
});
