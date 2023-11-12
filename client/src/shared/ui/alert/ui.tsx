import { FC } from "react";

import { popoutModel } from "shared/ui/popout-root";

import styles from './styles.module.scss'

type TAlertProps = {
    alert: string,
    message: string,
    action: {
        text: string
        _click: () => void
    }
}

export const Alert: FC<TAlertProps> = ({
    alert,
    message,
    action
}) => {
    const closePopout = () => popoutModel.events.setPopout(null)

    return (
        <div className={styles.alert}>

            <div className={styles.header}>
                <div className={styles.__border}>
                    {alert}
                </div>
            </div>

            <div className={styles.__content}>
                <div className={styles.message}>
                    {message}
                </div>

            </div>

            <div className={styles.actions}>
                <div className={styles.inside}>
                    <div
                        onClick={closePopout}
                        className={`${styles.button} ${styles.__white}`}
                    >
                        Отмена
                    </div>
                    <div
                        onClick={action._click}
                        className={styles.button}
                    >
                        {action.text}
                    </div>
                </div>
            </div>

        </div>
    )

}


