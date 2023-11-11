import { UNITS, cellArea, cellToLatLng, cellsToDirectedEdge, directedEdgeToCells, edgeLength, getHexagonEdgeLengthAvg, latLngToCell, originToDirectedEdges, } from "h3-js";
import { FC, useRef } from "react";
import { Circle, ImageOverlay, Pane, Rectangle, useMap, } from "react-leaflet";
import { TLatLng } from "shared/types";
import IconCitadel from './citadel.svg';
import { citadelModel } from "entities/citadel";
import { getDestination } from "entities/sector/lib/getDestination";
import { LatLngBoundsExpression } from "leaflet";
import { droneMapModel } from "entities/pointer";

import './styles.css'

type CitadelProps = {
    pos: TLatLng
}

export const Citadel: FC = () => {
    // const map = useMap()
    const pos = citadelModel.selectors.useCitadel()?.latlng || [0, 0]

    
    const size = droneMapModel.selectors.useDroneSize()
    // console.log('Citadel pos', pos)

    // if(!pos) return <></>

    // const coords = useRef(map.latLngToLayerPoint(pos))

    // const h3Index = latLngToCell(pos[0], pos[1], 9)

    // const rebro = originToDirectedEdges(h3Index)
    // const w = Math.ceil(edgeLength(rebro[0], UNITS.m) / 4)

    // console.log('//////////// mmmmmmmmmmmmmmmmm', w)

    // const hexCenterCoordinates = cellToLatLng(h3Index)

    // const lat = coords.current.x
    // const lng = coords.current.y

    // console.log('asssssssssssssssss  lat',lat)
    // console.log('assssssssssssssssss lng',lng)

    // const [lat_1, lng_1] = getDestination(pos[0], pos[1], w, 315);
    // const [lat_2, lng_2] = getDestination(pos[0], pos[1], w, 135);

    // let imageBounds: LatLngBoundsExpression = [
    //     [lat_1, lng_1],
    //     [lat_2, lng_2]
    // ];

    const p = size * 3.14 / 4
    const a = p * 0.3
    const b = p * 0.7

    const dashArrayDroneCircle = `${a} ${b}`
    const weightDroneCircle = Math.ceil(p / 4)

    return (
        <>
            <Circle
                key={1}
                className={`fort black-fort`}
                center={[
                    pos[0] - 0.00010,
                    pos[1] - 0.00002
                ]}
                pathOptions={{
                    fillColor: '#9F9BA8',
                    fillOpacity: 1,
                    stroke: false,
                }}
                radius={30}
            />
            <Circle
                key={2}
                className={`fort fort-stroke`}
                center={pos}
                pathOptions={{
                    fillColor: '#ffffff',
                    fillOpacity: 1,
                    dashArray: dashArrayDroneCircle,
                    weight: weightDroneCircle,

                    opacity: 1,
                    // lineCap: 'round',
                    // lineJoin: "miter",
                    color: '#ffffff'
                }}
                radius={30}
            />
            <Circle
                key={3}
                className={`fort fort-fill`}
                center={pos}
                pathOptions={{
                    fillColor: '#D9D9D9',
                    fillOpacity: 1,
                    stroke: false,
                }}
                radius={26}
            />
            <Circle
                key={3}
                className={`fort fort-flag`}
                center={pos}
                pathOptions={{
                    fillColor: '#8d6a6a',
                    fillOpacity: 1,
                    stroke: true,
                    color: 'white'
                }}
                radius={10}
            />
        </>
    )

    // return (
    //     <ImageOverlay
    //         url={IconCitadel}
    //         bounds={imageBounds}
    //     />
    // )
}