
import { icon as createIcon } from 'leaflet'

export const pointIcon = (iconUrl: string) => {

    console.log('10 pointIcon')

    return createIcon({
        className: "__iconPointer",
        iconUrl,
        iconSize: [50, 86],
        iconAnchor: [25, 78],
    })
}