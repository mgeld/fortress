import { FC } from "react";

import { unitModel } from "entities/unit";
import { TExtrTypes } from "@ctypes/model";

import styles from './styles.module.scss'

import { popoutModel } from "shared/ui/popout-root";
import { modules } from "entities/unit/lib/modules";
import { onBuyUnit } from "../model";
import { unitsPrices } from "entities/unit/lib/unit-buy-list";
import { IconCoin, IconSapphire } from "shared/assets/icons/_icons";

export const BuyUnit: FC = () => {

    const _unit: TExtrTypes | null = unitModel.selectors.useBuyUnit()

    // const _unit: TExtrTypes | null = unitModel.selectors.useUnit()

    if (!_unit) return <></>

    const unit = modules[_unit]

    const closePopout = () => popoutModel.events.setPopout(null)

    const _price = unitsPrices[_unit]

    const buyUnit = () => {
        // if (_unit) {
        // setTimeout(() => {
        // const popout = useItemImproves[(Math.floor(_unit / 10) * 10) as TTypeImproves] as TPopout
        // popoutModel.events.setPopout(popout)
        // }, 500)
        // } else {
            popoutModel.events.setPopout(null)
        //     // pageModel.events.setPage('map')
        // }
        onBuyUnit()
    }

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
                        {unit.icon(66, 66)}
                    </div>
                </div>

                <div className={styles.description}>
                    {unit.description}
                </div>
                <div className={styles.resources}>

                    <div className={styles.name}>
                        Цена:
                    </div>

                    <div className={styles.price}>
                        <div className={styles.icon}>{_price.currency === 'coins' ? <IconCoin /> : <IconSapphire />}</div>
                        <div className={styles.quantity}>{_price.price}</div>
                    </div>

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
                            onClick={buyUnit}
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


