import { FC } from "react";

import styles from './styles.module.scss'

import { ReactComponent as IconArrowBack } from './arrow-back.svg'
import { goBack } from "processes/go-back";

type TBackMapProps = {
    color: string
}

export const BackMap: FC<TBackMapProps> = ({ color }) => {
    
    const background = {
        backgroundColor: color
    }

    return (
        <>
            <div
                className={styles.back}
                onClick={() => goBack()}
            >

                <div
                    className={styles.__main}
                    style={background}
                >
                    <div className={styles.icon}>
                        <IconArrowBack width={20} height={20} />
                    </div>
                    <div className={styles.text}>
                        Вернуться в игру
                    </div>
                </div>
                <div
                    className={styles.iosBottom}
                    style={background}
                />
            </div>
            <div className={styles.__after} />
        </>
    )
}