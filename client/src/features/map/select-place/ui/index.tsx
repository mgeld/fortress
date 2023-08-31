import { mapModel } from "entities/map";
import { PointIcon } from "entities/pointer/ui/point-icon";
import { userModel } from "entities/user";
import { CoordPair, cellToBoundary, latLngToCell, } from "h3-js";
import { FC, useEffect, useState } from "react";
import { Polygon, useMap, useMapEvent } from "react-leaflet";
import { TLatLng } from "shared/types";

type TSector = {
    latlng: TLatLng
    bounds: CoordPair[]
}
export const MapSelectPlace: FC = () => {

    const clickPos = mapModel.selectors.useMapClickLatLng()

    const [sector, setSector] = useState<TSector | null>(null)

    const { userIcon } = userModel.selectors.useUser()

    console.log('MapSelectPlace')

    const setPolygon = (pos: TLatLng) => {
        mapModel.events.setLatLngMap(pos)

        // Convert a lat/lng point to a hexagon index at resolution 7
        const h3Index = latLngToCell(pos[0], pos[1], 9);

        setSector({
            latlng: pos,
            bounds: cellToBoundary(h3Index)
        })
    }

    useEffect(() => {
        if (sector === null && clickPos.latlng) {
            setPolygon(clickPos.latlng)
        }
    }, [clickPos, sector])

    useMapEvent('click', (e) => {
        setPolygon([e.latlng.lat, e.latlng.lng])
    })

    if (!sector) return <></>

    return <>
        <PointIcon
            position={sector.latlng}
            userIcon={userIcon}
            userName={'Вы'}
        />
        <Polygon
            weight={0.9}
            fillColor="#ff1c1c"
            pathOptions={{
                fillColor: 'red',
                color: 'red',
                opacity: 0
            }}
            positions={sector.bounds}
        />
    </>
}