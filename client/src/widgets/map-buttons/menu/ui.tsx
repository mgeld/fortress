
import { ReactComponent as IconMenu } from './menu.svg'

import styles from './styles.module.scss'

export const NavMenu = () => {
    return (
        <div
            onClick={() => { }}
            className={styles.menuNav}
        >
            <div className={styles.__icon}>
                <IconMenu />
            </div>
            <div className={styles.__whiteEffect}><div /></div>

        </div>
    )
}