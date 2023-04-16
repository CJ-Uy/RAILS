campus = "EASTERN VISAYAS";
controlNo = "22-23-0001";
schoolYear = "2022-2023";
gradeSection = "11-C";

html = `<!DOCTYPE html>
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
            width: calc(8.27-(0.955+0.92))in;
            margin-top: 0.955in;
            margin-left: 0.92in;
        }
        h1 h2 {
            font-weight: bold;
        }
        #heading > h1 {
            margin-bottom: 0.02in; 
        }
        .input {
            border-bottom: 2px solid black;
        }
    </style>
</head>
<body>
    <divn id="content">
        <div id="heading">
            <h1>PHILIPPINE SCIENCE HIGH SCHOOL SYSTEM</h1>
            <h1>CAMPUS: &nbsp;&nbsp; <span class="input">${campus}</span> </h1>
        </div>

        <h2>LABORATORY REQUEST AND EQUIPMENT ACCOUNTABILITY FORM</h2>

        <table id="basic-info">
            <tr>
                <td>
                Control No: <span class="input">${controlNo}</span> &nbsp;&nbsp;&nbsp;
                SY: <span class="input">${schoolYear}</span>
                </td>
            </tr>
            <tr>
                <td>
                    Grade Level and Section: <span class="input">${gradeSection}</span>
                </td>
            </tr>
        </table>
    </div>

    
</body>
</html>
`;

module.exports = html;