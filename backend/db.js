require('dotenv').config();
const { Pool } = require('@vercel/postgres');

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
  ssl: { rejectUnauthorized: false }
});

pool.connect()
  .then(() => console.log("✅ Connected to Vercel Postgres!"))
  .catch(err => console.error("❌ PostgreSQL Connection Error:", err));

module.exports = pool;
