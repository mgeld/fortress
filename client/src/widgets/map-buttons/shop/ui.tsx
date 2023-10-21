import { MenuNav } from "shared/ui/MenuNav"

import { battleConnectEvent } from "features/battle"

import styles from './styles.module.scss'

import { ReactComponent as IconShop } from './shop.svg'

export const NavShop = () => {
    return (
        <MenuNav
            onClick={() => battleConnectEvent.events.battleConnect()}
            className={styles.__shop}
            icon={<IconShop />}
            text="Магазин"
        />
    )
}