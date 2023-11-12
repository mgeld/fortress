import { FC } from "react";
import { Extraction } from "widgets/extraction/ui";

import styles from './styles.module.scss'

export const ExtractionPage: FC = () => {
    return (
        <div className={styles.hold}>
            <Extraction />
        </div>
    )
}