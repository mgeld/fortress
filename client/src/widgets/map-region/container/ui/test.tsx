import { useState } from "react"
import { Polygon, useMapEvent } from "react-leaflet"

import {
    cellsToMultiPolygon,
    latLngToCell,
    cellToBoundary,
    cellToLatLng,
    CoordPair,
    getHexagonEdgeLengthAvg,
    edgeLength,
    radsToDegs,
    originToDirectedEdges,
    UNITS
} from "h3-js";
import { getDestination } from "entities/sector/lib/getDestination"
import { LatLngBoundsExpression } from "leaflet"

// import Icon from './lazaret.png';

const getImageBoundsForIndexH3 = (indexh3: string): LatLngBoundsExpression => {

    const [lat, lng] = cellToLatLng(indexh3)
    // console.log('getNumCells', getNumCells(8))

    const length_m = getHexagonEdgeLengthAvg(8, UNITS.m) / 2
    const length_degs = radsToDegs(edgeLength(originToDirectedEdges(indexh3)[1], UNITS.rads))

    const [lat_1, long_1] = getDestination(lat, lng, length_m, 315);
    const [lat_2, long_2] = getDestination(lat, lng, length_m, 135);

    let imageBounds = [
        [lat_1 + (length_degs / 4), long_1 + length_degs / 2],
        [lat_2 + (length_degs / 4), long_2 + length_degs / 2]
    ];

    return imageBounds as LatLngBoundsExpression
}

export function Test() {

    const [sectors, setSectors] = useState<CoordPair[][]>([])

    const [h3Indexes, setH3Indexes] = useState<string[]>([])

    const __ = useMapEvent('move', (e) => {
        console.log('_________________________')
    })

    const map = useMapEvent('click', (e) => {
        const __start = +new Date()
        // map.setView(e.latlng, map.getZoom())


        // const sect = findPointForSector([e.latlng.lat, e.latlng.lng])
        // const latlng: TLatLng = [sect.point_lat, sect.point_long]

        // const hexa = createSector({
        //     lat_0: sect.point_lat,
        //     long_0: sect.point_long,
        //     w_sector: sect.w_sector_new
        // })

        // Convert a lat/lng point to a hexagon index at resolution 7
        const h3Index = latLngToCell(e.latlng.lat, e.latlng.lng, 9);
        // -> '87283472bffffff'

        // console.log('getHexagonAreaAvg 8', getHexagonAreaAvg(8, UNITS.m2))
        // console.log('getHexagonAreaAvg 9', getHexagonAreaAvg(9, UNITS.m2))

        // Get the center of the hexagon
        const hexCenterCoordinates = cellToLatLng(h3Index);
        // -> [37.35171820183272, -122.05032565263946]

        console.log('h3Index', h3Index)

        // Get the vertices of the hexagon
        const hexBoundary: CoordPair[] = cellToBoundary(h3Index);
        console.log('hexBoundary', hexBoundary)
        setSectors(prev => ([...prev, hexBoundary]))

        if (h3Indexes.findIndex((item) => item === h3Index) !== -1) return

        setH3Indexes(prev => ([...prev, h3Index]))

        console.log('Test TIME: ', +new Date() - __start)
    })

    return <>
        <Polygon
            weight={0.9}
            fillColor="#ff1c1c"
            pathOptions={{
                fillColor: 'red',
                color: 'red'
            }}
            positions={cellsToMultiPolygon(h3Indexes)}
        />
        {/* {h3Indexes.map(h3Index => {
            return (
                <ImageOverlay
                    url={Icon}
                    bounds={getImageBoundsForIndexH3(h3Index)}
                />
            )
        })} */}
    </>

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
