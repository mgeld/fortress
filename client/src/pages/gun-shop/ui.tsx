import { FC } from "react";
import { GunShop } from "widgets/gun-shop/ui";

import styles from './styles.module.scss'

export const GunShopPage: FC = () => {
    return (
        <div className={styles.gunShop}>
            <GunShop />
        </div>
    )
}