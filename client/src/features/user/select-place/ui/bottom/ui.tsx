import { mapModel } from "entities/map"
import { FC } from "react"
import { mapAPI, userAPI } from "shared/api/events"
import { TLatLng } from "shared/types"
import { BottomFlex } from "shared/ui/BottomFlex"
import { Button } from "shared/ui/Button/ui"

export const BottomSelectPlace: FC = () => {

    const pos = mapModel.selectors.useMapClickLatLng().latlng

    const map = mapModel.selectors.useMapLayout()

    const selectPosition = (pos: TLatLng | null) => {
        if (!pos) return
        mapAPI.events.setMapMode('invade')

        map?.flyTo(pos, 15)

        console.log('flyTo 0000')

        setTimeout(() => {
            userAPI.events.setPos(pos)
            // map?.setMinZoom(15)
        }, 3000)

        console.log('pos', pos)
    }

    return (
        <BottomFlex
            text="Выбор места дислокации"
            button={
                <Button
                    className=""
                    disabled={!pos}
                    text="Сохранить"
                    onClick={() => selectPosition(pos)}
                />}
        />
    )
}