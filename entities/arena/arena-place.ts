import { TLatLng } from "../../common-types/model";
import { Areal } from "../pointer/areal";

class Place {
    static readonly _places: TLatLng[] = [
        [55.53, 37.545],
        [59.79, 30.255],
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
    private _bounds: [TLatLng, TLatLng]

    private constructor(place: TLatLng, bounds: [TLatLng, TLatLng]) {
        this._place = place
        this._bounds = bounds
    }

    public static create(place: TLatLng) {
        return new ArenaPlace(
            place,
            Areal.getBounds(place)
        )
    }

    public static nextPlace() {
        const place = PlaceLatLong.generate()
        return new ArenaPlace(
            place,
            Areal.getBounds(place)
        )
    }

    get place(): TLatLng {
        return this._place
    }

    get bounds(): [TLatLng, TLatLng] {
        return this._bounds
    }
}

export {
    ArenaPlace
}