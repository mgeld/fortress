import { FC } from "react";

import styles from './styles.module.scss'
import { Extraction } from "widgets/layout-hold/ui";

export const ExtractionPage: FC = () => {
    return (
        <div className={styles.hold}>
            <Extraction />
        </div>
    )
}