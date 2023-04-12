import { TJoystickDirection } from "shared/types";
import { latLngPointMeterLatLng } from "./latLngPointMeterLatLng";

export const fromToDirectionPos = (
    position: [number, number],
    direction: TJoystickDirection | null,
    meters: number
) => {
    switch (direction) {
        case 'FORWARD':
            return latLngPointMeterLatLng(position[0], position[1], meters, 360)
        case 'BACKWARD':
            return latLngPointMeterLatLng(position[0], position[1], meters, 180)
        case 'RIGHT':
            return latLngPointMeterLatLng(position[0], position[1], meters, 90)
        default:
            return latLngPointMeterLatLng(position[0], position[1], meters, 270)
    }
}