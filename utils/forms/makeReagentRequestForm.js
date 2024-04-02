import dayjs from "dayjs";

import getRequest from "./getRequest.js";

export default async function makeAccountability(requestId) {
    const request = await getRequest(requestId);

    const { campus } = request.schoolYear;
    const { controlNumber } = request.reagentsRequested[0];
    const schoolYear = `${request.schoolYear.yearStart}-${request.schoolYear.yearEnd}`;
    const studentName = `${request.requestor.firstName} ${request.requestor.lastName}`;
    const dateRequested = dayjs(request.createdAt).format("MMMM DD, YYYY");
    const gradeSection = `${request.gradeSection.grade}-${request.gradeSection.section}`;
    const { noOfStudents } = request;
    const subject = request.forSubject;
    const { concurrentTopic } = request;
    const unit = request.unit.name;
    const teacherInCharge = `${request.teacherInCharge.userProfile[0].firstName} ${request.teacherInCharge.userProfile[0].lastName}`;

    let approver = "&nbsp;";
    let approverSignature = "";
    let teacherSignature = "";

    // Notarization
    if (request.reagentRequestsTeacherApproval === "APPROVED") {
        teacherSignature = request.teacherInCharge.signature;
    }

    if (request.reagentRequestsAdminApproval === "APPROVED") {
        approver = `${request.reagentRequestsAdminApprover.userProfile[0].firstName} ${request.reagentRequestsAdminApprover.userProfile[0].lastName}`;
        approverSignature = request.reagentRequestsAdminApprover.signature;
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

    let html = `<!doctype html>
<html lang="en">
<head>
<script src="https://unpkg.com/pagedjs/dist/paged.polyfill.js"></script>
<style>
    * {
        font-family: "Calibri";
        font-size: 13.5px;
        margin: 0;
        padding: 0;
    }
    @page {
        size: A4;
        margin: 0;
        margin-top: 1.14in;
        margin-bottom: 1in;

        @bottom-left {
            margin-left:  0.73in;
            font-weight: bold;
            content: 'PSHS-00-F-CID-19-Ver02-Rev1-10/18/20';
        }

        @bottom-right {
            margin-right:  0.73in;
            font-weight: bold;
            content: 'page ' counter(page); /* ' of ' counter(pages) [inconsistently working]*/
        }
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
    #table {
        margin-bottom: 0.15in;
    }
    .input {
        font-weight: normal;
        border-bottom: 1px solid black;
    }
    #request {
        text-align: center;
        border-collapse: collapse;
    }
    #request td {
        border: 1px solid black;
        white-space: pre-wrap; /* allow wrapping of white space */
        word-wrap: break-word; /* break long words */
        padding-right: 20px;
        padding-left: 20px;
    }
    .request-header {
        vertical-align: top;
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
    .groupmates {
        margin-left: 0.25in;
        width: 40%;
        table-layout: auto;
        font-style: italic;
    }
    .sigs-table {
        width: 100%;
        margin-top: 0.5in;
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
        transform: scale(0.3) translateY(-300px);
    }
    .svgSig {
        display: flex;
        justify-content: center;
        align-items: top;
    }
</style>
</head>
<body>
    <div id="content">
        <div id="heading">
            <h1>PHILIPPINE SCIENCE HIGH SCHOOL SYSTEM</h1>
            <h1>CAMPUS:&emsp;&emsp;<span class="input">&emsp;&emsp;${campus}&emsp;&emsp;</span></h1>
        </div>

        <h2 id="title">REAGENT REQUEST FORM</h2>
        <div id="tableId">
            Control No: <span class="input">${controlNumber}</span>
            &emsp;SY: <span class="input">${schoolYear}&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;</span>
        </div>
        
        <div id="table"></div>
`;

    html += `
<span class="italics"> Materials/Equipment Needed: </span>
        <table id="request">
            <tr class="request-header">
                <td rowspan="2">Quantity</td>
                <td rowspan="2">Item</td>
                <td rowspan="2">Description</td>
                <td>Issued</td>
                <td>Returned</td>
            </tr>
            <tr class="request-header">
                <td>Condition/Remarks</td>
                <td>Condition/Remarks</td>
            </tr>
`;

    // Requested materials
    for (const item of request.reagentsRequested) {
        html += `
            <tr>
                <td>${item.quantity}</td>
                <td>${item.name}</td>
                <td>${item.description}</td>
                <td></td>
                <td></td>
            </tr>
    `;
    }

    html += `
            <tr>
                <td></td>
                <td></td>
                <td></td>
                <td class="return" style="padding: 1px;">Received by:</td>
                <td class="return" style="padding: 1px;">Received and<br>Inspected by:</td>
            </tr>
            <tr>
                <td></td>
                <td></td>
                <td></td>
                <td style="text-align: left; padding: 1px;">Date:</td>
                <td style="text-align: left; padding: 1px;">Date:</td>
            </tr>
        </table>
        <br>
        <ul class="italics">
            <li>Students must certify that he/she/they have read the safety information as specified in the Safety Data Sheet (SDS) of the reagents being requested.</li>
            <li>This form must be filled out completely and legibly and submitted, together with a suitable container with cover and proper label, to the SRA of the unit which will release the reagents.</li>
            <li>Requests not in accordance with existing Unit regulations and considerations may not be granted.</li>
            <li>The reagents will be released to the SRA of the requesting unit.</li>
        </ul>

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

        <p class="italics">
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
                    ? ""
                    : request.otherGroupMembers[i]
            }</td>
        </tr>
    `;
    }
    html += `</table>`;

    // Notarization
    html += `
    <table class="sigs-table">
        <tr>
            <td></td>
            <td class="svgSig"> <div id="endorserSignature"></div> </td>
            <td></td>
            <td></td>
            <td class="svgSig"> <div id="approverSignature"></div> </td>
        <tr>
        <tr>
            <td class="sigs-who">Endorsed by:</td>
            <td class="input sigs-input" style="display: inline-block; word-break: break-word; width: 100%;">${teacherInCharge}</td>
            <td class="sigs-gap"></td>
            <td class="sigs-who">Approved by:</td> 
            <td class="input sigs-input" style="display: inline-block; word-break: break-word; width: 100%;">${approver}</td>
        </tr>
        <tr>
            <td></td>
            <td class="sigs-title">Subject Teacher/Unit Head</td>
            <td class="sigs-gap"></td>
            <td></td>
            <td class="sigs-title">Laboratory Technician</td>
        </tr>
    </table>
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
            label: "Concurrent Topic",
            value: "${concurrentTopic}",
            minWidth: 335,
        },
        {
            label: "Unit",
            value: "${unit}",
            minWidth: 282,
        },
        {
            label: "Teacher In-Charge",
            value: "${teacherInCharge}",
            minWidth: 302,
        },
        {
            label: "Venue of Experiment",
            value: "${venueOfExperiment}",
            minWidth: 520,
        },
        {
            label: "Date/Inclusive Dates",
            value: "${inclusiveDates}",
            minWidth: 255,
        },
        {
            label: "Inclusive Time of Use",
            value: "${inclusiveTimeOfUse}",
            minWidth: 255,
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

    // ---- END ----- //

    return html;
}
