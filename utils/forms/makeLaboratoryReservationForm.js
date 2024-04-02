import fs from "fs";
import dayjs from "dayjs";

import getRequest from "./getRequest.js";

export default async function makeLaboratoryReservationForm(requestId) {
    const request = await getRequest(requestId);

    const { campus } = request.schoolYear;
    const { controlNumber } = request.laboratoryReservations[0];
    const schoolYear = `${request.schoolYear.yearStart}-${request.schoolYear.yearEnd}`;
    const studentName = `${request.requestor.firstName} ${request.requestor.lastName}`;
    const dateRequested = dayjs(request.createdAt).format("MMMM DD, YYYY");
    const gradeSection = `${request.gradeSection.grade}-${request.gradeSection.section}`;
    const { noOfStudents } = request;
    const subject = request.forSubject;
    const teacherInCharge = `${request.teacherInCharge.userProfile[0].firstName} ${request.teacherInCharge.userProfile[0].lastName}`;

    let approver = "&nbsp;";
    let approverSignature = "";
    let teacherSignature = "";

    // Notarization
    if (request.laboratoryReservationsTeacherApproval === "APPROVED") {
        teacherSignature = request.teacherInCharge.signature;
    }

    if (request.laboratoryReservationsAdminApproval === "APPROVED") {
        approver = `${request.laboratoryReservationsAdminApprover.userProfile[0].firstName} ${request.laboratoryReservationsAdminApprover.userProfile[0].lastName}`;
        approverSignature =
            request.laboratoryReservationsAdminApprover.signature;
    }

    // Laboratory Setting
    let venueOfExperiment;
    let inclusiveDates = "";
    let inclusiveTimeOfUse = "";

    let groupedReservations = {}; // { time: dates }
    if (request.independentTime && request.independentLocation) {
        venueOfExperiment = request.independentLocation;
        groupedReservations = request.independentTime;
    } else {
        venueOfExperiment =
            request.laboratoryReservations[0].laboratoryReserved.name;
        const reservationDates = request.laboratoryReservations[0].dates;
        const reservationTimes = request.laboratoryReservations[0].time;
        for (let i = 0; i < reservationDates.startDate.length; i++) {
            const reservationTime = `${reservationTimes.startTime[i]} to ${reservationTimes.endTime[i]}`;

            if (!groupedReservations[reservationTime]) {
                groupedReservations[reservationTime] = [];
            }
            groupedReservations[reservationTime].push(
                reservationDates.startDate[i] === reservationDates.endDate[i]
                    ? dayjs(reservationDates.startDate[i]).format(
                          "MMM DD, YYYY",
                      )
                    : `${dayjs(reservationDates.startDate[i]).format(
                          "MMM DD, YYYY",
                      )} to ${dayjs(reservationDates.endDate[i]).format(
                          "MMM DD, YYYY",
                      )}`,
            );
        }
    }

    if (Object.keys(groupedReservations).length > 1) {
        let counter = 1;
        for (const time in groupedReservations) {
            inclusiveTimeOfUse += `(${counter}) ${time}; `;
            inclusiveDates += `(${counter}) `;
            for (const date of groupedReservations[time]) {
                inclusiveDates += `${date}; `;
            }
            counter += 1;
        }
    } else {
        for (const time in groupedReservations) {
            inclusiveTimeOfUse += `${time} `;
            for (const date of groupedReservations[time]) {
                inclusiveDates += `${date} `;
            }
        }
    }

    const absolutePath = require.resolve(
        "./utils/forms/addPageNumbers/page.polyfill.txt",
    );
    const pageScript = fs.readFileSync(absolutePath, "utf8");

    let html =
        `<!doctype html>
<html lang="en">
<head>
<script>` +
        pageScript +
        `</script>
<style>
    * {
        font-family: "Calibri";
        font-size: 12px;
        margin: 0;
        padding: 0;
    }
    @page {
        size: A4;
        margin: 0;
        margin-top: 0.8in;
        margin-bottom: 1in;
    }
    @media print {
        html, body {
            width: 210mm;
            height: 297mm;
            margin: 0;
            padding: 0;
        }
    }
    html, body {
        /*A4 Sizing (210mm x 297mm or 8.27in x 11.69in)*/
        width: 210mm !important;
        height: 297mm !important;
        margin: 0 !important;
        padding: 0 !important;
    }
    #content {
        position: absolute;
        /*Taken through trial and errror*/
        width: 80%;
        margin-left: 0.73in;
    }
    h1 h2 {
        font-weight: bold;
    }
    #heading > h1 {
        margin-bottom: 0.02in; 
    }
    #title {
        margin-top: 0.21in;
        margin-bottom: 0.15in;
    }
    #tableId {
        width: 100%;
        text-align: right;
    }
    .input {
        font-weight: normal;
        border-bottom: 1px solid black;
    }
    .return {
        vertical-align: top;
        text-align: left;
        height: 1.05in;
    }
    ul {
        margin-left: 0.25in;
    }
    .italics {
        font-style: italic;
    }
    #groupmates-header {
        margin-top: 0.15in;
    }
    .groupmates {
        margin-left: 0.1in;
        width: 40%;
        table-layout: auto;
        font-style: italic;
    }
    .sigs-table {
        width: 100%;
        margin-top: 0.15in;
        border-collapse: collapse;
    }
    .sigs-table2 {
        width: 50%;
        margin-top: 0.15in;
        border-collapse: collapse;
    }
    .sigs-input {
        text-align: center;
        width: 20%;
        border-bottom: 1px solid black; 
    }
    .sigs-gap {
        width: 15%;
    }
    .sigs-who {
        width: 1px;
        white-space: nowrap;
    }
    .sigs-title {
        text-align: center;
    }
    #endorserSignature {
        position: absolute; 
        transform: scale(0.3)  translateY(-300px);
    }
    #approverSignature {
        position: absolute;
        transform: scale(0.3) translateY(-200px);
    }
    .svgSig {
        display: flex;
        justify-content: center;
        align-items: top;
    }
    #form-code {
        margin-top: 0.3in;
        font-size: 10px;
    }
</style>
</head>
<body>
    <div id="content">
        <div id="heading">
            <h1>PHILIPPINE SCIENCE HIGH SCHOOL SYSTEM</h1>
            <h1>CAMPUS:<span class="input">&emsp;&emsp;${campus}&emsp;&emsp;</span></h1>
        </div>

        <h2 id="title">LABORATORY RESERVATION FORM</h2>
        <div id="tableId">
            Control No: <span class="input">${controlNumber}</span>
            &emsp;SY: <span class="input">${schoolYear}&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;</span>
        </div>
        
        <div id="table"></div>
`;

    html += `
        <table class="sigs-table">
            <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
            </tr>
            <tr>
                <td class="sigs-who">Requested by:</td>
                <td class="input sigs-input" style="display: inline-block; word-break: break-word; width: 100%;">${studentName}</td>
                <td class="sigs-gap"></td>
                <td class="sigs-who">Date Requested:</td> 
                <td class="input sigs-input">${dateRequested}</td>
            </tr>
            <tr>
                <td></td>
                <td class="sigs-title">Teacher/Student</td>
                <td class="sigs-gap"></td>
                <td></td>
                <td></td>
            </tr>
        </table>

        <p class="italics" id="groupmates-header">
            If user of the lab is a group, list down the names of students.
        </p>
        <table class="groupmates">
`;
    // Group Members
    const length =
        request.otherGroupMembers.length < 5
            ? 5
            : request.otherGroupMembers.length;

    for (let i = 0; i < length; i++) {
        html += `
        <tr>
            <td style="text-align: right;">${i + 1}.</td>
            <td class="input">&nbsp;&nbsp;${
                request.otherGroupMembers[i] == null
                    ? "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"
                    : request.otherGroupMembers[i]
            }</td>
        </tr>
    `;
    }
    html += `</table>`;

    // Notarization
    html += `
    <table class="sigs-table2">
        <tr>
            <td>&nbsp;</td>
            <td></td>
        </tr>
        <tr>
            <td></td>
            <td class="svgSig"> <div id="endorserSignature"></div> </td>
        </tr>
        <tr>
            <td class="sigs-who">Endorsed by:</td>
            <td class="input sigs-input" style="display: inline-block; word-break: break-word; width: 100%;">${teacherInCharge}</td>
        </tr>
        <tr>
            <td></td>
            <td class="sigs-title">Subject Teacher/Unit Head</td>
        </tr>
        <tr>
            <td></td>
            <td class="svgSig"> <div id="approverSignature"></div> </td>
        </tr>
        <tr>
            <td>&nbsp;</td>
            <td></td>
        </tr>
        <tr>
            <td>&nbsp;</td>
            <td></td>
        </tr>
        <tr>
            <td class="sigs-who">Approved by:</td> 
            <td class="input sigs-input" style="display: inline-block; word-break: break-word; width: 100%;">${approver}</td>
        </tr>
        <tr>
            <td></td>
            <td class="sigs-title">Laboratory Technician</td>
        </tr>
    </table>

    <div id="form-code">PSHS-00-F-CID-05-Ver02-Rev0-02/01/2020</div>
`;

    html += `
    </div>
</body>
<script>
    // 585 is the row width
    let data = [
        {
            label: "Grade Level and Section",
            value: "${gradeSection}",
            minWidth: 375,
        },
        {
            label: "Number of Students",
            value: "${noOfStudents}",
            minWidth: 210,
        },
        {
            label: "Subject",
            value: "${subject}",
            minWidth: 250,
        },
        {
            label: "Teacher In-Charge",
            value: "${teacherInCharge}",
            minWidth: 302,
        },
        {
            label: "Date/Inclusive Dates",
            value: "${inclusiveDates}",
            minWidth: 280,
        },
        {
            label: "Inclusive Time of Use",
            value: "${inclusiveTimeOfUse}",
            minWidth: 280,
        },
        {
            label: "Preferred Lab Room",
            value: "${venueOfExperiment}",
            minWidth: 300,
        },
    ];

    // Create flex container
    let container = document.getElementById("table");
    container.style.display = "flex";
    container.style.flexWrap = "wrap";

    // Iterate over data to create flex items
    for (let i = 0; i < data.length; i++) {
        // Create label item
        let labelItem = document.createElement("div");
        labelItem.textContent = data[i].label + ":";
        labelItem.style.marginRight = "15px"
        container.appendChild(labelItem);

        // Create value item
        let valueItem = document.createElement("div");
        valueItem.textContent = data[i].value;
        valueItem.style.borderBottom = "1px solid black";
        container.appendChild(valueItem);

        // Space
        let spaceItem = document.createElement("div");
        spaceItem.style.borderBottom = "1px solid black";

        let difference =
            data[i].minWidth -
            labelItem.offsetWidth -
            valueItem.offsetWidth;
        let offsetWidth = difference < 0 ? 0 : difference;

        spaceItem.style.minWidth = offsetWidth + "px";
        console.log(offsetWidth)
        container.appendChild(spaceItem);
    }

    // Signatures
    document.getElementById("endorserSignature").innerHTML = '${teacherSignature}';
    document.getElementById("approverSignature").innerHTML = '${approverSignature}';


</script>
</html>
`;
    // --- End --- //

    return html;
}
