import { FC } from "react";
import { IconShieldSword, IconTrophy } from "shared/assets/icons/_icons";
import { Button } from "shared/ui/Button/ui";

import { arenaModel } from "entities/arena";
import { userModel } from "entities/user";

import styles from './styles.module.scss'
import { mapModel } from "entities/map";
import { mapAPI, userAPI } from "shared/api/events";
import { citadelModel } from "entities/citadel";
import { TLatLng } from "shared/types";
import { popoutModel } from "shared/ui/PopoutRoot";

export const UserDead: FC = () => {

    const { mode } = mapModel.selectors.useMapMode()

    const map = mapModel.selectors.useMapLayout()

    const latlng = citadelModel.selectors.useCitadel()?.latlng || null

    const selectPosition = (pos: TLatLng | null) => {
        console.log('selectPosition pos', pos)
        if (!pos) return
        mode === 'battle' && mapAPI.events.setMapMode('invade')
        userAPI.events.setPos(pos)
        map?.flyTo(pos, 15)
        popoutModel.events.setPopout(null)
    }

    return (
        <div className={styles.userDead}>
            <div className={styles.__content}>

                <div className={styles.__dead}>

                    <div className={styles.__header}>
                        <div className={styles.__left}>
                            Поражение!
                        </div>
                        <div className={styles.__right}>
                            <div className={styles.__icon}>
                                <IconTrophy width={34} height={34} />
                            </div>
                            <div className={styles.__text}>
                                -25
                            </div>
                        </div>

                    </div>

                    <div className={styles.__main}>
                        <div className={styles.__swords}>
                            <IconShieldSword width={64} height={64} />
                        </div>
                        <div className={styles.__info}>
                            Ваш дрон был уничтожен. Вернитесь в цитадель или продолжите наблюдать за областью
                        </div>
                    </div>

                    <div className={styles.__bottom}>

                        <div className={styles.__button}>
                            <Button
                                className=""
                                text="Наблюдать"
                                onClick={() => popoutModel.events.setPopout(null)}
                            />
                        </div>

                        <div className={styles.__button}>
                            <Button
                                className=""
                                text="В цитадель"
                                onClick={() => selectPosition(latlng)}
                            />
                        </div>

                    </div>
                </div>

            </div>
        </div>
    )
}