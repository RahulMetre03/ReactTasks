import mysql from 'mysql';

const db = mysql.createConnection({
    host : "localhost",
    user : "root",
    password : "Rahulmetre@03",
    database : "students"
});

export default db;