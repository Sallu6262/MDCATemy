import dotenv from "dotenv";
dotenv.config();

import app from "./app.js";
import pool, { waitForDb } from "./database.js";

const port = +process.env.SERVER_PORT || 3000;
const host = process.env.SERVER_HOST || "0.0.0.0";

const start = async () => {
    await waitForDb();
    const server = app.listen(port, host, () => {
        console.log(`QuizBuilder-Mini API listening on http://${host}:${port}`);
    });

    const shutdown = (signal) => () => {
        console.log(`Received ${signal}, shutting down...`);
        server.close(async () => {
            await pool.end();
            process.exit(0);
        });
    };
    process.on("SIGTERM", shutdown("SIGTERM"));
    process.on("SIGINT",  shutdown("SIGINT"));
};

start().catch(err => {
    console.error("Fatal startup error:", err);
    process.exit(1);
});
