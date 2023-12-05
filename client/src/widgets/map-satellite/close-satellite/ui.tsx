import { sectorEvents } from "features/sector/get-sectors"
import { FC } from "react"
import { ratingAPI } from "shared/api/events"
import { BottomFlex } from "shared/ui/bottom-flex"
import { Button } from "shared/ui/button/ui"
import { pageModel } from "shared/ui/page-root"

export const CloseSatellite: FC = () => {

    // const pos = mapModel.selectors.useMapClickLatLng().latlng
    // const map = mapModel.selectors.useMapLayout()

    const closeSatellite = () => {
        ratingAPI.events.selectRatingZone(null)
        sectorEvents.events.getSectorsStart()
        pageModel.events.setPage('map')
    }

    return (
        <BottomFlex
            text="Просмотр зоны"
            button={
                <Button
                    className=""
                    radius={6}
                    // disabled={!pos}
                    text="Закрыть"
                    onClick={closeSatellite}
                />}
        />
    )
}