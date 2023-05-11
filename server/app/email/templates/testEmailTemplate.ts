import { EmailTemplate } from "../types/emailTypes";

const testEmailTemplate = function (name: String): EmailTemplate {
    const html = `
    <!DOCTYPE html>
    <html>
        <head></head>
        <title>Test Email</title>
        <body>
            <h1>Hello ${name}!</h1>
            <p>I hope this automated email finds you well!</p>
        </body>
    </html>`;
    const text = `SAMPLE TEXT`;
    return {
        html,
        text,
    };
};

export default testEmailTemplate;
