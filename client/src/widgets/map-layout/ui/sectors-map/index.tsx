import { FC } from "react"
import { sectorMapModel } from "entities/sector"
import { Sectors } from "entities/sector"
import { useMapEvents } from "react-leaflet"
import { mapModel } from "entities/map"

// import { filterPointersStore } from "widgets/map-layout/model"

// filterPointersStore()

export const SectorsMap: FC = () => {

    const sectors = sectorMapModel.selectors.useSector()

    console.log('SectorsMap')

    useMapEvents({
        popupopen(e) {
            const latlng = e.popup.getLatLng()
            if (latlng)
                mapModel.events.setLatLngMap([latlng?.lat, latlng?.lng])

        }
    })

    return <>
        <Sectors
            zones={sectors.zones}
        />
    </>
}