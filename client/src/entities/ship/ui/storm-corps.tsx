import { FC } from "react";

import styles from './styles.module.scss'

import { popoutModel } from "shared/ui/popout-root";
import { IconStorm } from "./assets/icons";
import { stormModel } from "entities/storm-corps";
import { StormCorpsLevel, TStormCorpsLevel } from "entities/storm-corps/lib/storm-corps-level";

export const StormCorps: FC = () => {

    const invaders = stormModel.selectors.useStormInvaders()
    const level = stormModel.selectors.useStormLevel()

    return (
        <div
            onClick={() => popoutModel.events.setPopout('storm-corps')}
            className={styles.item}
        >
            <div className={styles.__icon}>
                <IconStorm width={36} height={36} />
            </div>
            <div className={styles.__info}>
                <div className={styles.head}>
                    <div className={styles.name}>Штурмовой корпус</div>
                    <div className={styles.level}>
                        <span>{level} ур.</span>
                    </div>
                </div>
                <div className={styles.description}>
                    <div className={styles.name}>Штурмовики</div>
                    <div className={styles.counter}>{invaders} / {StormCorpsLevel.getMaxInvaders(level as TStormCorpsLevel)}</div>
                </div>

            </div>
        </div>
    )

}


