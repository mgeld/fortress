import { FC, ReactElement } from "react";

import styles from './styles.module.scss'

export const UnitsLayout: FC<{ children: ReactElement }> = ({ children }) => {
    return (
        <>
            <div className={styles.unitsList}>
                <div className={styles.__content}>
                    {children}
                </div>
            </div>
        </>
    )
}