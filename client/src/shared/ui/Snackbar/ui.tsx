import { FC } from "react";
import styles from './styles.module.scss'
import { snackbarModel } from ".";

export const Snackbar: FC = () => {

    const toasts = snackbarModel.selectors.useSnackbar().data

    console.log('17 toasts', toasts)

    return (
        <div className={styles.snackbarRoot}>
            {toasts.map(toast => {
                return (
                    <div
                        key={toast.id}
                        className={styles.snackbar}
                    >
                        <div>
                            {toast.text} {toast.count > 1 ? ` [${toast.count}]` : null}
                        </div>
                    </div>
                )
            })}
        </div>

    )
}