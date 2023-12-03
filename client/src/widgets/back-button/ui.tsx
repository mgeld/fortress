import { FC } from "react";
import { pageModel } from "shared/ui/page-root";

import styles from './styles.module.scss'

import { ReactComponent as IconArrowBack } from './arrow-back.svg'

export const BackMap: FC = () => {
    return (
        <>
            <div
                className={styles.back}
                onClick={() => pageModel.events.setPage('map')}
            >

                <div className={styles.__main}>
                    <div className={styles.icon}>
                        <IconArrowBack width={20} height={20} />
                    </div>
                    <div className={styles.text}>
                        Вернуться в игру
                    </div>
                </div>
                <div className={styles.iosBottom} />
            </div>
            <div className={styles.__after} />
        </>
    )
}