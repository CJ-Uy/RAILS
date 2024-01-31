import "dotenv/config";
import mysql from "mysql";

export default defineEventHandler(async (event) => {
    const body = await readMultipartFormData(event);
    const dbBackup = body[0].data.toString("utf8");

    const connection = mysql.createConnection({
        host: process.env.HOST,
        user: process.env.USER,
        password: process.env.PASSWORD,
        database: process.env.DATABASE,
        multipleStatements: true,
    });

    connection.connect();

    connection.query(
        "DROP DATABASE IF EXISTS " + process.env.DATABASE,
        (err, results, fields) => {
            if (err) {
                return "CRITICAL ERROR";
            }
        },
    );

    connection.query(
        "DROP DATABASE IF EXISTS " + process.env.DATABASE,
        (err, results, fields) => {
            if (err) {
                return "CRITICAL ERROR";
            }
        },
    );

    connection.query(
        "CREATE DATABASE " + process.env.DATABASE,
        (err, results, fields) => {
            if (err) {
                return "CRITICAL ERROR";
            }
        },
    );

    connection.query("USE " + process.env.DATABASE, (err, results, fields) => {
        if (err) {
            return "CRITICAL ERROR";
        }
    });

    connection.query(dbBackup, (err, results, fields) => {
        if (err) {
            console.error(err);
            return "CRITICAL ERROR";
        }
    });

    connection.end();

    return "Loading from backup was successful!";
});
