import { FC } from "react";
import { UnitsList } from "entities/unit/ui/unit/units-list/ui";
import { TUnitShop, UnitCard } from "entities/unit/ui/unit/unit-card/ui";

import { IconCoin, IconSapphire } from "widgets/counters/icons/_icons";
import { ReactComponent as IconShop } from './shop.svg';

import { BackMap } from "widgets/back-button";

import { zoneModel } from "entities/zone";

import { modules } from "entities/unit/lib/modules";

import styles from './styles.module.scss'

const units: TUnitShop[] = [{
    id: 100,
    currency: 'coins',
    price: 50
}, {
    id: 101,
    currency: 'coins',
    price: 100
}, {
    id: 11,
    currency: 'coins',
    price: 50
}, {
    id: 12,
    currency: 'coins',
    price: 100
}, {
    id: 21,
    currency: 'coins',
    price: 100
}, {
    id: 22,
    currency: 'coins',
    price: 150
},
{
    id: 31,
    currency: 'rubies',
    price: 50
},
{
    id: 32,
    currency: 'rubies',
    price: 80
},
{
    id: 41,
    currency: 'coins',
    price: 50
}, {
    id: 42,
    currency: 'rubies',
    price: 70
},
{
    id: 51,
    currency: 'coins',
    price: 50
},
// {
//     id: 110,
//     currency: 'coins',
//     price: 100
// }, {
//     id: 111,
//     currency: 'coins',
//     price: 100
// }, {
//     id: 120,
//     currency: 'coins',
//     price: 100
// }, {
//     id: 121,
//     currency: 'coins',
//     price: 100
// }
]

export const GunShop: FC = () => {

    const coins = zoneModel.selectors.useZoneCoins()
    const sapphires = zoneModel.selectors.useZoneRubies()

    return (
        <UnitsList>
            <>
                <div
                    className={styles.__header}
                >
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

                {units.map((item, i) => {
                    console.log('item', item)
                    return (
                        <UnitCard
                            key={String(i)}
                            icon={modules[item.id].icon(66,66)}
                            name={modules[item.id].name}
                            unit={item}
                        />
                    )
                })}

                <BackMap />
            </>
        </UnitsList>
    )
}