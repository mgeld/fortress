"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArenaPlace = void 0;
const areal_1 = require("../pointer/areal");
class Place {
    static random() {
        return Place._places[Math.floor(Math.random() * Place._places.length)];
    }
}
Place._places = [
    [55.53, 37.545],
    [59.79, 30.255],
];
class PlaceLatLong {
    static generate() {
        return Place.random();
    }
}
class ArenaPlace {
    constructor(place, bounds) {
        this._place = place;
        this._bounds = bounds;
    }
    static create(place) {
        return new ArenaPlace(place, areal_1.Areal.getBounds(place));
    }
    static nextPlace() {
        const place = PlaceLatLong.generate();
        return new ArenaPlace(place, areal_1.Areal.getBounds(place));
    }
    get place() {
        return this._place;
    }
    get bounds() {
        return this._bounds;
    }
}
exports.ArenaPlace = ArenaPlace;
