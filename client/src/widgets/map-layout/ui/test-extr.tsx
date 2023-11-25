import { shipModel } from "entities/ship";
import { CoordPair, cellToBoundary, cellToLatLng, latLngToCell, polygonToCells } from "h3-js";
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

    const areal = shipModel.selectors.useAreal()

    // [latlng[0] + 0.02, latlng[1] + 0.03],

    // const polygon: number[][] = areal && areal
    // ?.length > 1 ? [
    //     [areal[0][0], areal[0][1]],
    //     [areal[0][0] + 0.02, areal[0][1]],
    //     [areal[1][0], areal[1][1]],
    //     [areal[0][0], areal[0][1] + 0.03],
    // ] : []

    console.log('areal areal polygon', polygon)


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

    // console.log(']]]]]]]]]] all sec', sec)
    // console.log(']]]]]]]]]] is_sec booty', is_sec)

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
                    fillOpacity: 0,
                    color: '#e9c564'
                }}
                positions={p as LatLngExpression[][]}
            />
        </>
    )
}