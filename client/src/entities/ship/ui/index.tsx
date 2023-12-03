import { FC } from "react";

import { popoutModel } from "shared/ui/popout-root";
import { IconHealth, IconLevelUp, IconPlus, IconShip } from "./assets/icons";
import { StormCorps } from "./storm-corps";
import { Gun } from "./gun";
import { Hold } from "./hold";

import styles from './styles.module.scss'
import { shipModel } from "..";
import { ShipLevel, TShipLevel } from "../lib/ship-level";
import { userModel } from "entities/user";
import { alertModel } from "shared/ui/alert";

export const ShipPopout: FC = () => {

    const closePopout = () => popoutModel.events.setPopout(null)

    const rankLevel = userModel.selectors.useRankLevel()

    const health = shipModel.selectors.useShipHealth()
    const shipLevel = shipModel.selectors.useShipLevel()

    const levelUp = () => {
        if (ShipLevel.isUpLevel(shipLevel, rankLevel)) {
            popoutModel.events.setPopout('ship-level-up')
        } else {
            popoutModel.events.setPopout('alert')
            alertModel.events.setAlert({
                alert: 'Уровень Корабля',
                message: 'У вас максимальный уровень Корабля на текущий Ранг Завоеваний. Для повышения уровня, сначала неободимо повысить Ранг Завоеваний.',
                action: {
                    close: false,
                    text: 'Закрыть',
                    _click: () => popoutModel.events.setPopout("storm-corps")
                }
            })
        }
    }

    return (
        <div className={styles.ship}>

            <div className={styles.header}>
                <div className={styles.__border}>
                    Корабль
                </div>
            </div>

            <div className={styles.__content}>

                <div className={styles.__ship}>
                    <div className={styles.__flex}>
                        <div className={styles.__info}>

                            <div className={styles.head}>
                                <div className={`${styles.name}`}>
                                    Корабль
                                </div>
                                <div className={styles.level}>
                                    <span>{shipLevel} ур.</span>
                                    <div
                                        onClick={levelUp}
                                        className={styles.levelUp}
                                    >
                                        <IconLevelUp width={18} height={18} />
                                    </div>
                                </div>
                            </div>

                            <div className={styles.description}>

                                <div className={styles.name}>
                                    <div className={styles.icon}>
                                        <IconHealth width={24} height={24} />
                                    </div>
                                    <div className={styles.text}>
                                        Здоровье
                                    </div>
                                </div>

                                <div className={styles.counter}>
                                    <span>
                                        {health} / {ShipLevel.getMaxHealth(shipLevel as TShipLevel)}
                                    </span>
                                    <div
                                        onClick={() => popoutModel.events.setPopout('ship-improve-health')}
                                        className={styles.levelUp}
                                    >
                                        <IconPlus width={18} height={18} />
                                    </div>
                                </div>

                            </div>

                        </div>
                        <div className={styles.__icon}>
                            <IconShip width={64} height={64} />
                        </div>
                    </div>

                </div>

                <div className={styles.items}>
                    <StormCorps />
                    <Gun />
                    <Hold />
                </div>

                <div className={styles.actions}>
                    <div className={styles.inside}>
                        <div
                            onClick={closePopout}
                            className={`${styles.button} ${styles.__white}`}
                        >
                            Закрыть
                        </div>
                        <div
                            onClick={levelUp}
                            className={styles.button}
                        >
                            Улучшить
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )

}


