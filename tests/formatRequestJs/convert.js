import fs from "fs";

const input = {
    id: "00791347-4891-4eb1-ae13-6110cd2aea27",
    createdAt: "2023-12-08T21:14:41.388Z",
    updatedAt: "2023-12-09T13:08:27.180Z",
    requestorId: "17a82e26-b661-4eee-8ab4-fa41ab90b3eb",
    forSubject: "1",
    concurrentTopic: "Test",
    noOfStudents: 1,
    otherGroupMembers: [],
    gradeSectionId: "8a4a8032-ca29-473c-82b7-c5a99ac42d2e",
    unitId: "ae539176-6459-494b-b02d-01b5e0b5c0f9",
    teacherInChargeId: "b9f0e461-b91f-4dd7-942c-b9d429d7379a",
    independentTime: null,
    independentLocation: null,
    isSignedByTeacher: "APPROVED",
    isSignedByAdmin: "PENDING",
    signedTeacherId: "b9f0e461-b91f-4dd7-942c-b9d429d7379a",
    signedAdminId: null,
    teacherAnnotation: null,
    adminAnnotation: null,
    schoolYearId: "d1a2e20c-93fd-49ac-8282-dd9f1c96aa14",
    "requestor.id": "17a82e26-b661-4eee-8ab4-fa41ab90b3eb",
    "requestor.email": "charlesjoshuauy@gmail.com",
    "requestor.firstName": "Charles Joshua",
    "requestor.lastName": "Uy",
    "requestor.role": "ADMIN",
    "requestor.imageLink":
        "https://lh3.googleusercontent.com/a/ACg8ocLg2cM9QTQCzNtvFgcNMiJAYsuuDoB9wm1eNSFZWBmadHQ=s96-c",
    "requestor.createdAt": "2023-12-08T19:34:21.690Z",
    "requestor.updatedAt": "2023-12-08T19:36:57.578Z",
    "requestor.studentsId": "18ef439e-11ec-499c-bf31-580a191150a7",
    "requestor.teachersId": "b9f0e461-b91f-4dd7-942c-b9d429d7379a",
    "requestor.adminsId": "fc9290ef-b2bc-4f42-861b-3676294db9a7",
    "gradeSection.id": "8a4a8032-ca29-473c-82b7-c5a99ac42d2e",
    "gradeSection.createdAt": "2023-12-08T19:40:07.789Z",
    "gradeSection.updatedAt": "2023-12-08T19:40:07.789Z",
    "gradeSection.grade": 12,
    "gradeSection.section": "C",
    "unit.id": "ae539176-6459-494b-b02d-01b5e0b5c0f9",
    "unit.createdAt": "2023-12-08T19:40:07.791Z",
    "unit.updatedAt": "2023-12-08T19:40:07.791Z",
    "unit.name": "PEHM Unit",
    "unit.frequencyRank": 10,
    "teacherInCharge.id": "b9f0e461-b91f-4dd7-942c-b9d429d7379a",
    "teacherInCharge.createdAt": "2023-12-08T19:35:04.320Z",
    "teacherInCharge.updatedAt": "2023-12-09T17:18:21.163Z",
    "teacherInCharge.signature": null,
    "teacherInCharge.userProfile.0.id": "17a82e26-b661-4eee-8ab4-fa41ab90b3eb",
    "teacherInCharge.userProfile.0.email": "charlesjoshuauy@gmail.com",
    "teacherInCharge.userProfile.0.firstName": "Charles Joshua",
    "teacherInCharge.userProfile.0.lastName": "Uy",
    "teacherInCharge.userProfile.0.role": "ADMIN",
    "teacherInCharge.userProfile.0.imageLink":
        "https://lh3.googleusercontent.com/a/ACg8ocLg2cM9QTQCzNtvFgcNMiJAYsuuDoB9wm1eNSFZWBmadHQ=s96-c",
    "teacherInCharge.userProfile.0.createdAt": "2023-12-08T19:34:21.690Z",
    "teacherInCharge.userProfile.0.updatedAt": "2023-12-08T19:36:57.578Z",
    "teacherInCharge.userProfile.0.studentsId":
        "18ef439e-11ec-499c-bf31-580a191150a7",
    "teacherInCharge.userProfile.0.teachersId":
        "b9f0e461-b91f-4dd7-942c-b9d429d7379a",
    "teacherInCharge.userProfile.0.adminsId":
        "fc9290ef-b2bc-4f42-861b-3676294db9a7",
    "materialsRequested.0.id": "cba3051c-668b-467f-bfeb-53b7a92af36b",
    "materialsRequested.0.controlNumber": "2023-2024-027",
    "materialsRequested.0.createdAt": "2023-12-08T21:14:41.420Z",
    "materialsRequested.0.updatedAt": "2023-12-08T21:14:41.420Z",
    "materialsRequested.0.quantity": 2,
    "materialsRequested.0.name": "Wood Stopper",
    "materialsRequested.0.description": "Large",
    "materialsRequested.0.laboratoryRequestId":
        "00791347-4891-4eb1-ae13-6110cd2aea27",
    "materialsRequested.0.schoolYearId": "d1a2e20c-93fd-49ac-8282-dd9f1c96aa14",
    "equipmentRequested.0.id": "575b5454-ffc0-45b8-a456-4e60048d1ab7",
    "equipmentRequested.0.controlNumber": "2023-2024-027",
    "equipmentRequested.0.createdAt": "2023-12-08T21:14:41.425Z",
    "equipmentRequested.0.updatedAt": "2023-12-08T21:14:41.425Z",
    "equipmentRequested.0.quantity": 2,
    "equipmentRequested.0.name": "Analytical Balance",
    "equipmentRequested.0.description": "readability: 0.1mg",
    "equipmentRequested.0.modelNoOrManufacturer": "Entris224-1S/Sartorius",
    "equipmentRequested.0.laboratoryRequestId":
        "00791347-4891-4eb1-ae13-6110cd2aea27",
    "equipmentRequested.0.schoolYearId": "d1a2e20c-93fd-49ac-8282-dd9f1c96aa14",
    "equipmentRequested.1.id": "885b4457-2f54-44df-ad1d-83149703a23a",
    "equipmentRequested.1.controlNumber": "2023-2024-027",
    "equipmentRequested.1.createdAt": "2023-12-08T21:14:41.432Z",
    "equipmentRequested.1.updatedAt": "2023-12-08T21:14:41.432Z",
    "equipmentRequested.1.quantity": 1,
    "equipmentRequested.1.name": "Bead Rupture Homogenizer",
    "equipmentRequested.1.description": "220V",
    "equipmentRequested.1.modelNoOrManufacturer": "Bead raptor 4 / Omni",
    "equipmentRequested.1.laboratoryRequestId":
        "00791347-4891-4eb1-ae13-6110cd2aea27",
    "equipmentRequested.1.schoolYearId": "d1a2e20c-93fd-49ac-8282-dd9f1c96aa14",
    "reagentsRequested.0.id": "19029e5b-5f9e-45b0-8ec8-21b4c0aa202d",
    "reagentsRequested.0.controlNumber": "2023-2024-020",
    "reagentsRequested.0.createdAt": "2023-12-08T21:14:41.450Z",
    "reagentsRequested.0.updatedAt": "2023-12-08T21:14:41.450Z",
    "reagentsRequested.0.quantity": 110,
    "reagentsRequested.0.unit": "mL",
    "reagentsRequested.0.name": "Acetophenone, extra pure",
    "reagentsRequested.0.description": null,
    "reagentsRequested.0.laboratoryRequestId":
        "00791347-4891-4eb1-ae13-6110cd2aea27",
    "reagentsRequested.0.schoolYearId": "d1a2e20c-93fd-49ac-8282-dd9f1c96aa14",
    "reagentsRequested.1.id": "9ebaf5a9-9605-41f6-afe9-b77eea2abcf0",
    "reagentsRequested.1.controlNumber": "2023-2024-020",
    "reagentsRequested.1.createdAt": "2023-12-08T21:14:41.444Z",
    "reagentsRequested.1.updatedAt": "2023-12-08T21:14:41.444Z",
    "reagentsRequested.1.quantity": 105,
    "reagentsRequested.1.unit": "mL",
    "reagentsRequested.1.name": "Acetic Acid",
    "reagentsRequested.1.description": "glacial",
    "reagentsRequested.1.laboratoryRequestId":
        "00791347-4891-4eb1-ae13-6110cd2aea27",
    "reagentsRequested.1.schoolYearId": "d1a2e20c-93fd-49ac-8282-dd9f1c96aa14",
    "laboratoryReservations.0.id": "4d6cfd75-7da0-4ed6-a168-8f28949d50ca",
    "laboratoryReservations.0.createdAt": "2023-12-08T21:14:41.403Z",
    "laboratoryReservations.0.updatedAt": "2023-12-08T21:14:41.403Z",
    "laboratoryReservations.0.controlNumber": "2023-2024-017",
    "laboratoryReservations.0.laboratoryId":
        "72b0caa9-324a-4510-ad14-dd47a0b04e12",
    "laboratoryReservations.0.startTime": "2023-12-21T10:00:00+08:00",
    "laboratoryReservations.0.endTime": "2023-12-21T12:00:00+08:00",
    "laboratoryReservations.0.laboratoryRequestId":
        "00791347-4891-4eb1-ae13-6110cd2aea27",
    "laboratoryReservations.0.laboratoryReserved.id":
        "72b0caa9-324a-4510-ad14-dd47a0b04e12",
    "laboratoryReservations.0.laboratoryReserved.createdAt":
        "2023-12-08T19:40:07.800Z",
    "laboratoryReservations.0.laboratoryReserved.updatedAt":
        "2023-12-08T19:40:07.800Z",
    "laboratoryReservations.0.laboratoryReserved.name":
        "ACA 2 - Research Laboratory",
    "laboratoryReservations.0.laboratoryReserved.description": null,
    "laboratoryReservations.0.laboratoryReserved.locationId":
        "a583e66b-6dd8-4f2b-bf38-ff5f62cd3a30",
    "laboratoryReservations.0.laboratoryRequest.id":
        "00791347-4891-4eb1-ae13-6110cd2aea27",
    "laboratoryReservations.0.laboratoryRequest.createdAt":
        "2023-12-08T21:14:41.388Z",
    "laboratoryReservations.0.laboratoryRequest.updatedAt":
        "2023-12-09T13:08:27.180Z",
    "laboratoryReservations.0.laboratoryRequest.requestorId":
        "17a82e26-b661-4eee-8ab4-fa41ab90b3eb",
    "laboratoryReservations.0.laboratoryRequest.forSubject": "1",
    "laboratoryReservations.0.laboratoryRequest.concurrentTopic": "Test",
    "laboratoryReservations.0.laboratoryRequest.noOfStudents": 1,
    "laboratoryReservations.0.laboratoryRequest.otherGroupMembers": [],
    "laboratoryReservations.0.laboratoryRequest.gradeSectionId":
        "8a4a8032-ca29-473c-82b7-c5a99ac42d2e",
    "laboratoryReservations.0.laboratoryRequest.unitId":
        "ae539176-6459-494b-b02d-01b5e0b5c0f9",
    "laboratoryReservations.0.laboratoryRequest.teacherInChargeId":
        "b9f0e461-b91f-4dd7-942c-b9d429d7379a",
    "laboratoryReservations.0.laboratoryRequest.independentTime": null,
    "laboratoryReservations.0.laboratoryRequest.independentLocation": null,
    "laboratoryReservations.0.laboratoryRequest.isSignedByTeacher": "APPROVED",
    "laboratoryReservations.0.laboratoryRequest.isSignedByAdmin": "PENDING",
    "laboratoryReservations.0.laboratoryRequest.signedTeacherId":
        "b9f0e461-b91f-4dd7-942c-b9d429d7379a",
    "laboratoryReservations.0.laboratoryRequest.signedAdminId": null,
    "laboratoryReservations.0.laboratoryRequest.teacherAnnotation": null,
    "laboratoryReservations.0.laboratoryRequest.adminAnnotation": null,
    "laboratoryReservations.0.laboratoryRequest.schoolYearId":
        "d1a2e20c-93fd-49ac-8282-dd9f1c96aa14",
    "laboratoryReservations.1.id": "dc6a483c-7ca5-4cb5-9ae5-a6f5857dac2a",
    "laboratoryReservations.1.createdAt": "2023-12-08T21:14:41.409Z",
    "laboratoryReservations.1.updatedAt": "2023-12-08T21:14:41.409Z",
    "laboratoryReservations.1.controlNumber": "2023-2024-017",
    "laboratoryReservations.1.laboratoryId":
        "72b0caa9-324a-4510-ad14-dd47a0b04e12",
    "laboratoryReservations.1.startTime": "2023-12-27T00:00:00+08:00",
    "laboratoryReservations.1.endTime": "2023-12-27T10:00:00+08:00",
    "laboratoryReservations.1.laboratoryRequestId":
        "00791347-4891-4eb1-ae13-6110cd2aea27",
    "laboratoryReservations.1.laboratoryReserved.id":
        "72b0caa9-324a-4510-ad14-dd47a0b04e12",
    "laboratoryReservations.1.laboratoryReserved.createdAt":
        "2023-12-08T19:40:07.800Z",
    "laboratoryReservations.1.laboratoryReserved.updatedAt":
        "2023-12-08T19:40:07.800Z",
    "laboratoryReservations.1.laboratoryReserved.name":
        "ACA 2 - Research Laboratory",
    "laboratoryReservations.1.laboratoryReserved.description": null,
    "laboratoryReservations.1.laboratoryReserved.locationId":
        "a583e66b-6dd8-4f2b-bf38-ff5f62cd3a30",
    "laboratoryReservations.1.laboratoryRequest.id":
        "00791347-4891-4eb1-ae13-6110cd2aea27",
    "laboratoryReservations.1.laboratoryRequest.createdAt":
        "2023-12-08T21:14:41.388Z",
    "laboratoryReservations.1.laboratoryRequest.updatedAt":
        "2023-12-09T13:08:27.180Z",
    "laboratoryReservations.1.laboratoryRequest.requestorId":
        "17a82e26-b661-4eee-8ab4-fa41ab90b3eb",
    "laboratoryReservations.1.laboratoryRequest.forSubject": "1",
    "laboratoryReservations.1.laboratoryRequest.concurrentTopic": "Test",
    "laboratoryReservations.1.laboratoryRequest.noOfStudents": 1,
    "laboratoryReservations.1.laboratoryRequest.otherGroupMembers": [],
    "laboratoryReservations.1.laboratoryRequest.gradeSectionId":
        "8a4a8032-ca29-473c-82b7-c5a99ac42d2e",
    "laboratoryReservations.1.laboratoryRequest.unitId":
        "ae539176-6459-494b-b02d-01b5e0b5c0f9",
    "laboratoryReservations.1.laboratoryRequest.teacherInChargeId":
        "b9f0e461-b91f-4dd7-942c-b9d429d7379a",
    "laboratoryReservations.1.laboratoryRequest.independentTime": null,
    "laboratoryReservations.1.laboratoryRequest.independentLocation": null,
    "laboratoryReservations.1.laboratoryRequest.isSignedByTeacher": "APPROVED",
    "laboratoryReservations.1.laboratoryRequest.isSignedByAdmin": "PENDING",
    "laboratoryReservations.1.laboratoryRequest.signedTeacherId":
        "b9f0e461-b91f-4dd7-942c-b9d429d7379a",
    "laboratoryReservations.1.laboratoryRequest.signedAdminId": null,
    "laboratoryReservations.1.laboratoryRequest.teacherAnnotation": null,
    "laboratoryReservations.1.laboratoryRequest.adminAnnotation": null,
    "laboratoryReservations.1.laboratoryRequest.schoolYearId":
        "d1a2e20c-93fd-49ac-8282-dd9f1c96aa14",
    "signedTeacher.id": "b9f0e461-b91f-4dd7-942c-b9d429d7379a",
    "signedTeacher.createdAt": "2023-12-08T19:35:04.320Z",
    "signedTeacher.updatedAt": "2023-12-09T17:18:21.163Z",
    "signedTeacher.signature": null,
    "signedTeacher.userProfile.0.id": "17a82e26-b661-4eee-8ab4-fa41ab90b3eb",
    "signedTeacher.userProfile.0.email": "charlesjoshuauy@gmail.com",
    "signedTeacher.userProfile.0.firstName": "Charles Joshua",
    "signedTeacher.userProfile.0.lastName": "Uy",
    "signedTeacher.userProfile.0.role": "ADMIN",
    "signedTeacher.userProfile.0.imageLink":
        "https://lh3.googleusercontent.com/a/ACg8ocLg2cM9QTQCzNtvFgcNMiJAYsuuDoB9wm1eNSFZWBmadHQ=s96-c",
    "signedTeacher.userProfile.0.createdAt": "2023-12-08T19:34:21.690Z",
    "signedTeacher.userProfile.0.updatedAt": "2023-12-08T19:36:57.578Z",
    "signedTeacher.userProfile.0.studentsId":
        "18ef439e-11ec-499c-bf31-580a191150a7",
    "signedTeacher.userProfile.0.teachersId":
        "b9f0e461-b91f-4dd7-942c-b9d429d7379a",
    "signedTeacher.userProfile.0.adminsId":
        "fc9290ef-b2bc-4f42-861b-3676294db9a7",
    signedAdmin: null,
    "schoolYear.id": "d1a2e20c-93fd-49ac-8282-dd9f1c96aa14",
    "schoolYear.yearStart": 2023,
    "schoolYear.yearEnd": 2024,
    "schoolYear.createdAt": "2023-12-08T19:40:07.790Z",
    "schoolYear.currentSchoolYear": true,
    "schoolYear.campus": "EASTERN VISAYAS CAMPUS",
    "schoolYear.materialEquipmentRequestControlNumberCounter": 34,
    "schoolYear.reagentRequestControlNumberCounter": 27,
    "schoolYear.laboratoryRequestControlNumberCounter": 29,
};

const output = Object.keys(input).map((key) => ({
    key,
    label: "",
    sortable: true,
}));

fs.writeFile(
    "./tests/formatRequestJs/keys.txt",
    JSON.stringify(output),
    (err) => {
        if (err) throw err;
        console.log("The file has been saved!");
    },
);
