import { FC } from "react"
import { Pane } from "react-leaflet"
import { Pointers } from "./pointers/pointers"
import { UserPoint } from "./user-pointer/point"
import { MapDrones } from "./map-drones"

export const PointersMap: FC = () => {
    return <>
        <Pane name="pointers" style={{ zIndex: 3002 }}>
            <UserPoint />
            <Pointers />
        </Pane>

        <MapDrones />
    </>
}