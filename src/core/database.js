const { Pool } = require('pg')
require('dotenv').config()
let Config = {
    host: process.env.PG_HOST,
    port: process.env.PG_PORT,
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    database: process.env.PG_DB
}



const pool = new Pool(Config);

const poolQ = async (query = "", values = []) => {

    if (query === "" && values.length <= 0) throw new Error('Error on PoolQ, not args...')
    const client = await pool.connect()
    const res = await client.query(query, [...values])
    client.release()
    return res

}

const poolQVE = async (query = "") => {
    if (query === "") throw new Error('Error on PoolQVE, not args...')
    const client = await pool.connect()
    const res = await client.query(query)
    client.release()
    return res
}

module.exports = { pool, poolQ, poolQVE }

