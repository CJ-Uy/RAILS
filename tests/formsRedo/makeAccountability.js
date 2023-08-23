import puppeteer from "puppeteer";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { writeFileSync } from "fs";

import getRequest from "./getRequest.js";
import dayjs from "dayjs";

async function convertHtmlToPDF(htmlContent, filePath) {
    const browser = await puppeteer.launch({ headless: "new" });
    const page = await browser.newPage();
    await page.setContent(htmlContent);
    const pdfBuffer = await page.pdf({ format: "A4" });
    await browser.close();

    // Save the PDF buffer to a file
    const currentDir = fileURLToPath(new URL(".", import.meta.url));
    writeFileSync(path.resolve(currentDir, filePath), pdfBuffer);
}

console.log("Fetching request...");
const request = await getRequest("ca9ca394-7a7b-485f-9904-a2fb14100b37");

let { campus } = request.schoolYear;
let { controlNumber } = request.equipmentRequested[0];
let schoolYear = `${request.schoolYear.yearStart}-${request.schoolYear.yearEnd}`;
let studentName = `${request.requestor.firstName} ${request.requestor.lastName}`;
let dateRequested = dayjs(request.createdAt).format("MMMM DD, YYYY");
let gradeSection = `${request.gradeSection.grade}-${request.gradeSection.section}`;
let { noOfStudents } = request;
let subject = request.forSubject;
let { concurrentTopic } = request;
let unit = request.unit.name;
let teacherInCharge = `${request.teacherInCharge.userProfile[0].firstName} ${request.teacherInCharge.userProfile[0].lastName}`;
let venueOfExperiment =
    request.laboratoryReservations[0].laboratoryReserved.name;

let approver = "&nbsp;";
let approverSignature = " ";
let teacherSignature = " ";

// TODO: NEED APPROVAL SYSTEM
// Notarization
if (request.isSignedByTeacher) {
    teacherSignature = "<INSERT SIGNATURE>";
}

if (request.isSignedByAdmin) {
    approver = `${request.signedAdmin.userProfile[0].firstName} ${request.signedAdmin.userProfile[0].lastName}`;
    approverSignature = "<INSERT SIGNATURE>";
}

// Dates an Time of Use
let inclusiveDates = "";
let inclusiveTimeOfUse = "";
let groupedReservations = request.laboratoryReservations.reduce((acc, curr) => {
    let time = `${dayjs(curr.startTime).format("HH:mm").toString()}-${dayjs(
        curr.endTime,
    )
        .format("HH:mm")
        .toString()}`;
    let date = `${dayjs(curr.startTime).format("MM/DD/YY").toString()}`;

    if (!acc[time]) {
        acc[time] = [date];
    } else {
        acc[time].push(date);
    }

    return acc;
}, {});
let counter = 1;
for (const time in groupedReservations) {
    inclusiveTimeOfUse += `(${counter}) ${time} `;
    inclusiveDates += `(${counter}) `;
    for (const date of groupedReservations[time]) {
        inclusiveDates += `${date} `;
    }
    counter += 1;
}

const pageScript = fs.readFileSync(
    "./server/app/forms/addPageNumbers/page.polyfill.txt",
    "utf8",
);

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
            content: 'PSHS-00-F-CID-20-Ver02-Rev0-02/01/20';
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
        margin-top: 0.25in;
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
</style>
</head>
<body>
    <div id="content">
        <div id="heading">
            <h1>PHILIPPINE SCIENCE HIGH SCHOOL SYSTEM</h1>
            <h1>CAMPUS:&emsp;&emsp;<span class="input">&emsp;&emsp;${campus}&emsp;&emsp;</span></h1>
        </div>

        <h2 id="title">LABORATORY REQUEST AND EQUIPMENT ACCOUNTABILITY FORM</h2>
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

for (const item of request.equipmentRequested) {
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
            <li>Fill out this form completely and legibly; transact with the Unit SRA concerned during office hours.</li>
            <li>Requests not in accordance with existing Unit regulations and considerations may not be granted.</li>
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

let length =
    request.otherGroupMembers.length < 5 ? 5 : request.otherGroupMembers.length;

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
console.dir(request, { depth: null, colors: true });
html += `
    <table class="sigs-table">
        <tr>
            <td></td>
            <td> <div id="endorserSignature"></div> </td>
            <td></td>
            <td></td>
            <td> <div id="approverSignature"> </div> </td>
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
    document.getElementById("").innerHTML = "${approverSignature}";

</script>
</html>
`;

// ---- END ----- //

console.log("STARTED PDF GENERATION");
await convertHtmlToPDF(html, "./sample.pdf");
console.log("COMPLETED");