import { FC } from "react";
import { modules } from "entities/unit/lib/modules";
import { UnitsList } from "entities/unit/ui/unit/units-list/ui";
import { TUnitShop, UnitCard } from "entities/unit/ui/unit/unit-card/ui";

import styles from './styles.module.scss'
import { pageModel } from "shared/ui/PageRoot";
import { IconCoin, IconSapphire } from "widgets/counters/icons/_icons";

import { ReactComponent as IconShop } from './shop.svg';
import { zoneModel } from "entities/zone";

const units: TUnitShop[] = [{
    id: 100,
    currency: 'coins',
    price: 100
}, {
    id: 101,
    currency: 'coins',
    price: 100
}, {
    id: 10,
    currency: 'coins',
    price: 100
}, {
    id: 11,
    currency: 'coins',
    price: 90
}, {
    id: 12,
    currency: 'coins',
    price: 80
}, {
    id: 20,
    currency: 'coins',
    price: 100
}, {
    id: 21,
    currency: 'rubies',
    price: 25
}, {
    id: 22,
    currency: 'coins',
    price: 100
}, {
    id: 30,
    currency: 'coins',
    price: 100
}, {
    id: 31,
    currency: 'rubies',
    price: 15
}, {
    id: 32,
    currency: 'coins',
    price: 100
}, {
    id: 40,
    currency: 'coins',
    price: 100
}, {
    id: 41,
    currency: 'coins',
    price: 100
}, {
    id: 42,
    currency: 'coins',
    price: 100
}, {
    id: 50,
    currency: 'rubies',
    price: 25
}, {
    id: 51,
    currency: 'coins',
    price: 100
}, {
    id: 52,
    currency: 'coins',
    price: 100
},]

export const GunShop: FC = () => {

    const coins = zoneModel.selectors.useZoneCoins()
    const sapphires = zoneModel.selectors.useZoneRubies()

    return (
        <UnitsList>
            <>
                <div
                    className={styles.__header}
                    onClick={() => pageModel.events.setPage('map')}
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
                            icon={modules[item.id].icon}
                            name={modules[item.id].name}
                            unit={item}
                        />
                    )
                })}
            </>
        </UnitsList>
    )
}