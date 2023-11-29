
import { icon as createIcon } from 'leaflet'

export const pointIcon = (iconUrl: string) => {
    return createIcon({
        className: "icon-pointer",
        iconUrl,
        iconSize: [54, 70],
        iconAnchor: [27, 70],
    })
}