
import { popoutModel } from 'shared/ui/PopoutRoot'
import { ReactComponent as IconMenu } from './menu.svg'

import styles from './styles.module.scss'

export const NavMenu = () => {
    return (
        <div
            onClick={() => popoutModel.events.setPopout('panel')}
            className={styles.menuNav}
        >
            <div className={styles.__icon}>
                <IconMenu />
            </div>
            <div className={styles.__whiteEffect}><div /></div>
        </div>
    )
}