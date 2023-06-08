import { arenaModel } from "entities/arena"
import { userModel } from "entities/user"
import { changeBattleStatusListener } from "features/battle/battle-change-status/model"
import { FC, useCallback, useEffect } from "react"
import { useMap } from "react-leaflet"

export const ArenaMap: FC = () => {
    const battleStatus = arenaModel.selectors.useBattleStatus().data
    const map = useMap()

    const userPos = userModel.selectors.useUser().pos

    console.log('ArenaMap')

    const arenaFlyTo = useCallback(function(zoomChange?: number) {
        map.flyTo(userPos, map.getZoom() - (zoomChange || 0))
    }, [userPos, map])

    useEffect(() => {

        console.log('ArenaMap useEffect battleStatus', battleStatus)

        if (battleStatus === 'pending') {
            console.log('ArenaMap useEffect pending')
            arenaFlyTo()
        }

        else if (battleStatus === 'over') {
            console.log('ArenaMap useEffect OVER________________________')
            arenaFlyTo(2)
        }

    }, [battleStatus, arenaFlyTo])

    return <>
    </>
}