import { FC } from "react";
import { IconBattleShield, IconLoupe, IconBattleSwords, IconBattleLoupe } from "shared/assets/icons/_icons";
import { Button } from "shared/ui/Button/ui";

import styles from './styles.module.scss'
import { battleAPI, mapAPI } from "shared/api/events";
import { battleLeaveEvent } from "features/battle";
import { popoutModel } from "shared/ui/PopoutRoot";
import { mapModel } from "entities/map";

export const BattlePending: FC = () => {

    const breakBattlePending = () => {
        mapAPI.events.setMapMode('invade')
        battleAPI.events.setBattleStatus("default")
        popoutModel.events.setPopout(null)
        battleLeaveEvent.battleLeave()
    }

    return (
        <div className={styles.battlePending}>
            <div className={styles.__content}>

                <div className={styles.__shield}>
                    <IconBattleShield width={68} height={68} />
                </div>

                <div className={styles.__swords}>
                    <IconBattleSwords width={56} height={56} />
                </div>
                <div className={styles.__text}>
                    Поиск противников<span>...</span>
                </div>
                <div className={styles.__search}>
                    <IconBattleLoupe />
                </div>

                <div className={styles.button}>
                    <Button
                        className={styles.__button}
                        text="Прервать"
                        onClick={breakBattlePending}
                    />
                </div>

            </div>
        </div>
    )
}