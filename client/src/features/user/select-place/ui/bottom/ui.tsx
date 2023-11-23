import { mapModel } from "entities/map"
import { FC } from "react"
import { mapAPI, shipAPI } from "shared/api/events"
import { TLatLng } from "shared/types"
import { alertModel } from "shared/ui/alert"
import { BottomFlex } from "shared/ui/bottom-flex"
import { Button } from "shared/ui/button/ui"
import { noticeModel } from "shared/ui/notice"
import { popoutModel } from "shared/ui/popout-root"
import { tutorialModel } from "shared/ui/tutorial"

export const BottomSelectPlace: FC = () => {

    const pos = mapModel.selectors.useMapClickLatLng().latlng

    const selectPosition = (pos: TLatLng | null) => {
        if (!pos) {
            alertModel.events.setAlert({
                action: {
                    text: 'Понятно',
                    _click: () => popoutModel.events.setPopout(null)
                },
                alert: 'Выбор места',
                message: 'Коснитесь карты, чтобы выбрать место для захвата территорий'
            })
            popoutModel.events.setPopout('alert')
            return
        }

        
        if (pos[0] > 0 && pos[1] > 0) {
            mapAPI.events.setMapMode('invade')
            shipAPI.events.setPos(pos)
        } else {
            noticeModel.events.newToast({
                name: 'Упс...',
                text: 'В вашей стране пока нельзя завоевывать территории, но вы можете выбрать любое место в России или странах СНГ!',
                t: 'common'
            })
        }

        // map?.flyTo(pos, 16)

        // map?.setView(pos, 16)

        // Убрал таймер, т.к. убрал FlyTo
        // setTimeout(() => {
        // map?.setMinZoom(15)
        // }, 3000)

        setTimeout(() => {
            tutorialModel.events.setTutorial('storm')
        }, 2000)
    }

    return (
        <BottomFlex
            text="Выбор места дислокации"
            button={
                <Button
                    className=""
                    radius={10}
                    disabled={!pos}
                    text="Сохранить"
                    onClick={() => selectPosition(pos)}
                />}
        />
    )
}