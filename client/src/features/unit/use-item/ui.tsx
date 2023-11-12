import { FC, useState } from "react";

import { TExtrTypes } from "@ctypes/model";

import { popoutModel } from "shared/ui/popout-root";
import { modules as list_modules } from "entities/unit/lib/modules";

import { holdModel } from "entities/hold";
import { IconArrow } from "shared/assets/icons/_icons";
import { unitModel } from "entities/unit";

import styles from './styles.module.scss'

type TUseItemProps = {
    item: string,
    upswing: string,
    type: 'module' | 'item'
    details: {
        name: string,
        was: number,
        prefix?: string,
    }[],
    modules: TExtrTypes[]
}

export const UseItem: FC<TUseItemProps> = ({
    item,
    upswing,
    type,
    details,
    modules
}) => {

    const extr = holdModel.selectors.useHoldItems()
    // .filter(item => item >= 50 && item <= 52)

    const [card, setCard] = useState<TExtrTypes>(modules[0])

    const extrIndex = extr.findIndex(item => item === card)

    const closePopout = () => popoutModel.events.setPopout(null)

    const openExtraction = () => {
        console.log('extrIndex', extrIndex)
        if (~extrIndex) {
            holdModel.events.selectExtraction({
                id: card as TExtrTypes,
                index: extrIndex
            })
            popoutModel.events.setPopout('select-extraction')
        } else {
            // noticeModel.events.newToast({
            //     name: 'Нет неободимого предмета',
            //     text: 'Выбранный предмет не найден в трюме корабля',
            //     t: 'warning'
            // })
            unitModel.events.selectUnit(card)
            popoutModel.events.setPopout('unit-out-hold')
        }
    }

    return (
        <div className={styles.useItem}>

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
                                    <div className={styles.will}>{item.was + list_modules[card].feature_amount + prefix}</div>
                                </div>
                            </div>
                        )
                    })}
                </div>

                <div className={styles.modules}>

                    <div className={styles.name}>
                        Доступные {type === 'module' ? 'модули' : 'предметы'}:
                    </div>

                    <div className={styles.items}>

                        {modules.map(module => {
                            return (
                                <div
                                    className={`${styles.item}${module === card ? ' ' + styles.select : ''}`}
                                    onClick={() => setCard(module)}
                                >
                                    <div className={styles.module}>
                                        <div className={`${styles.__icon} e${module}`}>
                                            {list_modules[module].icon(66,66)}
                                        </div>
                                        <div className={styles.__name}>
                                            <div>
                                                {list_modules[module].name}
                                            </div>
                                        </div>
                                    </div>
                                    <div className={styles.__status}>
                                        {extr.filter(item => item === module).length} штук
                                    </div>
                                </div>
                            )
                        })}

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
                            onClick={() => openExtraction()}
                            className={styles.button}
                        >
                            Повысить
                        </div>
                    </div>
                </div>


            </div>
        </div>
    )

}


