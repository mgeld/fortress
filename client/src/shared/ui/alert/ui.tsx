import { FC } from "react";

import { popoutModel } from "shared/ui/popout-root";

import styles from './styles.module.scss'
import { alertModel } from ".";


export const Alert: FC = () => {

    const data = alertModel.selectors.useAlert()

    if (!data) return <></>
    
    const closePopout = () => popoutModel.events.setPopout(null)

    return (
        <div className={styles.alert}>

            <div className={styles.header}>
                <div className={styles.__border}>
                    {data?.alert}
                </div>
            </div>

            <div className={styles.__content}>
                <div className={styles.message}>
                    {data?.message}
                </div>

            </div>

            <div className={styles.actions}>
                <div className={styles.inside}>
                    {data.action.close ? <div
                        onClick={closePopout}
                        className={`${styles.button} ${styles.__white}`}
                    >
                        Отмена
                    </div> : null}
                    <div
                        onClick={data.action._click}
                        className={styles.button}
                    >
                        {data.action.text}
                    </div>
                </div>
            </div>

        </div>
    )

}


