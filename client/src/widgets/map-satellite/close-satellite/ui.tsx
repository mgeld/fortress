import { FC } from "react"
import { Button } from "shared/ui/button/ui"
import { BottomFlex } from "shared/ui/bottom-flex"
import { goBack } from "processes/go-back"
import { sectorEvents } from "features/sector/get-sectors"

import styles from './styles.module.scss'

export const CloseSatellite: FC = () => {
    
    const closeSatellite = () => {
        sectorEvents.events.getSectorsStart()
        goBack()
    }

    return (
        <BottomFlex
            text="Режим просмотра"
            button={
                <Button
                    className={`${styles.__button} strw1`}
                    radius={8}
                    text="Закрыть"
                    onClick={closeSatellite}
                />}
        />
    )
}