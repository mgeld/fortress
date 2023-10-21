import { FC, ReactElement } from "react";

import { pageModel } from "shared/ui/PageRoot";

import styles from './styles.module.scss'

export const ExtractionList: FC<{ children: ReactElement }> = ({ children }) => {
    return (
        <div className={styles.extractionList}>

            <div
                className={styles.__header}
                onClick={() => pageModel.events.setPage('map')}
            >
                Трофейный инвентарь
            </div>

            <div className={styles.__content}>
                {children}
            </div>

        </div>
    )
}