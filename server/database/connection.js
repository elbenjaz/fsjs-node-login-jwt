import 'dotenv/config';
import pg from 'pg';

const pool = new pg.Pool({
    host     : process.env.DB_HOST,
    database : process.env.DB_NAME,
    user     : process.env.DB_USER,
    password : process.env.DB_PASS,
    port     : process.env.DB_PORT,
    //connectionString : process.env.DB_URL,
    allowExitOnIdle : true
});

try {
    await pool.query("SELECT NOW()");
    console.log("Database connected");
} catch (error) {
    console.error("Error connecting to database:", error);
}

export default pool;
