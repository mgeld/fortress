import { battleEvents } from "features/battle/battle-connect"
import { IconSwords } from "shared/assets/icons/_icons"
import { MenuNav } from "shared/ui/MenuNav"

import styles from './styles.module.scss'

export const NavBattle = () => {
    return (
        <MenuNav
            onClick={() => battleEvents.events.battleConnect()}
            className={styles.__battle}
            icon={<IconSwords />}
            text="В БОЙ!"
        />
    )
}