// import { TJoystickDirection } from "shared/types";
import { latLngPointMeterLatLng } from "./latLngPointMeterLatLng";
import { TFireDirection } from "features/fire/control-fire/model";
import { TLatLng } from "@ctypes/model";

export const fromToFirePos = (
    position: [number, number],
    angle: number,
    meters: number
) => {

        console.log('-----------------angle', angle)

        return latLngPointMeterLatLng(position[0], position[1], meters, angle)

}