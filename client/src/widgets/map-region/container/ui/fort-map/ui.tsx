import { Fort } from "entities/fort";
import { Pane } from "react-leaflet";
import { TLatLng } from "@ctypes/model";
import { shipModel } from "entities/ship";
import { debounce } from "shared/lib/debounce";
import { cellToLatLng, latLngToCell } from "h3-js";
import { FC, useEffect, useMemo, useRef, useState } from "react";
import { AttackFort } from "entities/fort/ui/attack-fort/ui";

export const FortMap: FC = () => {
    const pos = shipModel.selectors.useShipPos()

    const [value, setValue] = useState<TLatLng>(pos)

    const throttled = useRef(debounce((_pos: TLatLng) => {
        setValue(_pos)
    }, 300))
  
    useEffect(() => throttled.current(pos), [pos])
    
    const h3Index = latLngToCell(value[0], value[1], 9)
    const hexCenterCoordinates = cellToLatLng(h3Index)

    return (
        <>
            <Pane name="q1" style={{ zIndex: 3001 }}>
                <Fort pos={hexCenterCoordinates} />
            </Pane>
            <Pane name="q2" style={{ zIndex: 3000 }}>
                {useMemo(() => <AttackFort pos={hexCenterCoordinates} />, [hexCenterCoordinates])}
            </Pane>
        </>
    )
}