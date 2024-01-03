import { cellsToMultiPolygon, gridRingUnsafe, latLngToCell } from "h3-js";
import { FC } from "react";
import { Polygon } from "react-leaflet";
import { TLatLng } from "shared/types";

type GridProps = {
    pos: TLatLng
}

export const Grid: FC<GridProps> = ({ pos }) => {

    const disk = gridRingUnsafe(latLngToCell(pos[0], pos[1], 9), 1)
    const disk2 = gridRingUnsafe(latLngToCell(pos[0], pos[1], 9), 3)

    return (
        <Polygon
            weight={0.9}
            pathOptions={{
                fill: false,
                color: '#994cff',
                weight: 1
            }}
            positions={cellsToMultiPolygon([...disk, ...disk2])}
        ></Polygon>
    )
}