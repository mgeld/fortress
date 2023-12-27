import { FC } from "react";

import styles from './styles.module.scss'
import { LayoutAbduction } from "widgets/abduction";

export const AbductionPage: FC = () => {
    return (
        <div className={styles.abduction}>
            <LayoutAbduction />
        </div>
    )
}