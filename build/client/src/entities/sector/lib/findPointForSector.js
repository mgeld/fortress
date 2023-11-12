"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findPointForSector = exports.distSector = void 0;
const getDestination_1 = require("./getDestination");
const getDistanceFromLatLonInKm_1 = require("./getDistanceFromLatLonInKm");
exports.distSector = 0.002;
const findPointForSector = (geo_point) => {
    const __start = +new Date();
    let whlt = 0;
    let whlg = 0;
    const [g_lat, g_long] = geo_point;
    let point_lat = 0, point_long = 0;
    let while_lat = 0;
    let while_long = 0;
    let indexLng = 0;
    let lat_min_point = 0;
    const distance_x = exports.distSector;
    let width_sector = 0;
    let sector_3_part = 0;
    const height_sector = distance_x * Math.sqrt(3);
    let distance_long = 0;
    while (while_lat <= g_lat) {
        whlt = while_lat;
        whlg = while_long;
        const lat_point_new_x = while_lat + height_sector;
        if (lat_point_new_x < g_lat) {
            while_lat = lat_point_new_x;
        }
        else {
            let bottom_long = false;
            let long_min_point = 0;
            width_sector = (0, getDistanceFromLatLonInKm_1.getDistanceFromLatLonInKm)(while_lat, while_long, while_lat + distance_x, while_long + 0) * 1000;
            const [lat_x, distance_long] = (0, getDestination_1.getDestination)(while_lat, while_long, width_sector, 90);
            sector_3_part = (distance_long * 2) - (distance_long / 2);
            while (while_long <= g_long) {
                long_min_point = while_long;
                indexLng++;
                if (bottom_long) {
                    const lat_point_new_y = while_lat - (height_sector / 2);
                    lat_min_point = lat_point_new_y;
                    bottom_long = false;
                }
                else {
                    lat_min_point = while_lat;
                    bottom_long = true;
                }
                while_long = while_long + sector_3_part;
            }
            point_lat = lat_min_point;
            point_long = long_min_point;
            const point_lat_x = point_lat + (height_sector / 2);
            const point_long_x = point_long + (sector_3_part / 2);
            const point_lat_top = point_lat_x + (height_sector / 2);
            const point_long_top = point_long_x;
            let sector_lat_top_line = point_lat_top;
            if (indexLng % 2 === 0 && g_lat > sector_lat_top_line) {
                point_lat = point_lat_x + height_sector;
                point_long = point_long_x;
            }
            else {
                point_lat = point_lat_x;
                point_long = point_long_x;
            }
            break;
        }
    }
    console.log('findPointForSector TIME: ', +new Date() - __start);
    return {
        whlt,
        whlg,
        index: indexLng,
        point_lat,
        point_long,
        w_sector_new: width_sector
    };
};
exports.findPointForSector = findPointForSector;
