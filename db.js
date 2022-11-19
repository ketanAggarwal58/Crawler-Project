const Pool = require("pg").Pool;
// const dotenv = require("dotenv");


const pool = new Pool({
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    password: process.env.PGPASSWORD,
    port: process.env.PGPORT
});

// const connectDb = async () => {
//     try {
//         const client = new Client({
//             // user: process.env.PGUSER,
//             // host: process.env.PGHOST,
//             // database: process.env.PGDATABASE,
//             // password: process.env.PGPASSWORD,
//             // port: process.env.PGPORT
//         })
 
//         await client.connect().then(()=>{
//             console.log("Database Connected");
//         });
//         // const res = await client.query('SELECT * FROM some_table')
//         // console.log(res)
//         await client.end()
//     } catch (error) {
//         console.log(error)
//     }
// }
 
// async function createTable(){

//     try {
//         const client = new Client({
//             user: process.env.PGUSER,
//             host: process.env.PGHOST,
//             database: process.env.PGDATABASE,
//             password: process.env.PGPASSWORD,
//             port: process.env.PGPORT
//         })
 
//         await client.connect().then(()=>{
//             console.log("Database Connected");
//         });

//         // await client.query(`DROP DATABASE IF EXISTS ${process.env.PGDATABASE};`);
//         // await client.query(`CREATE DATABASE ${process.env.PGDATABASE};`);
//         const res = await client.query(`SELECT EXISTS (
//             SELECT FROM 
//                 pg_tables
//             WHERE 
//                 schemaname = 'public' AND 
//                 tablename  = 'actor'
//             );`);

//         if(res === true){
//             await client.query(`CREATE TABLE results(Brand VARCHAR(255), Title VARCHAR(255), Image VARCHAR(255) PRIMARY KEY);`).then(() => {
//                 console.log("Table Created Successfuly");
//             });
//         }else{
//             console.log("Table Already Exist");
//         }
//         await client.end()
//     } catch (error) {
//         console.log(error)
//     }
    
// }

// async function fetchData(){
//     let res;
//     try{
//         const client = new Client({
//             user: process.env.PGUSER,
//             host: process.env.PGHOST,
//             database: process.env.PGDATABASE,
//             password: process.env.PGPASSWORD,
//             port: process.env.PGPORT
//         })

//         await client.connect().then(()=>{
//             console.log("Database Connected");
//         });

//         res = await client.query(`SELECT * FROM results;`);
//         console.log(res.rows);
//         return res.rows;

//     }catch(error){
//         console.log(error);
//     }

//     return res.rows;
// }

// async function InsertData(params) {
//     try {
//         const client = new Client({
//             user: process.env.PGUSER,
//             host: process.env.PGHOST,
//             database: process.env.PGDATABASE,
//             password: process.env.PGPASSWORD,
//             port: process.env.PGPORT
//         });

//         await client.connect().then(()=>{
//             console.log("Database Connected");
//         });

//         await client.query(`INSERT INTO results(Brand, Title, Image) VALUES ('${params[0]}', '${params[1]}', '${params[2]}')`).then(() => {
//             console.log("Data Inserted Successfully");
//         })
//     } catch (error) {
//         console.log(error);
//     }
// }

module.exports = pool;
// module.exports = {connectDb, createTable, InsertData, fetchData};