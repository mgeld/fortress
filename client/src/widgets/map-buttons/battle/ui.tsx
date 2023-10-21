// import { battleEvents } from "features/battle/battle-connect"
// import { IconSwords } from "shared/assets/icons/_icons"
import { MenuNav } from "shared/ui/MenuNav"


import { ReactComponent as IconSwords } from './swords.svg'
// import { ReactComponent as IconBattle } from './battle.svg'

import { battleConnectEvent } from "features/battle"

import styles from './styles.module.scss'

export const NavBattle = () => {
    return (
        <MenuNav
            onClick={() => battleConnectEvent.events.battleConnect()}
            className={styles.__battle}
            icon={<IconSwords />}
            text="В БОЙ"
        />
    )
}