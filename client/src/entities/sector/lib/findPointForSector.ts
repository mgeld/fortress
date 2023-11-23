import { TLatLng } from "shared/types";
import { getDestination } from "./getDestination";
import { getDistanceFromLatLonInKm } from "./getDistanceFromLatLonInKm";

// Длина одной стороны сектора
export const distSector = 0.002
// export const distSector = 1.000

export const findPointForSector = (geo_point: TLatLng) => {

    const __start = +new Date()

    // Эти координаты передаем на сервер, чтобы строить линию относительно них
    let whlt = 0;
    let whlg = 0;

    // Координты, которые передаются через getPos в addSectors
    // Местоположение метки, к примеру
    const [g_lat, g_long] = geo_point;

    let point_lat = 0,
        point_long = 0;

    let while_lat = 0; // Начало отсчета широты
    let while_long = 0; // Начало отсчета долготы

    // Ширина сектора. Значение будет добавлено в цикле
    // let w_sector = 0;

    // Индекс для подсчета секторов долготы во вложенном цикле
    let indexLng = 0;

    // Добавляем позицию сектора по долготе. Сектор находится на уровне или сдвинут вниз?
    let lat_min_point = 0;

    // Добавляем сюда линию сектора, чтобы сравнить с геоточкой и выснить, какой сектор выбрать: нижний или верхний?
    // let sector_lat_top_line = 0;

    // Находим длину (долготу) сектора в конкретной позиции широты (половина от полной ширины сектора)

    const distance_x = distSector

    let width_sector = 0
    let sector_3_part = 0 // Третья часть от полной ширины сектора сектора

    const height_sector = distance_x * Math.sqrt(3); // Полная высота сектора

    let distance_long = 0
    while (while_lat <= g_lat) {

        whlt = while_lat;
        whlg = while_long;

        // const [lat_point_new_x, long_point_new_x] = getDestination(while_lat, while_long, height_sector, 0) ///////////////////////////////

        const lat_point_new_x = while_lat + height_sector

        if (lat_point_new_x < g_lat) {
            while_lat = lat_point_new_x;
        } else {

            // Если тут 1, то это нижний сектор, иначе верхний
            let bottom_long = false;

            let long_min_point = 0;

            width_sector = getDistanceFromLatLonInKm(while_lat, while_long, while_lat + distance_x, while_long + 0) * 1000;
            const [lat_x, distance_long] = getDestination(while_lat, while_long, width_sector, 90);
            sector_3_part = (distance_long * 2) - (distance_long / 2)

            while (while_long <= g_long) {

                long_min_point = while_long;

                indexLng++;

                if (bottom_long) {

                    // Если это нижний сектор, то мы сдвигаем сектор вниз наполовину от ее высоты
                    const lat_point_new_y = while_lat - (height_sector / 2)
                    lat_min_point = lat_point_new_y;

                    // Обновляем счетчик
                    bottom_long = false;

                } else {

                    lat_min_point = while_lat;
                    bottom_long = true;

                }

                // Переходим ко следующему сектору по долготе
                while_long = while_long + sector_3_part

            }

            // Сохраняем временные координаты
            point_lat = lat_min_point;
            point_long = long_min_point;

            // Отодвигаем точку на половины ширины и высоты сектора, т.к. координаты сектора в цикле заканчиваются в левом нижнем углу
            const point_lat_x = point_lat + (height_sector / 2)
            const point_long_x = point_long + (sector_3_part / 2)

            // Находим верхню линию сектора и получаем ее широту
            const point_lat_top = point_lat_x + (height_sector / 2)
            const point_long_top = point_long_x

            // Сохраняем линию, чтобы сравнить ее с геоточкой
            // Добавляем сюда линию сектора, чтобы сравнить с геоточкой и выснить, какой сектор выбрать: нижний или верхний?
            let sector_lat_top_line = point_lat_top;

            // Если сектор находится не на уровне, а внизу и геоточка находится в верхнем сегменте, выбираем верхний сектор
            if (indexLng % 2 === 0 && g_lat > sector_lat_top_line) {

                point_lat = point_lat_x + height_sector;
                point_long = point_long_x;

            } else {
                point_lat = point_lat_x;
                point_long = point_long_x;
            }

            break;

        }

    }

    // const w_sector = getDistanceFromLatLonInKm(point_lat, point_long, point_lat + distance_long, (point_long )) * 1000;

    return {
        whlt,
        whlg,
        index: indexLng,
        point_lat,
        point_long,
        w_sector_new: width_sector
    }

}