import { FC } from "react";

import styles from './styles.module.scss'
import { LayoutZone } from "widgets/zone/ui";

export const ZonePage: FC = () => {
    return (
        <div className={styles.rating}>
            <LayoutZone />
        </div>
    )
}