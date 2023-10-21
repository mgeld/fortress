import { FC } from "react";
import { noticeModel } from ".";

import styles from './styles.module.scss'

import { IconCoin, IconSapphire } from "widgets/counters/icons/_icons";

const icons = {
    'common': <IconCoin width={30} height={30} />,
    'coins': <IconCoin width={30} height={30} />,
    'rubies': <IconCoin width={30} height={30} />,
    'exp-rank': <IconSapphire width={30} height={30} />,
    // 'exp-storm': <IconSapphire width={30} height={30} />,
    // 'exp-guard': <IconSapphire width={30} height={30} />,
    'level-rank': <IconSapphire width={30} height={30} />,
    'level-storm': <IconSapphire width={30} height={30} />,
    'level-guard': <IconSapphire width={30} height={30} />,
    'level-zone': <IconSapphire width={30} height={30} />,
}

export const Notice: FC = () => {

    const toasts = noticeModel.selectors.useNotice().data

    return (
        <div className={styles.noticeRoot}>
            {toasts.map(toast => {
                return (
                    <div
                        key={toast.id}
                        className={styles.notice}
                    >
                        <div className={styles.__content}>
                            <div className={styles.__border}>
                                <div className={styles.icon}>
                                    {icons[toast.type]}
                                </div>
                                <div className={styles.data}>
                                    <div className={styles.__name}>
                                        {toast.name}
                                    </div>
                                    <div className={styles.__text}>
                                        {toast.text}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>

    )
}