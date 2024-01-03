import { FC, useEffect, useRef } from "react";
import { IconBattleLoupe } from "shared/assets/icons/_icons";

import { popoutModel } from "shared/ui/popout-root";

import { battleLeaveEvent } from "features/battle";
import { battleAPI, mapAPI } from "shared/api/events";

import { noticeModel } from "shared/ui/notice";

import bridge, { BannerAdLocation } from "@vkontakte/vk-bridge";

import { selectors } from "entities/arena/model/arena";

import styles from './styles.module.scss'

export const BattlePending: FC = () => {

    const battleStatus = selectors.useBattleStatus()?.data

    const breakBattlePending = () => {
        mapAPI.events.setMapMode('invade')
        battleAPI.events.setBattleStatus("default")
        popoutModel.events.setPopout(null)
    }

    const battleLeave = () => battleLeaveEvent.battleLeave()

    const tId = useRef<ReturnType<typeof setTimeout>>()

    useEffect(() => {
        bridge.send('VKWebAppShowBannerAd', {
            banner_location: BannerAdLocation.BOTTOM
        })
        return () => {
            bridge.send('VKWebAppHideBannerAd')
        }
    }, [])

    useEffect(() => {
        tId.current = setTimeout(() => {
            noticeModel.events.newToast({
                name: 'Тут такое дело...',
                text: 'Время ожидания противника истекло. Попробуйте снова',
                t: 'common'
            })
            breakBattlePending()
            battleLeave()
            // setTimeout(breakBattlePending, 3000)
        }, 120000)
        return () => clearTimeout(tId.current);
    }, [])

    return (
        <div className={styles.battleRoot}>
            <div className={styles.battlePending}>
                <div className={`${styles.__content} strw2`}>

                    <div className={styles.__in}>

                        <div className={styles.__search}>
                            <IconBattleLoupe />
                        </div>

                        <div className={styles.__text}>
                            {battleStatus === 'wait' ? 'Ожидание противников' : 'Поиск противников'}<span>...</span>
                        </div>

                        <div className={styles.button}>
                            <div
                                className={styles.__break}
                                onClick={() => {
                                    breakBattlePending()
                                    battleLeave()
                                }}
                            >
                                Прервать
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </div>
    )
}