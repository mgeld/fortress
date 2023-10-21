import { UNITS, cellArea, cellToLatLng, cellsToDirectedEdge, directedEdgeToCells, edgeLength, getHexagonEdgeLengthAvg, latLngToCell, originToDirectedEdges, } from "h3-js";
import { FC, useRef } from "react";
import { Circle, ImageOverlay, Pane, Rectangle, useMap, } from "react-leaflet";
import { TLatLng } from "shared/types";
import IconCitadel from './citadel.svg';
import { citadelModel } from "entities/citadel";
import './styles.css'
import { getDestination } from "entities/sector/lib/getDestination";
import { LatLngBoundsExpression } from "leaflet";

type CitadelProps = {
    pos: TLatLng
}

export const Citadel: FC = () => {
    const map = useMap()
    const pos = citadelModel.selectors.useCitadel()?.latlng || [0, 0]
    console.log('Citadel pos', pos)

    // if(!pos) return <></>

    // const coords = useRef(map.latLngToLayerPoint(pos))

    const h3Index = latLngToCell(pos[0], pos[1], 9)

    const rebro = originToDirectedEdges(h3Index)
    const w = Math.ceil(edgeLength(rebro[0], UNITS.m) / 4)

    console.log('//////////// mmmmmmmmmmmmmmmmm', w)

    // const hexCenterCoordinates = cellToLatLng(h3Index)

    // const lat = coords.current.x
    // const lng = coords.current.y

    // console.log('asssssssssssssssss  lat',lat)
    // console.log('assssssssssssssssss lng',lng)

    const [lat_1, lng_1] = getDestination(pos[0], pos[1], w, 315);
    const [lat_2, lng_2] = getDestination(pos[0], pos[1], w, 135);

    let imageBounds: LatLngBoundsExpression = [
        [lat_1, lng_1],
        [lat_2, lng_2]
    ];

    return (
        <ImageOverlay
            url={IconCitadel}
            bounds={imageBounds}
        />
    )
}