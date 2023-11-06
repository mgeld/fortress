import { FC } from "react";

import { extractionModel } from "entities/unit";
import { TExtrTypes } from "@ctypes/model";

import styles from './styles.module.scss'

import { popoutModel } from "shared/ui/PopoutRoot";
import { IconGun, IconHealth, IconHold, IconLevelUp, IconPlus, IconShip, IconStorm } from "./assets/icons";

export const ShipPopout: FC = () => {

    const extr: TExtrTypes | null = extractionModel.selectors.useExtraction()?.id || null

    // if (!extr) return <></>

    const closePopout = () => popoutModel.events.setPopout(null)

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
                                    <span>2 ур.</span>
                                    <div className={styles.levelUp}>
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
                                    <span>87 / 100</span>
                                    <div className={styles.levelUp}>
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

                    <div
                        onClick={() => popoutModel.events.setPopout('storm-corps')}
                        className={styles.item}
                    >
                        <div className={styles.__icon}>
                            <IconStorm width={36} height={36} />
                        </div>
                        <div className={styles.__info}>
                            <div className={styles.head}>
                                <div className={styles.name}>Штурмой корпус</div>
                                <div className={styles.level}>
                                    <span>3 ур.</span>
                                </div>
                            </div>
                            <div className={styles.description}>
                                <div className={styles.name}>Штурмовики</div>
                                <div className={styles.counter}>87 / 100</div>
                            </div>

                        </div>
                    </div>

                    <div
                        onClick={() => popoutModel.events.setPopout('gun')}
                        className={styles.item}
                    >
                        <div className={styles.__icon}>
                            <IconGun width={40} height={40} />
                        </div>
                        <div className={styles.__info}>
                            <div className={styles.head}>
                                <div className={styles.name}>Плазменная пушка</div>
                                <div
                                    // onClick={() => popoutModel.events.setPopout('use-item')}
                                    className={styles.level}
                                >
                                    <span>2 ур.</span>
                                </div>
                            </div>
                            <div className={styles.description}>
                                <div className={styles.name}>Снаряды</div>
                                <div className={styles.counter}>90 / 150</div>
                            </div>
                        </div>
                    </div>

                    <div
                        onClick={() => popoutModel.events.setPopout('hold')}
                        className={styles.item}
                    >
                        <div className={styles.__icon}>
                            <IconHold width={32} height={32} />
                        </div>
                        <div className={styles.__info}>
                            <div className={styles.head}>
                                <div className={styles.name}>Загрузочный трюм</div>
                                <div className={styles.level}>
                                    <span>1 ур.</span>
                                </div>
                            </div>
                            <div className={styles.description}>
                                <div className={styles.name}>Загруженность</div>
                                <div className={styles.counter}>80 / 100</div>
                            </div>
                        </div>
                    </div>
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


