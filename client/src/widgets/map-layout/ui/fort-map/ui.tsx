import { Fort } from "entities/fort";
import { AttackFort } from "entities/fort/ui/attack-fort/ui";
import { shipModel } from "entities/ship";
import { cellToLatLng, latLngToCell } from "h3-js";
import { FC } from "react";
import { Pane } from "react-leaflet";

export const FortMap: FC = () => {
    const pos = shipModel.selectors.useShipPos()

    const h3Index = latLngToCell(pos[0], pos[1], 9)
    const hexCenterCoordinates = cellToLatLng(h3Index)
    return (
        <>
            <Pane name="q" style={{ zIndex: 3001 }}>
                <Fort pos={hexCenterCoordinates} />
            </Pane>
            <Pane name="2" style={{ zIndex: 3000 }}>
                <AttackFort pos={hexCenterCoordinates} />
            </Pane>
        </>
    )
}