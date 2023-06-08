import { createSector, TSectors } from "entities/sector/lib/createSector"
import { findPointForSector } from "entities/sector/lib/findPointForSector"
import { useState } from "react"
import { Circle, Polygon, useMapEvent } from "react-leaflet"
import { TLatLng } from "shared/types"

export function Test() {


    const [sectors, setSectors] = useState<TSectors[]>([])

    console.log('sectors', sectors.length)

    const map = useMapEvent('click', (e) => {
        const __start = +new Date()
        console.log('e.latlng', e.latlng)
        // map.setView(e.latlng, map.getZoom())


        const sect = findPointForSector([e.latlng.lat, e.latlng.lng])
        const latlng: TLatLng = [sect.point_lat, sect.point_long]

        const hexa = createSector({
            lat_0: sect.point_lat,
            long_0: sect.point_long,
            w_sector: sect.w_sector_new
        })

        setSectors(prev => ([...prev, hexa]))

        console.log('Test TIME: ', +new Date() - __start)
    })

    return (<>
        {sectors.map(sect => (
            // <Circle
            //     center={sect}
            //     pathOptions={{
            //         fillColor: 'red',
            //         fillOpacity: 0.5,
            //         color: 'red'
            //     }}
            //     radius={50}
            // />
            <Polygon
                weight={0.9}
                color="#ff1c1c"
                fillColor="#2387d800"
                positions={sect}
            />
        ))}

    </>)
}
