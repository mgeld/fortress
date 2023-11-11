import { FC } from "react";

import { unitModel } from "entities/unit";
import { TExtrTypes } from "@ctypes/model";

import styles from './styles.module.scss'

import { popoutModel } from "shared/ui/popout-root";
import { modules } from "entities/unit/lib/modules";
import { onBuyUnit } from "../model";

export const BuyUnit: FC = () => {

    const _unit: TExtrTypes | null = unitModel.selectors.useUnit()

    if (!_unit) return <></>

    const unit = modules[_unit]

    const closePopout = () => popoutModel.events.setPopout(null)

    return (
        <div className={styles.unit}>

            <div className={styles.header}>
                <div className={styles.__border}>
                    {unit.name}
                </div>
            </div>

            <div className={styles.__content}>

                <div className={styles.feature}>

                    <div className={styles.properties}>

                        <div className={styles.__name}>
                            {unit.feature_name}
                        </div>

                        <div className={styles.__amount}>
                            +{unit.feature_amount}
                        </div>
                    </div>

                    <div className={`${styles.icon} e${_unit}`}>
                        {unit.icon}
                    </div>
                </div>

                <div className={styles.description}>
                    {unit.description}
                </div>

                <div className={styles.actions}>
                    <div className={styles.inside}>
                        <div
                            onClick={closePopout}
                            className={`${styles.button} ${styles.__white}`}
                        >
                            Отмена
                        </div>
                        <div
                            onClick={() => onBuyUnit()}
                            className={styles.button}
                        >
                            Купить
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )

}


