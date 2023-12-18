import { FC, useEffect, useRef } from "react";
import { IconBattleLoupe } from "shared/assets/icons/_icons";

import { battleLeaveEvent } from "features/battle";
import { popoutModel } from "shared/ui/popout-root";
import { battleAPI, mapAPI } from "shared/api/events";

import { noticeModel } from "shared/ui/notice";

import bridge, { BannerAdLocation } from "@vkontakte/vk-bridge";

import styles from './styles.module.scss'

export const BattlePending: FC = () => {

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
            .then((data) => {
                console.log('add data', data)
                if (data.result) {
                    // Баннерная реклама отобразилась
                }
            })
            .catch((error) => {
                // Ошибка
                console.log('error', error);
            });

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
            battleLeave()
            setTimeout(breakBattlePending, 3000)
        }, 60000)
        return () => clearTimeout(tId.current);
    }, [])

    return (
        <div className={styles.battleRoot}>
            <div className={styles.battlePending}>
                <div className={`${styles.__content} strw2`}>
                    {/*
                    <div className={styles.__header}>
                        <div className={styles.__border}>
                            <div className={styles.name}>
                                Навигатор
                            </div>
                        </div>
                    </div>
                    */}
                    <div className={styles.__search}>
                        <IconBattleLoupe />
                    </div>
                    <div className={styles.__text}>
                        Поиск противников<span>...</span>
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
    )
}