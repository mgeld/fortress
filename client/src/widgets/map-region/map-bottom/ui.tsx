import { mapModel } from "entities/map"
import { BottomSelectPlace } from "features/user/select-place/ui/bottom"
import { FC } from "react"
import { Control } from "../control"

export const MapBottom: FC = () => {

    const mode = mapModel.selectors.useMapMode().mode

    if (mode === 'invade') return <Control />

    if (mode === 'battle') return <Control />

    if (mode === 'select-place') return <BottomSelectPlace />

    else return <></>
}