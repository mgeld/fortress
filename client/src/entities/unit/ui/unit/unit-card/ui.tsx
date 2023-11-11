import { FC, ReactNode } from "react";

import { TExtrTypes } from "@ctypes/model";
import { unitModel } from "entities/unit";
import { popoutModel } from "shared/ui/popout-root";
import { IconCoin, IconSapphire } from "widgets/counters/icons/_icons";

import styles from './styles.module.scss'

type TUnitCardProps = {
    icon: ReactNode
    name: string
    unit: TUnitShop
}
export type TUnitShop = {
    id: TExtrTypes,
    currency: 'coins' | 'rubies',
    price: number
}

export const UnitCard: FC<TUnitCardProps> = ({
    icon,
    name,
    unit
}) => {

    const onUnit = (id: TExtrTypes) => {
        unitModel.events.selectUnit(id)
        popoutModel.events.setPopout('select-unit')
    }

    return (
        <div
            className={styles.unitCard}
            onClick={() => onUnit(unit.id)}
        >
            <div className={`${styles.item} c${unit.id}`}>
                <div className={styles.__icon}>
                    {icon}
                </div>
                <div className={styles.__name}>
                    <div>{name}</div>
                </div>
                <div className={styles.__price}>
                    <div className={styles.__flex}>
                        <div className={styles.__number}>
                            {unit.price}
                        </div>
                        <div className={styles.__icon}>
                            {unit.currency === 'coins' ? <IconCoin /> : <IconSapphire />}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}