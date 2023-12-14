import { TLatLng } from "shared/types"

export const getPosition = (): Promise<TLatLng> => {
    return new Promise((res, rej) => {
        navigator.geolocation.getCurrentPosition(position => {
            res([
                position.coords.latitude,
                position.coords.longitude,
            ] as TLatLng)
        }, e => {
            res([0, 0] as TLatLng)
        })
    })
}