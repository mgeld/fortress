"use strict";
const citadels = `
    CREATE TABLE citadels(
		zone_id INT NOT NULL DEFAULT 0,
		sectorId VARCHAR(15) NOT NULL,
		latlng JSON,
		level tinyint NOT NULL DEFAULT 0
	)
    character set='utf8mb4';
`;
const sectors = `
    CREATE TABLE sectors(
		id VARCHAR(15) NOT NULL primary key,
		
        number INT NOT NULL auto_increment unique,

		zone_id INT NOT NULL DEFAULT 0,

		invaders INT NOT NULL DEFAULT 0,
		defenders INT NOT NULL DEFAULT 0,

		lat DECIMAL(10, 6) NOT NULL,
		lng DECIMAL(10, 6) NOT NULL,

		areal INT NOT NULL DEFAULT 0
	)
    character set='utf8mb4';
`;
const vk_users = `
    CREATE TABLE vk_users(
        user_id BIGINT NOT NULL primary key,
		zone_id INT NOT NULL unique,
        is_msg tinyint NOT NULL DEFAULT 0,
        is_group tinyint NOT NULL DEFAULT 0,
        date INT NOT NULL DEFAULT 0
    )
    character set='utf8mb4';
`;
const zones = `
    CREATE TABLE zones(
		id INT NOT NULL auto_increment primary key,

        color tinyint NOT NULL DEFAULT 0,

        trophies smallint NOT NULL DEFAULT 0,

        coins INT NOT NULL DEFAULT 0,
        rubies smallint NOT NULL DEFAULT 0,

       -- extraction JSON
    )
    character set='utf8mb4';
`;
const hold = `
    CREATE TABLE hold(
        zone_id INT NOT NULL primary key,

        level tinyint NOT NULL DEFAULT 0,
        items JSON
    )
    character set='utf8mb4';
`;
const terrain = `
    CREATE TABLE terrain(
        zone_id INT NOT NULL primary key,

        level tinyint NOT NULL DEFAULT 0,
        sectors INT NOT NULL DEFAULT 0,
        defenders INT NOT NULL DEFAULT 0
    )
    character set='utf8mb4';
`;
const stormtrooper_corps = `
    CREATE TABLE stormtrooper_corps(
        zone_id INT NOT NULL primary key,

        level tinyint NOT NULL DEFAULT 0,
        invaders smallint NOT NULL DEFAULT 0,
        power smallint NOT NULL DEFAULT 0
    )
    character set='utf8mb4';
`;
const rank = `
    CREATE TABLE rank_conquests(
        zone_id INT NOT NULL primary key,

        level tinyint NOT NULL DEFAULT 0,
        exp INT NOT NULL DEFAULT 0
    )
    character set='utf8mb4';
`;
const pointers = `
    CREATE TABLE pointers(
		zone_id INT NOT NULL primary key,

		level INT NOT NULL DEFAULT 0,

		health INT NOT NULL DEFAULT 0,

		icon TEXT,
		name VARCHAR(20) DEFAULT '',

		color tinyint NOT NULL DEFAULT 0,

        pos_lat DECIMAL(10, 6) NOT NULL DEFAULT 0,
		pos_lng DECIMAL(10, 6) NOT NULL DEFAULT 0,

		weapons JSON,
		areal INT NOT NULL DEFAULT 0
	)
    character set='utf8mb4';
`;
const weapons = `
    CREATE TABLE weapons(
        id VARCHAR(50) primary key,
        number INT NOT NULL auto_increment unique,
        weapon tinyint NOT NULL DEFAULT 0,
        level tinyint NOT NULL DEFAULT 0,

        power smallint NOT NULL DEFAULT 0,
        distance smallint NOT NULL DEFAULT 0,

        bullets smallint NOT NULL DEFAULT 0,
        status tinyint NOT NULL DEFAULT 0

    )
    character set='utf8mb4';
`;
const bombs = `
	CREATE TABLE bombs(
		id VARCHAR(50) primary key,
		number INT NOT NULL auto_increment unique,
		bomb tinyint NOT NULL DEFAULT 0,
		counter smallint NOT NULL DEFAULT 0,
		status tinyint NOT NULL DEFAULT 0,
		level tinyint NOT NULL DEFAULT 0
	)
	character set='utf8mb4';
`;
const drop = `
    DROP TABLE hold;
    DROP TABLE sectors;
    DROP TABLE bombs;
    DROP TABLE pointers;
    DROP TABLE weapons;
    DROP TABLE rank_conquests;
    DROP TABLE stormtrooper_corps;
    DROP TABLE terrain;
    DROP TABLE zones;
    DROP TABLE vk_users;
    DROP TABLE citadels;
`;
const TABLES = `
    CREATE TABLE sectors(
        id VARCHAR(15) NOT NULL primary key,
        
        number INT NOT NULL auto_increment unique,

        zone_id INT NOT NULL DEFAULT 0,

        invaders INT NOT NULL DEFAULT 0,
        defenders INT NOT NULL DEFAULT 0,

        lat DECIMAL(10, 6) NOT NULL,
        lng DECIMAL(10, 6) NOT NULL,

        areal INT NOT NULL DEFAULT 0
    )
    character set='utf8mb4';
    CREATE TABLE bombs(
		id VARCHAR(50) primary key,
		number INT NOT NULL auto_increment unique,
		bomb tinyint NOT NULL DEFAULT 0,
		counter smallint NOT NULL DEFAULT 0,
		status tinyint NOT NULL DEFAULT 0,
		level tinyint NOT NULL DEFAULT 0
	)
	character set='utf8mb4';
    CREATE TABLE hold(
        zone_id INT NOT NULL primary key,

        level tinyint NOT NULL DEFAULT 0,
        items JSON
    )
    character set='utf8mb4';

    CREATE TABLE citadels(
        zone_id INT NOT NULL DEFAULT 0,
        sectorId VARCHAR(15) NOT NULL,
        latlng JSON,
        level tinyint NOT NULL DEFAULT 0
    )
    character set='utf8mb4';

    CREATE TABLE vk_users(
        user_id BIGINT NOT NULL primary key,
        zone_id INT NOT NULL unique
    )
    character set='utf8mb4';

    CREATE TABLE zones(
        id INT NOT NULL auto_increment primary key,

        color tinyint NOT NULL DEFAULT 0,

        trophies smallint NOT NULL DEFAULT 0,

        coins INT NOT NULL DEFAULT 0,
        rubies smallint NOT NULL DEFAULT 0
    )
    character set='utf8mb4';

    CREATE TABLE terrain(
        zone_id INT NOT NULL primary key,

        level tinyint NOT NULL DEFAULT 0,
        defenders INT NOT NULL DEFAULT 0,
        sectors INT NOT NULL DEFAULT 0
    )
    character set='utf8mb4';

    CREATE TABLE stormtrooper_corps(
        zone_id INT NOT NULL primary key,

        level tinyint NOT NULL DEFAULT 0,
        invaders smallint NOT NULL DEFAULT 0,
        power smallint NOT NULL DEFAULT 0
    )
    character set='utf8mb4';

    CREATE TABLE rank_conquests(
        zone_id INT NOT NULL primary key,
        level tinyint NOT NULL DEFAULT 0,
        exp INT NOT NULL DEFAULT 0
    )
    character set='utf8mb4';

    CREATE TABLE pointers(
        zone_id INT NOT NULL primary key,

        level INT NOT NULL DEFAULT 0,

        health INT NOT NULL DEFAULT 0,

        icon TEXT,
        name VARCHAR(20) DEFAULT '',

        color tinyint NOT NULL DEFAULT 0,

        pos_lat DECIMAL(10, 6) NOT NULL DEFAULT 0,
        pos_lng DECIMAL(10, 6) NOT NULL DEFAULT 0,

        weapons JSON,
        areal INT NOT NULL DEFAULT 0
    )
    character set='utf8mb4';

    CREATE TABLE weapons(
        id VARCHAR(50) primary key,
        number INT NOT NULL auto_increment unique,

        weapon tinyint NOT NULL DEFAULT 0,
        level tinyint NOT NULL DEFAULT 0,

        power smallint NOT NULL DEFAULT 0,
        distance smallint NOT NULL DEFAULT 0,

        bullets smallint NOT NULL DEFAULT 0,
        status tinyint NOT NULL DEFAULT 0
    )
    character set='utf8mb4';
`;
