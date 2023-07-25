import fs from "fs";
import { prisma } from "~/server/db/prisma.js";
    
export default async function makeAccountabilityForm(data) {
    const pageScript = fs.readFileSync(
        "./server/app/forms/addPageNumbers/page.polyfill.txt",
        "utf8",
    );

    function getDateToday() {
        let today = new Date();
        let month = String(today.getMonth() + 1).padStart(2, "0");
        let day = String(today.getDate()).padStart(2, "0");
        let year = today.getFullYear();
        return `${month} /${day}/${year}`;
    }

    const controlNo = "INSERT CONTROL NUMBER"; // TODO: Write an algorithm for this (22-23-0001)
    const endorser = "INSERT TEACHER NAME HERE"; // TODO: Make an approval sending system
    const approver = "";

    const {
        campus,
        schoolYear,
        gradeSection,
        numberOfStudents,
        subject,
        concurrentTopic,
        unit,
        teacherInCharge,
    } = data.requestData.basicInfo;
    
    const { venue } = data.requestData.laboratorySetting;

    // ----- Get from database ---- //
    let gradeSectionValue = await prisma.gradeSection.findUnique({
        where: {
            id: gradeSection,
        },
    });
    gradeSectionValue = `${gradeSectionValue.grade}-${gradeSectionValue.section}`;

    let unitValue = await prisma.units.findUnique({
        where: {
            id: unit,
        },
    });
    unitValue = String(unitValue.name);

    // ----- Get the dates ---- //
    let dates = [];
    // eslint-disable-next-line prettier/prettier
    for (
        let i = 0;
        i < data.requestData.laboratorySetting.requestDates.length;
        i++
    ) {
        dates.push(
            // eslint-disable-next-line prettier/prettier
            `${data.requestData.laboratorySetting.requestDates[i].slice(
                8,
                10
            )}` +
                // eslint-disable-next-line prettier/prettier
                `/${data.requestData.laboratorySetting.requestDates[i].slice(
                    5,
                    7
                )}` +
                // eslint-disable-next-line prettier/prettier
                `/${data.requestData.laboratorySetting.requestDates[i].slice(
                    0,
                    4
                )}`
        );
    }
    dates = dates.join(", ");
    // ----- Endd of Getting the Dates ---- //

    
    const timeOfUse =
        `${
            data.requestData.laboratorySetting.inclusiveTimeOfUse[0].hours
        }:${String(
            data.requestData.laboratorySetting.inclusiveTimeOfUse[0].minutes
        ).padStart(2, "0")}` +
        ` to ` +
        `${
            data.requestData.laboratorySetting.inclusiveTimeOfUse[1].hours
        }:${String(
            data.requestData.laboratorySetting.inclusiveTimeOfUse[1].minutes
        ).padStart(2, "0")}`;

    const studentName = `${data.requestData.basicInfo.firstname} ${data.requestData.basicInfo.lastname}`;

    const dateRequested = getDateToday();

    const groupmates = data.requestData.basicInfo.nameOfStudents;

    // TODO: Fix this with custom components like a shopping cart
    const quantity = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
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
    ];

    // ----- Start of basic info header ----- //
    // This adds the basic info of the request
    let basicInfoHeader =
        `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>PSHS-00-F-CID-20-Ver02-Rev1 Laboratory Request and Equipment Accountability Form</title>
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
                content: 'PSHS-00-F-CID-19-Ver02-Rev0-02/01/20';
            }

            @bottom-right {
                margin-right:  0.73in;
                font-weight: bold;
                content: 'page ' counter(page); /* ' of ' counter(pages) [inconsistently working] */
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
            border-bottom: 2px solid white;
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
                    <span class="remove-botB">Grade Level and Section:</span><span class="input">&emsp;${gradeSectionValue}&emsp;&emsp;&emsp;</span>
                    <span class="right-side-basic-info"><span class="remove-botB"> &emsp; Number of Students:</span><span class="input">&emsp;${numberOfStudents}&emsp;&emsp;&emsp;</span></span>
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
                    <span class="remove-botB">Unit:</span><span class="input">&emsp;${unitValue}&emsp;</span>
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
`;
    // ----- End of basic info header ----- //

    // ----- Start of requested items table ----- //
    // This adds the rows of what the requested items
    let requestedItemsTable = `
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
    for (let i = 0; i < quantity.length; i++) {
        requestedItemsTable += `
            <tr>
                <td>${quantity[i]}</td>
                <td>${item[i]}</td>
                <td>${description[i]}</td>
                <td></td>
                <td></td>
            </tr>`;
    }
    requestedItemsTable += `
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
`;
    // ----- End of requested items table ----- //

    // ----- Start of requested by ----- //
    // This adds the instructions and terms and conditions as well as requestor and date requested
    let requestedBy = `
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
`;
    // ----- End of requested by ----- //

    // ----- Start of groupmates list ----- //
    // Dynamically add all the groupmates in a list
    let groupmatesList = `
        <p class="italics">
            If user of the lab is a group, list down the names of students.
        </p>
        <table class="groupmates">
`;
    for (let i = 0; i < groupmates.length; i++) {
        groupmatesList += `
            <tr>
                <td style="text-align: right;">${i + 1}.</td>
                <td class="input">&nbsp;&nbsp;${groupmates[i]}</td>
            </tr>`;
    }
    groupmatesList += `</table>`;
    // ----- End of groupmates list ----- //

    // ----- Start of notarization ----- //
    // Endorser and Approver are placed here
    let notarization = `
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

    return String(
            basicInfoHeader +
            requestedItemsTable +
            requestedBy +
            groupmatesList +
            notarization);
}
