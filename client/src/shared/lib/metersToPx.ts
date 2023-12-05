const metersPerPixel = function (latitude: number, zoomLevel: number) {
    var earthCircumference = 40075017;
    var latitudeRadians = latitude * (Math.PI / 180);
    return earthCircumference * Math.cos(latitudeRadians) / Math.pow(2, zoomLevel + 8);
};

export const metersToPx = function (latitude: number, meters: number, zoomLevel: number) {
    return meters / metersPerPixel(latitude, zoomLevel);
};