export const latLngPointMeterLatLng = (lat: number, long: number, meters: number, direction: number): [number, number] => {
    /*
    * Возвращает новые координаты через meters метров от начальных координатов по направлению direction
    */
   
    // Радиус Земли в метрах
    const R = 6378137;

    // Преобразование расстояния в радианы
    const distRad = meters / R;

    // Преобразование азимута в радианы
    const brngRad = direction * Math.PI / 180;

    // Преобразование lat1 и lon1 в радианы
    const lat1Rad = lat * Math.PI / 180;
    const lon1Rad = long * Math.PI / 180;

    // Рассчитываем новую широту и долготу
    const lat2Rad = Math.asin(Math.sin(lat1Rad) * Math.cos(distRad) + Math.cos(lat1Rad) * Math.sin(distRad) * Math.cos(brngRad));
    const lon2Rad = lon1Rad + Math.atan2(Math.sin(brngRad) * Math.sin(distRad) * Math.cos(lat1Rad), Math.cos(distRad) - Math.sin(lat1Rad) * Math.sin(lat2Rad));

    // Преобразование новой широты и долготы в градусы
    const lat2 = lat2Rad * 180 / Math.PI;
    const lon2 = lon2Rad * 180 / Math.PI;

    return [lat2, lon2]
}