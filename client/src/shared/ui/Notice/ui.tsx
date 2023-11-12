import { FC, ReactNode } from "react";

import styles from './styles.module.scss'

import { IconCoin, IconSapphire } from "widgets/counters/icons/_icons";

import { ReactComponent as IconWarning } from './warning.svg';
import { noticeModel } from ".";
import { IconLevelUp, IconRank, IconZoneLevel } from "shared/assets/icons/_icons";
import { modules } from "entities/unit/lib/modules";
import { TExtrTypes, TTypeToastNotice } from "@ctypes/model";

const _notice: { [k: string]: ReactNode } = {

    // 'coins': <IconCoin width={30} height={30} />,
    // 'rubies': <IconSapphire width={30} height={30} />,

    'cont_1': <IconCoin width={30} height={30} />,
    'cont_2': <IconCoin width={30} height={30} />,
    'cont_3': <IconCoin width={30} height={30} />,

    'level-up': <IconLevelUp width={30} height={30} />,
    'level-zone': <IconZoneLevel width={34} height={34} />,
    'rank': <IconRank width={34} height={34} />,

    'common': <IconWarning width={34} height={34} />,
    'warning': <IconWarning width={34} height={34} />,

    // 'coins': <IconCoin width={30} height={30} />,
    // 'rubies': <IconCoin width={30} height={30} />,
    // 'exp-rank': <IconSapphire width={30} height={30} />,
    // 'exp-storm': <IconSapphire width={30} height={30} />,
    // 'exp-guard': <IconSapphire width={30} height={30} />,
    // 'level-rank': <IconSapphire width={30} height={30} />,
    // 'level-storm': <IconSapphire width={30} height={30} />,
    // 'level-guard': <IconSapphire width={30} height={30} />,
    // 'level-zone': <IconSapphire width={30} height={30} />,
}

export const Notice: FC = () => {

    const toasts = noticeModel.selectors.useNotice().data

    return (
        <div className={styles.noticeRoot}>
            {toasts.map(toast => {

                let icon: ReactNode

                if (toast.type in _notice) {
                    icon = _notice[toast.type]
                } else if (Number.isInteger(toast.type)) {
                    if (toast.type in modules) {
                        icon = modules[toast.type as TExtrTypes].icon(44,44)
                    }
                }
                console.log('ffffffffffffffffffffffffffffffffffffffffffffffffffffffffff toast', toast)
                return (
                    <div
                        key={toast.id}
                        className={styles.notice}
                    >
                        <div className={styles.__content}>
                            <div className={styles.__border}>
                                <div className={`${styles.icon} e${toast.type}`}>
                                    {icon}
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