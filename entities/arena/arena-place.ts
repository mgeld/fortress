import { TLatLng } from "../../common-types/model";

class Place {
    static readonly _places: TLatLng[] = [
        [43.3112, 45.7023],
        [43.3203, 45.7023],
    ]
    public static random() {
        return Place._places[Math.floor(Math.random() * Place._places.length)]
    }
}

class PlaceLatLong {
    public static generate() {
        return Place.random()
    }
}

class ArenaPlace {
    private _place: TLatLng

    private constructor(place: TLatLng) {
        this._place = place
    }

    public static nextPlace(): TLatLng {
        return new ArenaPlace(PlaceLatLong.generate()).place
    }

    get place(): TLatLng {
        return this._place
    }
}

export {
    ArenaPlace
}