import { MenuNav } from "shared/ui/menu-nav"

import styles from './styles.module.scss'

import { ReactComponent as IconShop } from './shop.svg'
import { pageModel } from "shared/ui/page-root"

export const NavShop = () => {
    return (
        <MenuNav
            onClick={() => pageModel.events.setPage('gun-shop')}
            className={styles.__shop}
            icon={<IconShop />}
            text="Магазин"
        />
    )
}