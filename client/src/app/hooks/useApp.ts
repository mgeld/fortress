import { useEffect } from "react"
import { useSocket } from "shared/api/socket/model"

import { userModel } from "entities/user";
import { userAPI } from "shared/api/events";
import { popoutModel } from "shared/ui/popout-root";
import { lockModel } from "shared/ui/lock-screen";
import { lostInternet } from "processes/lost-internet";
import { userEvents } from "features/user/connect-user";
import { reSocketClose } from "processes/socket/socket-close";

import bridge from "@vkontakte/vk-bridge";
import { getHashToSectorId } from "shared/lib/get-hash-to-sector-id";
import { getSatelliteFortAPI } from "shared/api/get-satellite-fort";
import { cellToLatLng } from "h3-js";
import { pageModel } from "shared/ui/page-root";
import { mapSatelliteModel } from "entities/map";

// type TVkUserApi = {
//     id: number
//     photo_50: string
//     first_name: string
// }

userEvents.startConnectUser()

export const useApp = () => {

    const vkUserId = userModel.selectors.useVkUserId()

    const zoneId = userModel.selectors.useUserId()

    const socketStatus = useSocket()

    useEffect(() => {

        window.addEventListener("offline", lostInternet);

        bridge.send('VKWebAppGetUserInfo').then(user => {
            setTimeout(() => userModel.events.setVkUser(user.id), 1500)
        })

        // const _user = randomNumber(38574839 - 100000, 250449525 + 100000)

        // bridge.send('VKWebAppCallAPIMethod', {
        //     method: 'users.get',
        //     params: {
        //         user_ids: _user,
        //         v: '5.131',
        //         fields: 'photo_50',
        //         access_token: '10811a2f10811a2f10811a2fdf1395cae51108110811a2f7425604c5854e1fbf0d0110c'
        //     }
        // }).then((data: { response: TVkUserApi[] }) => {
        //     userModel.events.setVkUser(_user)
        //     userModel.events.setName(data.response[0].first_name)
        //     userModel.events.setUserIcon(data.response[0].photo_50)
        // })
    }, [])

    useEffect(() => {
        if (vkUserId > 0 && socketStatus === 'close') {
            popoutModel.events.setPopout('lock-screen')
            lockModel.events.setLockScreen({
                action: {
                    text: 'Переподключиться',
                    _click: () => reSocketClose()
                },
                alert: 'Соединение потеряно',
                message: 'Соединение с сервером было потеряно. Возможно, вы подключились к игре с другого устройства.'
            })
        }

        if (vkUserId > 0 && socketStatus === 'open') {
            // const url = window.location.search;

            userAPI.events.connectUser()

            // sectorEvents.events.getSectorsStart()
            return
        }

        // if (vkUserId === 0 && socketStatus === 'no-init') {
        //     popoutModel.events.setPopout('load-app')
        // } else {
        //     popoutModel.events.setPopout(null)
        // }

    }, [vkUserId, socketStatus])

    useEffect(() => {

        // if (!zoneId) return

        const sectorId = getHashToSectorId()


        if (sectorId && socketStatus === 'open') {

            bridge.send("VKWebAppSetLocation", { "location": "" });
            window.history.pushState("", document.title, window.location.pathname + window.location.search);

            const latlng = cellToLatLng(sectorId)

            mapSatelliteModel.events.setMapSatellite({
                type: 'sector',
                latlng: latlng,
                name: 'Сектор',
            })
            pageModel.events.setPage('map-satellite')
            getSatelliteFortAPI(latlng)
        }

    }, [socketStatus])



    return {
        zoneId,
        socketStatus
    }

}