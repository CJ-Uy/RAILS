import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import dayjs from "dayjs";

const body = {
    user: {
        id: "7b7232aa-510f-4144-8304-66a0a3adf6d8",
        email: "charlesjoshuauy@gmail.com",
        firstName: "Charles Joshua",
        lastName: "Uy",
        role: "ADMIN",
        imageLink:
            "https://lh3.googleusercontent.com/a/AAcHTteh14cXo8b6l1DZAAXppvHRHv3pMwmT1a4qIrH3hxiJeBE=s96-c",
        createdAt: "2023-08-07T05:13:47.132Z",
        updatedAt: "2023-08-09T15:19:50.845Z",
        studentsId: "3294cbb0-895c-4037-92bd-0903d613e2b9",
        teachersId: null,
        adminsId: null,
    },
    formValues: {
        data: {
            basicInfo: {
                campus: "EASTERN VISAYAS CAMPUS",
                schoolYear: [
                    {
                        label: "2023 - 2024",
                        value: "9e54b5d7-f4f5-4053-b8d6-e603e126e3f3",
                    },
                ],
                lastname: "Uy",
                firstname: "Charles Joshua",
                email: "charlesjoshuauy@gmail.com",
                gradeSection: "2d20a721-5fbe-4236-a496-8cbb7f4f9d9a",
                unit: "f97ec96a-853d-4858-8861-eae1de2c8bfa",
                subject: "Research",
                concurrentTopic: "Quantitative and Qualitative Studies",
                teacherInCharge: "041d857e-6d7c-4e43-b6a9-4a75d00f655a",
                numberOfStudents: "1",
                nameOfStudents: [],
            },
            laboratorySetting: {
                hasLaboratoryReservation: "true",
                venue: "fd495ad3-86e6-436a-8c5a-2b33298801c3",
                calendarDatePicker_10: [
                    "2023-08-15T09:45:00.000Z",
                    "2023-08-26T09:45:00.000Z",
                    "2023-09-22T09:45:00.000Z",
                ],
                timeDatePicker_11: [
                    { hours: 15, minutes: 0, seconds: 0 },
                    { hours: 9, minutes: 0, seconds: 0 },
                ],
                allDates: [
                    {
                        requestDates: [
                            "2023-08-15T09:45:00.000Z",
                            "2023-08-26T09:45:00.000Z",
                            "2023-09-22T09:45:00.000Z",
                        ],
                        inclusiveTimeOfUse: [
                            { hours: 15, minutes: 0, seconds: 0 },
                            { hours: 9, minutes: 0, seconds: 0 },
                        ],
                    },
                    {
                        requestDates: [
                            "2023-08-17T09:45:00.000Z",
                            "2023-08-20T09:45:00.000Z",
                            "2023-08-23T09:45:00.000Z",
                        ],
                        inclusiveTimeOfUse: [
                            { hours: 10, minutes: 0, seconds: 0 },
                            { hours: 12, minutes: 0, seconds: 0 },
                        ],
                    },
                ],
                calendarDatePicker_12: [
                    "2023-08-17T09:45:00.000Z",
                    "2023-08-20T09:45:00.000Z",
                    "2023-08-23T09:45:00.000Z",
                ],
                timeDatePicker_13: [
                    { hours: 10, minutes: 0, seconds: 0 },
                    { hours: 12, minutes: 0, seconds: 0 },
                ],
            },
            equipment: {
                details: [
                    {
                        equipmentName: "Autoclave",
                        description: "240 V; w.p. 17.8 psi @ 254 oF",
                        modelNoOrManufacturer:
                            "STME / Market Forge Inddustries Inc.",
                        quantity: 1,
                        requestedQuantity: 1,
                    },
                    {
                        equipmentName: "Biological Microscope w/ camera",
                        description: "220V",
                        modelNoOrManufacturer: "Omni",
                        quantity: 1,
                        requestedQuantity: 1,
                    },
                ],
            },
            reagents: {
                details: [
                    {
                        chemicalName: "Amonia Solution",
                        description: "28%",
                        unit: "mL",
                        currentQuantity: 1800,
                        maxQuantity: 1800,
                        requestedQuantity: "200",
                    },
                    {
                        chemicalName: "Acetic Acid",
                        description: "food grade",
                        unit: "mL",
                        currentQuantity: 900,
                        maxQuantity: 900,
                        requestedQuantity: "150",
                    },
                    {
                        chemicalName: "Acetic Acid",
                        description: "glacial",
                        unit: "mL",
                        currentQuantity: 20,
                        maxQuantity: 20,
                        requestedQuantity: "10",
                    },
                ],
            },
            submission: { download: "false", email: "false" },
        },
    },
};

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
        otherGroupMembers: body.formValues.data.basicInfo.nameOfStudents,
        schoolYearId: controlNumbers.id,
    },
});

// Make Laboratory Reservation Request(s)
if (
    body.formValues.data.laboratorySetting.hasLaboratoryReservation === "true"
) {
    // Update Control Number count
    const updatedControlNumberCounter = await prisma.schoolYear.update({
        where: {
            id: controlNumbers.id,
        },
        data: {
            laboratoryRequestControlNumberCounter:
                controlNumbers.laboratoryRequestControlNumberCounter + 1,
        },
    });

    // Make control number
    const labResControlNumber = `${updatedControlNumberCounter.yearStart}-${
        updatedControlNumberCounter.yearEnd
    }-${updatedControlNumberCounter.laboratoryRequestControlNumberCounter
        .toString()
        .padStart(3, "0")}`;

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
  
}


// Make Reagent Request(s)
if (body.formValues.data.reagents.details.length > 0) {

}


// Extra helper functions
function formatDates(allDates) {
    // Initialize Laboratory Reservation Request
    const formatedDates = [];
    for (const dates of allDates) {
        for (const date of dates.requestDates) {
            const startDatTime = dayjs(date).set({
                hour: dates.inclusiveTimeOfUse[0].hours,
                minute: dates.inclusiveTimeOfUse[0].minutes,
                second: dates.inclusiveTimeOfUse[0].seconds,
            });
            const endDateTime = dayjs(date).set({
                hour: dates.inclusiveTimeOfUse[1].hours,
                minute: dates.inclusiveTimeOfUse[1].minutes,
                second: dates.inclusiveTimeOfUse[1].seconds,
            });
            formatedDates.push({
                startDateTime: startDatTime.format(),
                endDateTime: endDateTime.format(),
            });
        }
    }
    return formatedDates;
}

// for (const range of filteredDates) {
//   console.log(
//       `${dayjs(range.startDateTime).format("MMMM DD, YYYY - HH:MM")} to ${dayjs(
//           range.endDateTime,
//       ).format("MMMM DD, YYYY - HH:MM")}`,
//   );
// }
