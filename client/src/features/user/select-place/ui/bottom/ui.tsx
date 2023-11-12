import { mapModel } from "entities/map"
import { FC } from "react"
import { mapAPI, shipAPI } from "shared/api/events"
import { TLatLng } from "shared/types"
import { BottomFlex } from "shared/ui/bottom-flex"
import { Button } from "shared/ui/button/ui"

export const BottomSelectPlace: FC = () => {

    const pos = mapModel.selectors.useMapClickLatLng().latlng

    const map = mapModel.selectors.useMapLayout()

    const selectPosition = (pos: TLatLng | null) => {
        if (!pos) return
        mapAPI.events.setMapMode('invade')

        // map?.flyTo(pos, 16)
        map?.setView(pos, 16)

        console.log('flyTo 0000')

        // Убрал таймер, т.к. убрал FlyTo
        // setTimeout(() => {
            shipAPI.events.setPos(pos)
            // map?.setMinZoom(15)
        // }, 3000)

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