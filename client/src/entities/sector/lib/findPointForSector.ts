import { TLatLng } from "shared/types";
import { getDestination } from "./getDestination";
import { getDistanceFromLatLonInKm } from "./getDistanceFromLatLonInKm";

// Длина одной стороны сектора
// export const distSector = 0.002
export const distSector = 1.000

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
    let w_sector = 0;

    // Индекс для подсчета секторов долготы во вложенном цикле
    let indexLng = 0;

    // Добавляем позицию сектора по долготе. Сектор находится на уровне или сдвинут вниз?
    let lat_min_point = 0;

    // Добавляем сюда линию сектора, чтобы сравнить с геоточкой и выснить, какой сектор выбрать: нижний или верхний?
    // let sector_lat_top_line = 0;





    while (while_lat <= g_lat) {

        whlt = while_lat;
        whlg = while_long;

        // Находим длину (долготу) сектора в конкретной позиции широты (половина от полной ширины сектора)
        const distance_x = getDistanceFromLatLonInKm(while_lat, while_long, while_lat, (while_long + distSector)) * 1000; //////////////////////

        // Находим длину (долготу) сектора в конкретной позиции широты (половина от полной ширины сектора)
        // const distance_x = getDistanceFromLatLonInKm(while_lat, while_long, while_lat, (while_long + distSector)) * 1000;
        w_sector = distance_x;

        const height_sector = distance_x * Math.sqrt(3); // Половина высота сектора

        let sector_3_part = (distance_x * 2) - (distance_x / 2); // Третья часть от полной ширины сектора сектора

        const [lat_point_new_x, long_point_new_x] = getDestination(while_lat, while_long, height_sector, 0); ///////////////////////////////

        if (lat_point_new_x < g_lat) {

            while_lat = lat_point_new_x;

        } else {

            console.log('((((((((((((((((((((((((((((((((((((((((((((((((((((((')

            // Если тут 1, то это нижний сектор, иначе верхний
            let bottom_long = false;

            let long_min_point = 0;

            while (while_long <= g_long) {

                long_min_point = while_long;

                indexLng++;

                if (bottom_long) {

                    // Если это нижний сектор, то мы сдвигаем сектор вниз наполовину от ее высоты
                    const [lat_point_new_y, long_point_new_y] = getDestination(while_lat, while_long, (height_sector / 2), 180);
                    lat_min_point = lat_point_new_y;

                    // Обновляем счетчик
                    bottom_long = false;

                } else {

                    lat_min_point = while_lat;
                    bottom_long = true;

                }

                // Переходим ко следующему сектору по долготе
                // const [lat_point_new_y, long_point_new_y] = getDestination(while_lat, while_long, sector_3_part, 90);
                // while_long = long_point_new_y;

                while_long = while_long + ((distSector * 2) - (distSector / 2))

            }

            // Сохраняем временные координаты
            point_long = long_min_point;
            point_lat = lat_min_point;

            // Отодвигаем точку на половины ширины и высоты сектора, т.к. координаты сектора в цикле заканчиваются в левом нижнем углу
            const [point_lat_y, point_long_y] = getDestination(point_lat, point_long, (height_sector / 2), 0);
            const [point_lat_x, point_long_x] = getDestination(point_lat_y, point_long_y, (sector_3_part / 2), 90);

            // Находим верхню линию сектора и получаем ее широту
            const [point_lat_top, point_long_top] = getDestination(point_lat_x, point_long_x, (height_sector / 2), 0);

            // Сохраняем линию, чтобы сравнить ее с геоточкой
            // Добавляем сюда линию сектора, чтобы сравнить с геоточкой и выснить, какой сектор выбрать: нижний или верхний?
            let sector_lat_top_line = point_lat_top;

            // Если сектор находится не на уровне, а внизу и геоточка находится в верхнем сегменте, выбираем верхний сектор
            if (indexLng % 2 === 0 && g_lat > sector_lat_top_line) {
                const [point_lat_x_top, point_long_x_top] = getDestination(point_lat_x, point_long_x, height_sector, 0);

                point_lat = point_lat_x_top;
                point_long = point_long_x_top;

            } else {
                point_lat = point_lat_x;
                point_long = point_long_x;
            }

            break;

        }

    }

    console.log('findPointForSector TIME: ', +new Date() - __start)

    return {
        whlt,
        whlg,
        index: indexLng,
        point_lat,
        point_long,
        w_sector_new: w_sector
    }

}