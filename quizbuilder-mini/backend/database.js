import pg from "pg";

const { Pool } = pg;

const pool = new Pool({
    user:     process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    host:     process.env.DATABASE_HOST,
    port:     +process.env.DATABASE_PORT,
    database: process.env.DATABASE_NAME,
});

export const waitForDb = async (retries = 30, delayMs = 1000) => {
    for (let i = 0; i < retries; i++) {
        try {
            await pool.query("SELECT 1");
            console.log("Connected to database.");
            return;
        } catch (err) {
            console.log(`DB not ready (attempt ${i + 1}/${retries}): ${err.code || err.message}`);
            await new Promise(r => setTimeout(r, delayMs));
        }
    }
    throw new Error("Could not connect to database after retries.");
};

export default pool;
