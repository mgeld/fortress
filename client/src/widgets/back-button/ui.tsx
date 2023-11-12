import { FC } from "react";
import { pageModel } from "shared/ui/page-root";

import styles from './styles.module.scss'

export const BackMap: FC = () => {
    return (
        <>
            <div
                className={styles.back}
                onClick={() => pageModel.events.setPage('map')}
            >
                <div className={styles.__main}>Вернуться в игру</div>
                <div className={styles.iosBottom} />
            </div>
            <div className={styles.__after} />
        </>
    )
}