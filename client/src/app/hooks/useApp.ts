import { useEffect } from "react"
import { useSocket } from "shared/api/socket/model"
import { randomNumber } from "shared/lib/randomNumber"

import bridge from "@vkontakte/vk-bridge";
import { userModel } from "entities/user";
import { userEvents } from "features/user/connect-user";

export const useApp = () => {

    const userId = userModel.selectors.useUserId()

    const socketStatus = useSocket()

    useEffect(() => {
        bridge.send('VKWebAppGetUserInfo').then(user => {
            const _user = randomNumber(250449525 - 100000, 250449525 + 100000)
            console.log('VKWebAppGetUserInfo user', user)
            userModel.events.setUser(_user)
            userModel.events.setName(user.first_name)
            userModel.events.setUserIcon(user.photo_100)
        })
    }, [])

    useEffect(() => {
        console.log('useEffect userId', userId)
        console.log('useEffect socketStatus', socketStatus)
        if (userId > 0 && socketStatus === 'open') {
            userEvents.events.connectUser()
            // sectorEvents.events.getSectorsStart()
            return
        }
    }, [userId, socketStatus])

    return {
        userId,
        socketStatus
    }

}