import { FC } from "react";
import { Button } from "shared/ui/button/ui";
// import { mapModel } from "entities/map";
// import { mapAPI, shipAPI } from "shared/api/events";
// import { citadelModel } from "entities/citadel";
// import { TLatLng } from "shared/types";
import { popoutModel } from "shared/ui/popout-root";
import { IconShip } from "widgets/panel/assets/icons";

import styles from './styles.module.scss'
// import { alertModel } from "shared/ui/alert";

export const UserDead: FC = () => {

    // const { mode } = mapModel.selectors.useMapMode()

    // const map = mapModel.selectors.useMapLayout()

    // const latlng = citadelModel.selectors.useCitadel()?.latlng || null

    // const selectPosition = (pos: TLatLng | null) => {
    //     if (!pos) return
    //     if (mode === 'battle') {
    //         mapAPI.events.setMapMode('invade')
    //     }
    //     shipAPI.events.setPos(pos)
    //     // map?.setView(pos)
    //     popoutModel.events.setPopout(null)
    // }

    // const selectCitadel = (pos: TLatLng | null) => {
    //     if (!pos) {
    //         popoutModel.events.setPopout('alert')
    //         alertModel.events.setAlert({
    //             alert: 'Цитадель',
    //             message: 'Цитадель - это центр вашей зоны и первая захваченная башня. Вы еще не захватили ни одной башни!',
    //             action: {
    //                 close: false,
    //                 text: 'Начать захват',
    //                 _click: () => popoutModel.events.setPopout(null)
    //             }
    //         })
    //         return
    //     }
    //     if (mode === 'battle') {
    //         mapAPI.events.setMapMode('invade')
    //     }
    //     shipAPI.events.setPos(pos)
    //     popoutModel.events.setPopout(null)
    // }

    return (
        <div className={styles.userDead}>
            <div className={styles.__content}>

                <div className={styles.__dead}>

                    <div className={styles.__header}>
                        <div className={styles.__left}>
                            Поражение!
                        </div>
                        <div className={styles.__right}>
                            {/* <div className={styles.__icon}>
                                <IconTrophy width={34} height={34} />
                            </div>
                            <div className={styles.__text}>
                                -25
                            </div> */}
                        </div>

                    </div>

                    <div className={styles.__main}>
                        <div className={styles.__swords}>
                            {/* <IconBattleShield width={64} height={64} /> */}
                            {/* <img src={IconBattleShield} alt="<>" /> */}
                            <IconShip width={64} height={64} />
                        </div>
                        <div className={`${styles.__info} strw1`}>
                            {/* Ваш корабль сломан. Вернуться в цитадель или продолжить наблюдение за областью? */}
                            Ваш корабль сломан. Восстановить корабль или продолжить наблюдение за областью?
                        </div>
                    </div>

                    <div className={styles.__bottom}>

                        <div className={styles.__button}>
                            <Button
                                className="strw1"
                                radius={10}
                                text="Наблюдать"
                                onClick={() => popoutModel.events.setPopout(null)}
                            />
                        </div>

                        <div className={styles.__button}>
                            <Button
                                className="strw1"
                                radius={10}
                                text="Восстановить"
                                // onClick={() => selectCitadel(latlng)}
                                onClick={() => popoutModel.events.setPopout('ship-improve-health')}
                            />
                        </div>

                    </div>
                </div>

            </div>
        </div>
    )
}