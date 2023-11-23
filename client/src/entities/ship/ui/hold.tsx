import { FC } from "react";

import { popoutModel } from "shared/ui/popout-root";
import { IconHold } from "./assets/icons";

import styles from './styles.module.scss'
import { holdModel } from "entities/hold";
import { HoldLevel, THoldLevel } from "entities/hold/lib/hold-level";

export const Hold: FC = () => {

    const lengthItems = holdModel.selectors.useHoldItems().length
    const level = holdModel.selectors.useHoldLevel()

    return (
        <div
            onClick={() => popoutModel.events.setPopout('hold')}
            className={styles.item}
        >
            <div className={styles.__icon}>
                <IconHold width={32} height={32} />
            </div>
            <div className={styles.__info}>
                <div className={styles.head}>
                    <div className={styles.name}>Трюм корабля</div>
                    <div className={styles.level}>
                        <span>{level} ур.</span>
                    </div>
                </div>
                <div className={styles.description}>
                    <div className={styles.name}>Предметы</div>
                    <div className={styles.counter}>{lengthItems} / {HoldLevel.getMaxItems(level as THoldLevel)}</div>
                </div>
            </div>
        </div>
    )

}


