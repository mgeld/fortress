import mysql from 'mysql2/promise';

const connection = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: '12345',
    database: 'musa'
});

// connection.query(`
//     CREATE TABLE citadels(
// 		userId BIGINT NOT NULL DEFAULT 0,
// 		sectorId VARCHAR(15) NOT NULL,
// 		latlng JSON,
// 		level INT NOT NULL DEFAULT 0
// 	)
//     character set='utf8mb4';
// `)

// connection.query(`
//     CREATE TABLE sectors(
// 		id VARCHAR(15) NOT NULL primary key,
// 		number INT NOT NULL auto_increment unique,

// 		invaders INT NOT NULL DEFAULT 0,
// 		defenders INT NOT NULL DEFAULT 0,

// 		lat DECIMAL(10, 6) NOT NULL,
// 		lng DECIMAL(10, 6) NOT NULL,

// 		user_id INT NOT NULL DEFAULT 0,
// 		areal INT NOT NULL DEFAULT 0
// 	)
//     character set='utf8mb4';
// `)

// connection.query(`
//     CREATE TABLE zones(
//         id BIGINT NOT NULL primary key,

//         sectors INT NOT NULL DEFAULT 0,
//         trophies smallint NOT NULL DEFAULT 0,

//         color tinyint NOT NULL DEFAULT 0,

//         coins INT NOT NULL DEFAULT 0,
//         rubies smallint NOT NULL DEFAULT 0
//     )
//     character set='utf8mb4';
// `)

// connection.query(`
//     CREATE TABLE pointers(
// 		id BIGINT NOT NULL primary key,
// 		zoneId INT NOT NULL auto_increment unique,
// 		health INT NOT NULL DEFAULT 0,

// 		icon TEXT,
// 		name VARCHAR(20) DEFAULT '',

// 		color tinyint NOT NULL DEFAULT 0,

// 		invaders INT NOT NULL DEFAULT 0,
// 		defenders INT NOT NULL DEFAULT 0,
// 		pos_lat DECIMAL(10, 6) NOT NULL DEFAULT 0,
// 		pos_lng DECIMAL(10, 6) NOT NULL DEFAULT 0,
// 		weapons JSON,
// 		areal INT NOT NULL DEFAULT 0
// 	)
//     character set='utf8mb4';
// `)

// weapon
// 1 - GUN
// connection.query(`
// 	CREATE TABLE weapons(
// 		id VARCHAR(50) primary key,
// 		number INT NOT NULL auto_increment unique,
// 		weapon tinyint NOT NULL DEFAULT 0,
// 		bullets smallint NOT NULL DEFAULT 0,
// 		status tinyint NOT NULL DEFAULT 0,
// 		level tinyint NOT NULL DEFAULT 0
// 	)
// 	character set='utf8mb4';
// `)

export default connection;