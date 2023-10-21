import { cellToLatLng, latLngToCell } from "h3-js";
import { FC } from "react";
import { Circle } from "react-leaflet";
import { TLatLng } from "shared/types";

import './styles.css'

type FortProps = {
    pos: TLatLng
}

export const Fort: FC<FortProps> = ({ pos }) => {

    const h3Index = latLngToCell(pos[0], pos[1], 9)
    const hexCenterCoordinates = cellToLatLng(h3Index)

    return (
        <>
            <Circle
                key={1+h3Index}
                className={`fort black-fort`}
                center={[
                    hexCenterCoordinates[0] - 0.00010,
                    hexCenterCoordinates[1] - 0.00002
                ]}
                pathOptions={{
                    fillColor: '#9F9BA8',
                    fillOpacity: 1,
                    stroke: false,
                }}
                radius={30}
            />
            <Circle
                key={2+h3Index}
                className={`fort fort-stroke`}
                center={hexCenterCoordinates}
                pathOptions={{
                    fillColor: '#ffffff',
                    fillOpacity: 1,
                    stroke: false,
                }}
                radius={30}
            />
            <Circle
                key={3+h3Index}
                className={`fort fort-fill`}
                center={hexCenterCoordinates}
                pathOptions={{
                    fillColor: '#D9D9D9',
                    fillOpacity: 1,
                    stroke: false,
                }}
                radius={26}
            />
        </>
    )
}