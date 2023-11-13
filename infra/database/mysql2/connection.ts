import mysql from 'mysql2/promise';

const connection = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: '12345',
    database: 'musa',
    multipleStatements: true
});

// const connection = mysql.createPool({
//     host: '127.0.0.1',
//     user: 'fort-game',
//     password: 'wU2yG1pT0q',
//     database: 'fort-game',
//     multipleStatements: true
// });

export default connection;