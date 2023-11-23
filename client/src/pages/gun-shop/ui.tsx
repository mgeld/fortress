import { FC } from "react";

import styles from './styles.module.scss'
import { GunShop } from "widgets/layout-gun-shop/ui";

export const GunShopPage: FC = () => {
    return (
        <div className={styles.gunShop}>
            <GunShop />
        </div>
    )
}