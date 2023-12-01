import { latLngPointMeterLatLng } from "./latLngPointMeterLatLng";

export const fromToFirePos = (
    position: [number, number],
    angle: number,
    meters: number
) => {
        return latLngPointMeterLatLng(position[0], position[1], meters, angle)
}