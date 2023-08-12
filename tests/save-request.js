import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import dayjs from "dayjs";

const body = {
    user: {
    id: '7b7232aa-510f-4144-8304-66a0a3adf6d8',
    email: 'charlesjoshuauy@gmail.com',
    firstName: 'Charles Joshua',
    lastName: 'Uy',
    role: 'ADMIN',
    imageLink: 'https://lh3.googleusercontent.com/a/AAcHTteh14cXo8b6l1DZAAXppvHRHv3pMwmT1a4qIrH3hxiJeBE=s96-c',
    createdAt: '2023-08-07T05:13:47.132Z',
    updatedAt: '2023-08-09T15:19:50.845Z',
    studentsId: '3294cbb0-895c-4037-92bd-0903d613e2b9',
    teachersId: null,
    adminsId: null
  },
  formValues: {
    data: {
      basicInfo: {
        campus: 'EASTERN VISAYAS CAMPUS',
        schoolYear: [
          {
            label: '2023 - 2024',
            value: '9e54b5d7-f4f5-4053-b8d6-e603e126e3f3'
          }
        ],
        lastname: 'Uy',
        firstname: 'Charles Joshua',
        email: 'charlesjoshuauy@gmail.com',
        nameOfStudents: [],
        gradeSection: '2d20a721-5fbe-4236-a496-8cbb7f4f9d9a',
        unit: 'f97ec96a-853d-4858-8861-eae1de2c8bfa',
        subject: 'Reasearch 2',
        concurrentTopic: 'Topic 32',
        teacherInCharge: '87f89b12-a810-409e-9aef-a2ef5cf6ab36',
        numberOfStudents: '1'
      },
      laboratorySetting: {
        calendarDatePicker_10: '',
        timeDatePicker_11: '',
        calendarDatePicker_23: null,
        timeDatePicker_24: '',
        hasLaboratoryReservation: 'false',
        calendarDatePicker_26: '',
        timeDatePicker_27: '',
        allDates: [
          {
            requestDates: [
              '2023-08-14T15:08:00.000Z',
              '2023-08-16T15:08:00.000Z',
              '2023-08-18T15:08:00.000Z'
            ],
            inclusiveTimeOfUse: [
              { hours: 6, minutes: 35, seconds: 0 },
              { hours: 9, minutes: 35, seconds: 0 }
            ]
          }
        ],
        calendarDatePicker_12: '',
        timeDatePicker_13: '',
        calendarDatePicker_21: '',
        timeDatePicker_22: '',
        venue: 'a88a9d73-7620-4d87-9915-58e86a785700',
        calendarDatePicker_32: [
          '2023-08-14T15:08:00.000Z',
          '2023-08-16T15:08:00.000Z',
          '2023-08-18T15:08:00.000Z'
        ],
        timeDatePicker_33: [
          { hours: 6, minutes: 35, seconds: 0 },
          { hours: 9, minutes: 35, seconds: 0 }
        ]
      },
      equipment: {
        details: [
          {
            equipmentName: 'Autoclave',
            description: '240 V; w.p. 17.8 psi @ 254 oF',
            modelNoOrManufacturer: 'STME / Market Forge Inddustries Inc.',
            quantity: 1,
            requestedQuantity: 1
          }
        ]
      },
      reagents: {
        details: [
          {
            chemicalName: 'Amonia Solution',
            description: '28%',
            unit: 'mL',
            currentQuantity: 1800,
            maxQuantity: 1800,
            requestedQuantity: '100'
          }
        ]
      },
      submission: { download: 'false', email: 'false' }
    }
  }
};

// Initialize Base Request
const controlNumbers = await prisma.schoolYear.findFirst({
    where: {
        currentSchoolYear: true,
    },
});

// const request = await prisma.laboratoryRequests.create({
//     data: {
//         requestId: body.id,
//         forSubject: body.formValues.data.basicInfo.subject,
//         concurrentTopic: body.formValues.data.basicInfo.concurrentTopic,
//         gradeSectionId: body.formValues.data.basicInfo.gradeSection,
//         unitId: body.formValues.data.basicInfo.unit,
//         teacherInChargeId: body.formValues.data.basicInfo.teacherInCharge,
//         otherGroupMembers: body.formValues.data.basicInfo.nameOfStudents,
//         schoolYearId: controlNumbers.id,
//     },
// });

// // Check for Laboratory Reservation Request
// if (
//     body.formValues.data.laboratorySetting.hasLaboratoryReservation === "true"
// ) {
//   // Check for if there are multiple days and loop it
//   // Or make it so they can only pick one day
//     const requestWithLabReservation = await prisma.laboratoryRequests.update({
//         where: {
//             id: request.id,
//         },
//         data: {
//             laboratoryReservation: {
//                 create: {
//                     laboratoryId: body.formValues.data.laboratorySetting.venue,
//                 },
//             },
//         },
//     });
// }
