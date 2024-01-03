import { FC, useEffect, useState } from "react"

import { userModel } from "entities/user"
import { popoutModel } from "shared/ui/popout-root"
import { IconShip } from "entities/ship/ui/assets/icons"

import styles from './styles.module.scss'

// type TVioletScreenProps = {
//     name: string
//     icon: ReactNode
//     message: string
//     action: {
//         text: string
//         _click: () => void
//     }
// }

export const Abduction: FC = () => {

    const photo = userModel.selectors.useUser().userIcon

    const [state, setState] = useState<null | 'step_1' | 'step_2'>(null)

    useEffect(() => {
        setTimeout(() => setState('step_1'), 2000)
        setTimeout(() => setState('step_2'), 6000)
        setTimeout(() => popoutModel.events.setPopout('abduction-primes'), 9000)
    }, [])

    return (
        <div className={styles.violetScreenRoot}>
            <div className={`${styles.abductionLayout} ${state ? styles[state] : ''}`}>

                <div className={styles.ship}>
                    <div className={styles.__in}>
                        <IconShip width={160} height={160} />
                    </div>

                    <div className={styles.beamBlock}>
                        <div className={styles.beamBox}>
                            <div className={styles.beam} />
                        </div>
                    </div>
                </div>

                {state !== 'step_2' && (
                    <div className={styles.user}>
                        <div className={styles.__in}>
                            <img src={photo} alt="<>" />
                        </div>
                    </div>
                )}

            </div>
        </div>
    )
}