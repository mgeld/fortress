import { CoordPair, cellToBoundary, cellToLatLng, cellsToMultiPolygon, latLngToCell, polygonToCells } from "h3-js";
import { LatLngExpression } from "leaflet";
import { FC } from "react";
import { Polygon, useMapEvent } from "react-leaflet";

export const TestExtr: FC = () => {

    const polygon: number[][] = [
        [55.88686527264868, 37.42767333984376],
        [55.89533634081859, 37.85064697265626],
        [55.59231544773266, 37.8424072265625],
        [55.60472974085067, 37.22717285156251]
    ];

    const polygs = polygonToCells(polygon, 9);

    const p: CoordPair[][] = []

    let sec: number = 0
    let is_sec: number = 0
    
    polygs.map(item => {
        const pos = cellToLatLng(item);
        sec ++
        const r = Math.ceil((+pos[0].toString().slice(-1) + +pos[1].toString().slice(-1)))
        if(r <=6) {
            is_sec ++
            p.push(cellToBoundary(item))
        }
    })

    console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> sec', sec)
    console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> is_sec', is_sec)

    const map = useMapEvent('click', (e) => {
        const h3Index = latLngToCell(e.latlng.lat, e.latlng.lng, 9);

        console.log('e.latlng.lat, e.latlng.lng', e.latlng.lat, e.latlng.lng)
    })

    return (
        <>
            {/* <Polygon
                weight={0.9}
                pathOptions={{
                    fillColor: 'red',
                    color: 'black'
                }}
                positions={cellsToMultiPolygon(polygs)}
            ></Polygon> */}
            <Polygon
                weight={0.9}
                pathOptions={{
                    fillColor: 'red',
                    color: 'black'
                }}
                positions={p as LatLngExpression[][]}
            />
        </>
    )
}