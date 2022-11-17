const { Client } = require("pg");
const dotenv = require("dotenv");

const connectDb = async () => {
    try {
        const client = new Client({
            user: process.env.PGUSER,
            host: process.env.PGHOST,
            database: process.env.PGDATABASE,
            password: process.env.PGPASSWORD,
            port: process.env.PGPORT
        })
 
        await client.connect().then(()=>{
            console.log("Database Connected");
        });
        // const res = await client.query('SELECT * FROM some_table')
        // console.log(res)
        await client.end()
    } catch (error) {
        console.log(error)
    }
}
 
const createTable = async (name) => {

    try {
        const client = new Client({
            user: process.env.PGUSER,
            host: process.env.PGHOST,
            database: process.env.PGDATABASE,
            password: process.env.PGPASSWORD,
            port: process.env.PGPORT
        })
 
        await client.connect().then(()=>{
            console.log("Database Connected");
        });

        await client.query(`DROP DATABASE IF EXISTS ${process.env.PGDATABASE};`);
        await client.query(`CREATE DATABASE ${process.env.PGDATABASE};`);
        const res = await client.query(`CREATE TABLE results();`)

        console.log(res);
        await client.end()
    } catch (error) {
        console.log(error)
    }
    
}

module.exports = {connectDb, createTable};