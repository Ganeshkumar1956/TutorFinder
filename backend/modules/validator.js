const { Client } = require('pg');
require('dotenv').config({path:'../.env'});
async function isValid(user, passwd) {
    const qry = "SELECT uid FROM users WHERE username=$1 and password=$2"; 
    let client;

    try {
        client = new Client({
            user: process.env.PGUSER,
            password: process.env.PGPASSWD,
            host: process.env.PGHOST,
            database: process.env.PGDB,
            port: process.env.PGPORT
        });
        
        await client.connect();
        
        const res = await client.query(qry, [user, passwd]);
        
        if (res.rowCount === 0) {
            return -1;
        } else if (res.rowCount === 1) {
            return res.rows[0].uid;
        }
    } catch (err) {
        console.log("Error: " + err);
    } finally {
        if (client) {
            await client.end();
        }
    }
}

module.exports = isValid;
