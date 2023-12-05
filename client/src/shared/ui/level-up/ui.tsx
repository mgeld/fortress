import { FC } from "react";

// import { TExtrTypes, TGameUnit } from "@ctypes/model";

import { popoutModel } from "shared/ui/popout-root";

import { IconArrow, IconCoin, IconSapphire } from "shared/assets/icons/_icons";

import styles from './styles.module.scss'

type TLevelUpProps = {
    _click: () => void
    item: string,
    upswing: string,
    level: number
    details: {
        name: string,
        was: number,
        will: number,
        prefix?: string,
    }[],
    price: {
        type: 'coins' | 'rubies',
        quantity: number
    }
}

export const LevelUp: FC<TLevelUpProps> = ({
    _click,
    item,
    upswing,
    level,
    details,
    price
}) => {
    const closePopout = () => popoutModel.events.setPopout(null)
    return (
        <div className={styles.levelUp}>

            <div className={styles.header}>
                <div className={styles.__border}>
                    {item}
                </div>
            </div>

            <div className={styles.__content}>

                <div className={styles.upswing}>
                    {upswing}
                </div>

                <div className={styles.details}>
                    {details.map(item => {
                        const prefix = item?.prefix ? item.prefix : ''
                        return (
                            <div className={styles.item}>
                                <div className={styles.name}>
                                    {item.name}
                                </div>
                                <div className={styles.info}>
                                    <div className={styles.was}>{item.was + prefix}</div>
                                    <div className={styles.arrow}><IconArrow width={24} height={24} /></div>
                                    <div className={styles.will}>{item.will + prefix}</div>
                                </div>
                            </div>
                        )
                    })}
                </div>

                <div className={styles.resources}>

                    <div className={styles.name}>
                        Необходимо:
                    </div>

                    <div className={styles.price}>
                        <div className={styles.icon}>{price.type === 'coins' ? <IconCoin /> : <IconSapphire />}</div>
                        <div className={styles.quantity}>{price.quantity}</div>
                    </div>

                </div>

            </div>

            <div className={styles.actions}>
                <div className={styles.inside}>
                    <div
                        onClick={closePopout}
                        className={`${styles.button} ${styles.__white}`}
                    >
                        Отмена
                    </div>
                    <div
                        onClick={_click}
                        className={styles.button}
                    >
                        Повысить
                    </div>
                </div>
            </div>

        </div>
    )

}


