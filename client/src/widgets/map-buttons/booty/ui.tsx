import { MenuNav } from "shared/ui/menu-nav"

import styles from './styles.module.scss'

import { ReactComponent as IconBooty } from './booty.svg'
import { pageModel } from "shared/ui/page-root"

export const NavBooty = () => {
    return (
        <MenuNav
            onClick={() => pageModel.events.setPage('extraction')}
            className={styles.__booty}
            icon={<IconBooty />}
            text="Трюм"
        />
    )
}