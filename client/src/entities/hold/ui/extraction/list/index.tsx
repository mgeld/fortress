import { FC, ReactElement } from "react";

import styles from './styles.module.scss'

export const ExtractionLayout: FC<{ children: ReactElement }> = ({ children }) => {
    return (
        <div className={styles.extractionLayout}>
            <div className={styles.__content}>
                {children}
            </div>
        </div>
    )
}