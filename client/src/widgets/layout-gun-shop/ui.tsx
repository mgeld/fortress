import { FC } from "react";
import { UnitsLayout } from "entities/unit/ui/unit/units-list/ui";
import { UnitCard } from "entities/unit/ui/unit/unit-card/ui";

import { IconCoin, IconSapphire } from "widgets/counters/icons/_icons";
import { ReactComponent as IconShop } from './shop.svg';

import { BackMap } from "widgets/back-button";

import { zoneModel } from "entities/zone";

import { modules } from "entities/unit/lib/modules";

import { unitsPrices } from "entities/unit/lib/unit-buy-list";
import { TExtrTypes } from "@ctypes/model";

import styles from './styles.module.scss'

const units = Object.entries({
    100: unitsPrices[100],
    101: unitsPrices[101],
    10: unitsPrices[10],
    11: unitsPrices[11],
    21: unitsPrices[21],
    22: unitsPrices[22],
    30: unitsPrices[30],
    31: unitsPrices[31],
    41: unitsPrices[41],
    42: unitsPrices[42],
    50: unitsPrices[50],
    52: unitsPrices[52],
})

export const GunShop: FC = () => {

    const coins = zoneModel.selectors.useZoneCoins()
    const sapphires = zoneModel.selectors.useZoneRubies()

    // const units = Object.entries(unitsPrices)

    return (
        <UnitsLayout>
            <>
                <div className={styles.__header}>
                    <div className={styles.iosTop} />
                    <div className={styles.__main}>
                        <div className={styles.name}>
                            <div className={styles.icon}>
                                <IconShop width={30} height={30} />
                            </div>
                            <div className={styles.text}>Магазин</div>
                        </div>
                        <div className={styles.details}>
                            <div className={styles.coins}>
                                <div className={styles.icon}>
                                    <IconCoin />
                                </div>
                                <div className={styles.text}>{coins}</div>
                            </div>
                            <div className={styles.sapphires}>
                                <div className={styles.icon}>
                                    <IconSapphire />
                                </div>
                                <div className={styles.text}>{sapphires}</div></div>
                        </div>
                    </div>
                </div>

                <div className={styles.__before} />

                {units.map(([_id, unit]) => {
                    const id = (_id as unknown) as TExtrTypes
                    return (
                        <UnitCard
                            key={String(id)}
                            id={id}
                            icon={modules[id].icon(66, 66)}
                            name={modules[id].name}
                            unit={unit}
                        />
                    )
                })}

                <BackMap />
            </>

        </UnitsLayout>
    )
}