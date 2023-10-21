import { MenuNav } from "shared/ui/MenuNav"

import styles from './styles.module.scss'

import { ReactComponent as IconBooty } from './booty.svg'
import { pageModel } from "shared/ui/PageRoot"

export const NavBooty = () => {
    return (
        <MenuNav
            onClick={() => pageModel.events.setPage('extraction')}
            className={styles.__booty}
            icon={<IconBooty />}
            text="Добыча"
        />
    )
}