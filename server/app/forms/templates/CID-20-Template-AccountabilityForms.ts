import { FormTemplate } from "../types/formTypes";

const accountabilityFormsTemplate = function (
    campus: String,
    controlNo: String,
    schoolYear: String,
    gradeSection: String,
    numStudents: String,
    subject: String,
    concurrentTopic: String,
    unit: String,
    teacherInCharge: String,
    venue: String,
    dates: String,
    timeOfUse: String,

    quantity: String[],
    item: String[],
    description: String[],
    issued: String[],
    returned: String[],

    studentName: String,
    dateRequested: String,
    groupmates: String[],
    endorser: String,
    approver: String,
    formCode: String
): FormTemplate {
    // TODO: Make a parser to make dynamic table lengths
    const html = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>PSHS-00-F-CID-20-Ver02-Rev1 Laboratory Request and Equipment Accountability Form</title>
            <style>
                * {
                    font-family: "Calibri";
                    font-size: 19px;
                    margin: 0;
                    padding: 0;
                }
                @page {
                    size: A4;
                    margin: 0;
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
                    width: 210mm;
                    margin-top: 0.955in;
                    margin-left: 0.92in;
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
                    border-bottom: 2px solid black;
                }
                table {
                    width: 100%;
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
                    border-bottom: 2px solid black;
                }
                .remove-botB {
                    border-bottom: 3px solid white;
                }
                #request {
                    text-align: center;
                }
                #request td {
                    border: 1px solid black;
                    white-space: pre-wrap; /* allow wrapping of white space */
                    word-wrap: break-word; /* break long words */
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
            </style>
        </head>
        <body>
            <div id="content">
                <div id="heading">
                    <h1>PHILIPPINE SCIENCE HIGH SCHOOL SYSTEM</h1>
                    <h1>CAMPUS: &nbsp;&nbsp; <span class="input">${campus}</span> </h1>
                </div>

                <h2 id="title">LABORATORY REQUEST AND EQUIPMENT ACCOUNTABILITY FORM</h2>

                <table id="basic-info">
                    <tr id="basic-info-1">
                        <td>
                            Control No: <span class="input">${controlNo}</span> &nbsp;&nbsp;&nbsp;
                            SY: <span class="input">${schoolYear}</span>
                        </td>
                    </tr>
                    <tr class="expander">
                        <td>
                            <span class="remove-botB">Grade Level and Section: </span><span class="input">${gradeSection}</span>
                            <span class="right-side-basic-info"> <span class="remove-botB">&nbsp;Number of Students: </span><span class="input">${numStudents} </span></span>
                        </td>
                    </tr>
                    <tr class="expander">
                        <td>
                            <span class="remove-botB">Subject: </span><span class="input">${subject}</span>
                            <span class="right-side-basic-info"><span class="remove-botB">&nbsp;Concurrent Topic: </span><span class="input">${concurrentTopic}</span> </span>
                        </td>
                    </tr>
                    <tr class="expander">
                        <td>
                            <span class="remove-botB">Unit: </span><span class="input">${unit}</span>
                            <span class="right-side-basic-info"><span class="remove-botB">&nbsp;Teacher-In-Charge: </span><span class="input">${teacherInCharge}</span> </span>
                        </td>
                    </tr>
                    <tr class="expander">
                        <td>
                            <span class="remove-botB">Venue of Experiment: </span><span class="input">${venue}</span>
                        </td>
                    </tr>
                    <tr>
                        <td class="expander">
                            <span class="remove-botB">Date/Inclusive Dates: </span><span class="input">${dates}</span>
                            <span class="right-side-basic-info"><span class="remove-botB">Inclusive Time of Use: </span><span class="input">${timeOfUse}</span> </span>
                        </td>
                    </tr>
                </table>

                Materials/Equipment Needed:
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
                        <td class="return">Received by:</td>
                        <td class="return">Received and<br>Inspected by:</td>
                    </tr>
                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td class="return">Date:</td>
                        <td class="return">Date:</td>
                    </tr>
                </table>
                <ul class="italics">
                    <li>Fill out this form completely and legibly; transact with the Unit SRA concerned during office hours.</li>
                    <li>Requests not in accordance with existing Unit regulations and considerations may not be granted.</li>
                </ul>
                
                <table id="sigs-table">
                    <tr>
                        <td>Requested By:</td>
                        <td>${studentName}</td>
                        <td>Date Requested:</td> 
                        <td>${dateRequested}</td>
                    </tr>
                    <tr>
                        <td></td>
                        <td>Teacher/Student</td>
                    </tr>
                </table>
                <p class="italics">
                    If user of the lab is a group, list down the names of students.
                </p>
                <table class="groupmates">
                    <tr>
                        <td>${groupmates[0]}</td>
                    </tr>
                    <tr>
                        <td>${groupmates[1]}</td>
                    </tr>
                    <tr>
                        <td>${groupmates[2]}</td>
                    </tr>
                    <tr>
                        <td>${groupmates[3]}</td>
                    </tr>
                    <tr>
                        <td>${groupmates[4]}</td>
                    </tr>
                </table>
                <table id="sigs-table">
                    <tr>
                        <td>Endorsed By:</td>
                        <td>${endorser}</td>
                        <td>Approved By:</td> 
                        <td>${approver}</td>
                    </tr>
                    <tr>
                        <td></td>
                        <td>Subject Teacher/Unit Head</td>
                        <td></td>
                        <td>SRS/SRA</td>
                    </tr>
                </table>
                <h2>${formCode}</h2>
            </div>
        </body>
        </html>
    `;
    return { html };
};

export default accountabilityFormsTemplate;
