import "dotenv/config";
import mysql from "mysql2/promise";

export default defineEventHandler(async (event) => {
    const body = await readMultipartFormData(event);
    const dbBackup = body[0].data.toString("utf8");

    const connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        multipleStatements: true,
    });

    try {
        await connection.query(dbBackup);
        console.log("Backup loaded");
        await connection.end();
        return "Loading from backup was successful!";
    } catch (err) {
        await connection.end();
        return "CRITICAL ERROR: " + err.message;
    }
});
