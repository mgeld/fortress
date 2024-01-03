import { FC } from "react"
import { IconClose } from "shared/assets/icons/_icons"

import { popoutModel } from "shared/ui/popout-root"

// import { noticeModel } from "shared/ui/notice"
// import bridge from "@vkontakte/vk-bridge"

import styles from './styles.module.scss'
import { FButton } from "shared/ui/fbutton/ui"
import { battleConnectEvent } from "features/battle"
import { battleCreateAPI } from "shared/api/battle-create"

// type TShareLinkProps = {
//     header: string
//     text: string
//     link: string
// }

export const BattleConnect: FC = () => {

    return (
        // <div className={styles.violetScreenRoot}>
        <div className={styles.battleConnect}>

            <div className={`${styles.__content}`}>

                <div className={styles.header}>

                    <div className={styles.__border}>
                        <div className={styles.name}>
                            Битва на арене
                        </div>
                        <div
                            onClick={() => popoutModel.events.setPopout(null)}
                            className={styles.close}
                        >
                            <IconClose width={16} height={16} fill="#ffffff" />
                        </div>
                    </div>

                    <div className={styles.__whiteEffect}><div /></div>

                </div>

                <div className={styles.main}>
                    <div className={styles.__text}>
                        Ваша цель — захватить 5 фортов (башен) раньше, чем ваш соперник. Однако не забывайте, что если ваш корабль будет уничтожен, то битва завершится мгновенно.
                    </div>
                    <div className={styles.button}>
                        <div className={styles.__link}>
                            <FButton
                                width={140}
                                color="gold"
                                text="С друзьями"
                                _click={() => {
                                    popoutModel.events.setPopout(null)
                                    battleCreateAPI()
                                }}
                            />
                        </div>
                        <div className={styles.__battle}>
                            <FButton
                                width={100}
                                color="violet"
                                text="В БОЙ"
                                _click={() => {
                                    popoutModel.events.setPopout(null)
                                    battleConnectEvent.events.battleConnect(null)
                                }}
                            />
                        </div>
                    </div>
                </div>

            </div>
        </div>
        // </div>
    )
}