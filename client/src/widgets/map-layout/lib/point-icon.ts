
import { icon as createIcon } from 'leaflet'

export const pointIcon = (iconUrl: string) => createIcon({
    className: "__iconPointer",
    iconUrl,
    iconSize: [50, 86],
    iconAnchor: [25, 78],
})