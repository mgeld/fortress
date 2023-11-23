import { FC } from "react";

import styles from './styles.module.scss'

import { popoutModel } from "shared/ui/popout-root";
import { IconGun } from "./assets/icons";

import { weaponModel } from "entities/weapon";
import { GunLevel, TGunLevel } from "entities/weapon/lib/gun-level";
import { IconShipGun } from "shared/assets/icons/_icons";

export const Gun: FC = () => {

    const bullets = weaponModel.selectors.useBullets()
    const level = weaponModel.selectors.useLevel()

    return (
        <div
            onClick={() => popoutModel.events.setPopout('gun')}
            className={styles.item}
        >
            <div className={styles.__icon}>
                <IconShipGun width={40} height={40} />
            </div>
            <div className={styles.__info}>
                <div className={styles.head}>
                    <div className={styles.name}>Пушка</div>
                    <div
                        // onClick={() => popoutModel.events.setPopout('use-item')}
                        className={styles.level}
                    >
                        <span>{level} ур.</span>
                    </div>
                </div>
                <div className={styles.description}>
                    <div className={styles.name}>Снаряды</div>
                    <div className={styles.counter}>{bullets} / {GunLevel.getMaxShells(level as TGunLevel)}</div>
                </div>
            </div>
        </div>
    )

}


