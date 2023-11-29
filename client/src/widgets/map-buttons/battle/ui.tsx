// import { battleEvents } from "features/battle/battle-connect"
// import { ReactComponent as IconBattle } from './battle.svg'
// import { IconSwords } from "shared/assets/icons/_icons"

import { MenuNav } from "shared/ui/menu-nav"
import { ReactComponent as IconSwords } from './swords.svg'
import { battleConnectEvent } from "features/battle"

import styles from './styles.module.scss'
import { popoutModel } from "shared/ui/popout-root"
import { alertModel } from "shared/ui/alert"

export const NavBattle = () => {

    const onBattle = () => {
        popoutModel.events.setPopout('alert')
        alertModel.events.setAlert({
            alert: 'Арена сражений',
            message: 'Побеждает игрок, который захватит раньше соперника 5 башен (фортов). Битва также будет завершена, если корабль одного игрока будет уничтожен.',
            action: {
                close: false,
                text: 'На арену',
                _click: () => {
                    popoutModel.events.setPopout(null)
                    battleConnectEvent.events.battleConnect()
                }
            }
        })
        
    }

    return (
        <MenuNav
            onClick={onBattle}
            className={styles.__battle}
            icon={<IconSwords />}
            text="Арена"
        />
    )
}