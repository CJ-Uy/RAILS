import puppeteer from "puppeteer";

export default async function convertHtmlToPdf(htmlContent, outputPath) {
    const browser = await puppeteer.launch({ headless: "new" });
    const page = await browser.newPage();
    await page.setContent(htmlContent);
    await page.pdf({ path: outputPath, format: "A4" });
    await browser.close();
}

const campus = "EASTERN VISAYAS";
const controlNo = "22-23-0001";
const schoolYear = "2022-2023";
const gradeSection = "11-C";
const numStudents = "5";
const subject = "Physics";
const concurrentTopic = "Relativity";
const unit = "Physics Unit";
const teacherInCharge = "Ana Riza Gozon";
const venue = "Physics lab 3";
const dates = "01/23/45";
const timeOfUse = "9:00am - 10:00am";

const quantity = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", " ", " "];
const item = [
    "microscope",
    "bunsen burner",
    "petri dish",
    "test tube",
    "beaker",
    "pipette",
    "test tube rack",
    "test tube holder",
    "test tube brush",
    "test tube clamp",
    "",
    "",
];
const description = [
    "to observe",
    "to heat",
    "to observe",
    "to observe",
    "to observe",
    "to measure",
    "to hold",
    "to hold",
    "to clean",
    "to hold",
    "",
    "",
];
const issued = [
    "good",
    "good",
    "good",
    "good",
    "good",
    "good",
    "good",
    "good",
    "good",
    "good",
    " ",
    " ",
];
const returned = [
    "good",
    "good",
    "good",
    "good",
    "good",
    "good",
    "good",
    "good",
    "good",
    "good",
    " ",
    " ",
];

const studentName = "Charles";
const dateRequested = "Today";

const groupmates = [
    "me",
    "myself",
    "and",
    "I",
    "you",
    "myself",
    "and",
    "I",
    "you",
    "myself",
    "and",
    "I",
    "you",
    "myself",
    "and",
    "I",
    "you",
    "myself",
    "and",
    "I",
    "you",
];

const endorser = "Maam";
const approver = "Admin 1";

let html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>PSHS-00-F-CID-20-Ver02-Rev1 Laboratory Request and Equipment Accountability Form</title>
    <script src="https://unpkg.com/pagedjs/dist/paged.polyfill.js"></script> <!-- Paged.js polyfill (see if there's a way to do this locally loading from /app/forms/addPageNummbers/page.polyfill.js) -->
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
                content: 'page ' counter(page); /* ' of ' counter(pages) [Not working returns 0 BUT did return correctly once]*/
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
            width: 90%;
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
            margin-bottom: 0.23in;
        }
        .input {
            font-weight: normal;
            border-bottom: 1px solid black;
        }
        table {
            width: 90%;
            border-collapse: collapse;
            margin-bottom: 0.21in;
        }
        #basic-info-1{
            text-align: right;
            border-bottom: none !important;
        }
        .right-side-basic-info {
            display: inline-block;
            text-align: right;
            float: right;
        }
        .expander {
            border-bottom: 1px solid black;
        }
        .remove-botB {
            border-bottom: 1px solid white;
        }
        #request {
            text-align: center;
        }
        #request td {
            border: 1px solid black;
            white-space: pre-wrap; /* allow wrapping of white space */
            word-wrap: break-word; /* break long words */
        }
        #request td:first-child {
            border-bottom: 1px solid black !important;
        }
        .request-header {
            vertical-align: top;
            border: 1px solid black;
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
            width: 90%;
            margin-top: 0.25in;
        }
        .sigs-input {
            text-align: center;
            width: 20%;
        }
        .sigs-gap {
            width: 10%;
        }
        .sigs-who {
            width: 11%;
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

        <table id="basic-info">
            <tr id="basic-info-1">
                <td>
                    Control No: <span class="input">&emsp;${controlNo}&emsp;</span> 
                    &emsp; SY: <span class="input">&emsp;${schoolYear}&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;</span>
                </td>
            </tr>
            <tr class="expander">
                <td>
                    <span class="remove-botB">Grade Level and Section:</span><span class="input">&emsp;${gradeSection}&emsp;&emsp;&emsp;</span>
                    <span class="right-side-basic-info"><span class="remove-botB"> &emsp; Number of Students:</span><span class="input">&emsp;${numStudents}&emsp;&emsp;&emsp;</span></span>
                </td>
            </tr>
            <tr class="expander">
                <td>
                    <span class="remove-botB">Subject:</span><span class="input">&emsp;${subject}&emsp;</span>
                    <span class="right-side-basic-info"><span class="remove-botB"> &emsp; Concurrent Topic:</span><span class="input">&emsp;${concurrentTopic}&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;</span> </span>
                </td>
            </tr>
            <tr class="expander">
                <td>
                    <span class="remove-botB">Unit:</span><span class="input">&emsp;${unit}&emsp;</span>
                    <span class="right-side-basic-info"><span class="remove-botB"> &emsp; Teacher-In-Charge: </span><span class="input">&emsp;${teacherInCharge}&emsp;</span> </span>
                </td>
            </tr>
            <tr class="expander">
                <td>
                    <span class="remove-botB">Venue of Experiment: </span><span class="input">&emsp;${venue}&emsp;</span>
                </td>
            </tr>
            <tr>
                <td class="expander">
                    <span class="remove-botB">Date/Inclusive Dates: </span><span class="input">&emsp;${dates}&emsp;</span>
                    <span class="right-side-basic-info"><span class="remove-botB"> &emsp; Inclusive Time of Use: </span><span class="input">&emsp;${timeOfUse}&emsp;</span></span>
                </td>
            </tr>
        </table>

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
            <tr>
                <td>${quantity[0]}</td>
                <td>${item[0]}</td>
                <td>${description[0]}</td>
                <td>${issued[0]}</td>
                <td>${returned[0]}</td>
            </tr>
            <tr>
                <td>${quantity[1]}</td>
                <td>${item[1]}</td>
                <td>${description[1]}</td>
                <td>${issued[1]}</td>
                <td>${returned[1]}</td>
            </tr>
            <tr>
                <td>${quantity[2]}</td>
                <td>${item[2]}</td>
                <td>${description[2]}</td>
                <td>${issued[2]}</td>
                <td>${returned[2]}</td>
            </tr>
            <tr>
                <td>${quantity[3]}</td>
                <td>${item[3]}</td>
                <td>${description[3]}</td>
                <td>${issued[3]}</td>
                <td>${returned[3]}</td>
            </tr>
            <tr>
                <td>${quantity[4]}</td>
                <td>${item[4]}</td>
                <td>${description[4]}</td>
                <td>${issued[4]}</td>
                <td>${returned[4]}</td>
            </tr>
            <tr>
                <td>${quantity[5]}</td>
                <td>${item[5]}</td>
                <td>${description[5]}</td>
                <td>${issued[5]}</td>
                <td>${returned[5]}</td>
            </tr>
            <tr>
                <td>${quantity[6]}</td>
                <td>${item[6]}</td>
                <td>${description[6]}</td>
                <td>${issued[6]}</td>
                <td>${returned[6]}</td>
            </tr>
            <tr>
                <td>${quantity[7]}</td>
                <td>${item[7]}</td>
                <td>${description[7]}</td>
                <td>${issued[7]}</td>
                <td>${returned[7]}</td>
            </tr>
            <tr>
                <td>${quantity[8]}</td>
                <td>${item[8]}</td>
                <td>${description[8]}</td>
                <td>${issued[8]}</td>
                <td>${returned[8]}</td>
            </tr>
            <tr>
                <td>${quantity[9]}</td>
                <td>${item[9]}</td>
                <td>${description[9]}</td>
                <td>${issued[9]}</td>
                <td>${returned[9]}</td>
            </tr>
            <tr>
                <td>${quantity[10]}</td>
                <td>${item[10]}</td>
                <td>${description[10]}</td>
                <td>${issued[10]}</td>
                <td>${returned[10]}</td>
            </tr>
            <tr>
                <td>${quantity[11]}</td>
                <td>${item[11]}</td>
                <td>${description[11]}</td>
                <td>${issued[11]}</td>
                <td>${returned[11]}</td>
            </tr>
            <tr>
                <td></td>
                <td></td>
                <td></td>
                <td class="return">&nbsp;Received by:</td>
                <td class="return">&nbsp;Received and<br>&nbsp;Inspected by:</td>
            </tr>
            <tr>
                <td></td>
                <td></td>
                <td></td>
                <td style="text-align: left;">&nbsp;Date:</td>
                <td style="text-align: left;">&nbsp;Date:</td>
            </tr>
        </table>
        <ul class="italics">
            <li>Fill out this form completely and legibly; transact with the Unit SRA concerned during office hours.</li>
            <li>Requests not in accordance with existing Unit regulations and considerations may not be granted.</li>
        </ul>
        
        <table class="sigs-table">
            <tr>
                <td class="sigs-who">Requested By:</td>
                <td class="input sigs-input">${studentName}</td>
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
        <table class="groupmates">`;

let groupmatesList = "";
for (let i = 0; i < groupmates.length; i++) {
    groupmatesList += `
            <tr>
                <td style="text-align: right;">${i + 1}.</td>
                <td class="input">&nbsp;&nbsp;${groupmates[i]}</td>
            </tr>`;
}

html +=
    groupmatesList +
    `
        </table>
        <table class="sigs-table">
            <tr>
                <td class="sigs-who">Endorsed By:</td>
                <td class="input sigs-input">${endorser}</td>
                <td class="sigs-gap"></td>
                <td class="sigs-who">Approved By:</td> 
                <td class="input sigs-input">${approver}</td>
            </tr>
            <tr>
                <td></td>
                <td class="sigs-title">Subject Teacher/Unit Head</td>
                <td class="sigs-gap"></td>
                <td></td>
                <td class="sigs-title">SRS/SRA</td>
            </tr>
        </table>
    </div>
</body>
</html>
`;

convertHtmlToPdf(html, "./assets/pdftests/test.pdf");
