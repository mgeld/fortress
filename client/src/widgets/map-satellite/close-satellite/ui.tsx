import { FC } from "react"
import { Button } from "shared/ui/button/ui"
import { ratingAPI } from "shared/api/events"
import { pageModel } from "shared/ui/page-root"
import { BottomFlex } from "shared/ui/bottom-flex"
import { sectorEvents } from "features/sector/get-sectors"

import styles from './styles.module.scss'
import { goBack } from "processes/go-back"

export const CloseSatellite: FC = () => {
    
    const closeSatellite = () => {
        // ratingAPI.events.selectRatingZone(null)
        sectorEvents.events.getSectorsStart()
        // pageModel.events.setPage('rating')
        goBack()
    }

    return (
        <BottomFlex
            text="Просмотр зоны"
            button={
                <Button
                    className={styles.__button}
                    radius={6}
                    text="Закрыть"
                    onClick={closeSatellite}
                />}
        />
    )
}