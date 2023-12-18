import { FC } from "react"
import { mapModel } from "entities/map"
import { Sectors } from "entities/sector"
import { useMapEvents } from "react-leaflet"
import { sectorMapModel } from "entities/sector"

export const SectorsMap: FC = () => {

    const sectors = sectorMapModel.selectors.useSector()

    console.log('SectorsMap sectors', sectors)

    useMapEvents({
        popupopen(e) {
            const latlng = e.popup.getLatLng()
            if (latlng)
                mapModel.events.setLatLngMap([latlng?.lat, latlng?.lng])
        }
    })

    return <>
        {sectors.zones.map(zoneItem => {
            // Временно
            let color = zoneItem.zone.zone_id === -1 ? 0 : zoneItem.zone.color

            return (
                <Sectors
                    key={zoneItem.zone.zone_id}
                    zoneItem={zoneItem}
                    color={color}
                    fillOpacity={0.6}
                />
            )
        })}
    </>
}