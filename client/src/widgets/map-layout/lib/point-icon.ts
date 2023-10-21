
import { icon as createIcon } from 'leaflet'

export const pointIcon = (iconUrl: string) => {

    console.log('10 pointIcon')

    return createIcon({
        className: "__iconPointer",
        iconUrl,
        iconSize: [54, 70],
        iconAnchor: [27, 70],
    })
}