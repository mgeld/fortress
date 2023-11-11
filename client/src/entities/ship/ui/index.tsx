import { FC } from "react";

import { popoutModel } from "shared/ui/popout-root";
import { IconHealth, IconLevelUp, IconPlus, IconShip } from "./assets/icons";
import { StormCorps } from "./storm-corps";
import { Gun } from "./gun";
import { Hold } from "./hold";

import styles from './styles.module.scss'
import { shipModel } from "..";
import { ShipLevel, TShipLevel } from "../lib/ship-level";

export const ShipPopout: FC = () => {

    const closePopout = () => popoutModel.events.setPopout(null)

    const health = shipModel.selectors.useShipHealth()
    const level = shipModel.selectors.useShipLevel()

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
                                <div className={`${styles.name}`}>Корабль</div>
                                <div className={styles.level}>
                                    <span>{level} ур.</span>
                                    <div
                                        onClick={() => popoutModel.events.setPopout('ship-level-up')}
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
                                    </div></div>
                                <div className={styles.counter}>
                                    <span>{health} / {ShipLevel.getMaxHealth(level as TShipLevel)}</span>
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
                            // onClick={() => onUseExtraction()}
                            className={styles.button}
                        >
                            Закрыть
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )

}


