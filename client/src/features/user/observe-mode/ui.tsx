import { FC } from "react";
import { Button } from "shared/ui/button/ui";

import { BottomFlex } from "shared/ui/bottom-flex";
import { TLatLng } from "@ctypes/model";
import { popoutModel } from "shared/ui/popout-root";
import { alertModel } from "shared/ui/alert";
import { mapModel } from "entities/map";
import { mapAPI, shipAPI } from "shared/api/events";
import { citadelModel } from "entities/citadel";

export const ObserveMode: FC = () => {
    
    const { mode } = mapModel.selectors.useMapMode()

    const latlng = citadelModel.selectors.useCitadel()?.latlng || null

    // userModel.events.resetUser()

    const selectCitadel = (pos: TLatLng | null) => {
        if (!pos) {
            popoutModel.events.setPopout('alert')
            alertModel.events.setAlert({
                alert: 'Цитадель',
                message: 'Цитадель - это центр вашей зоны и первая захваченная башня. Вы еще не захватили ни одной башни!',
                action: {
                    close: false,
                    text: 'Начать захват',
                    _click: () => popoutModel.events.setPopout(null)
                }
            })
            return
        }
        if (mode === 'battle') {
            mapAPI.events.setMapMode('invade')
        }
        shipAPI.events.setPos(pos)
        popoutModel.events.setPopout(null)
    }


    return (
        <BottomFlex
            text="Режим наблюдателя"
            button={<Button
                className=""
                text="В цитадель"
                onClick={() => selectCitadel(latlng)}
            />}
        />
    )
}