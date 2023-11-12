import { FC, ReactElement } from "react";

import styles from './styles.module.scss'

export const ExtractionList: FC<{ children: ReactElement }> = ({ children }) => {
    return (
        <div className={styles.extractionList}>
            <div className={styles.__content}>
                {children}
            </div>
        </div>
    )
}