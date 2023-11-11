import { useEffect } from "react"
import { useSocket } from "shared/api/socket/model"
import { randomNumber } from "shared/lib/randomNumber"

import bridge from "@vkontakte/vk-bridge";
import { userModel } from "entities/user";
import { userEvents } from "features/user/connect-user";
import { response } from "express";

type TVkUserApi = {
    id: number
    photo_50: string
    first_name: string
}

export const useApp = () => {

    const vkUserId = userModel.selectors.useVkUserId()

    const socketStatus = useSocket()

    useEffect(() => {
        // bridge.send('VKWebAppGetUserInfo').then(user => {
        //     // const _user = randomNumber(38574839 - 100000, 250449525 + 100000)
        //     console.log('VKWebAppGetUserInfo user', user)
        //     userModel.events.setVkUser(user.id)
        //     userModel.events.setName(user.first_name)
        //     userModel.events.setUserIcon(user.photo_100)
        // })
        const _user = randomNumber(38574839 - 100000, 250449525 + 100000)

        bridge.send('VKWebAppCallAPIMethod', {
            method: 'users.get',
            params: {
                user_ids: _user,
                v: '5.131',
                fields: 'photo_50',
                access_token: '10811a2f10811a2f10811a2fdf1395cae51108110811a2f7425604c5854e1fbf0d0110c'
            }
        }).then((data: { response: TVkUserApi[] }) => {
            userModel.events.setVkUser(_user)
            userModel.events.setName(data.response[0].first_name)
            userModel.events.setUserIcon(data.response[0].photo_50)
        })
    }, [])

    useEffect(() => {
        console.log('useEffect vkUserId', vkUserId)
        console.log('useEffect socketStatus', socketStatus)
        if (vkUserId > 0 && socketStatus === 'open') {
            userEvents.events.connectUser()
            // sectorEvents.events.getSectorsStart()
            return
        }
    }, [vkUserId, socketStatus])

    return {
        vkUserId,
        socketStatus
    }

}