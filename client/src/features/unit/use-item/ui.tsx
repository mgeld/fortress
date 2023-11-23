import { FC, useState } from "react";

import { TExtrTypes } from "@ctypes/model";

import { popoutModel } from "shared/ui/popout-root";
import { modules as list_modules } from "entities/unit/lib/modules";

import { holdModel } from "entities/hold";
import { IconArrow } from "shared/assets/icons/_icons";
import { unitModel } from "entities/unit";

import { alertModel } from "shared/ui/alert"

import styles from './styles.module.scss'
import { onUseExtraction } from "../use-extraction/model";


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

export type TTypeImproves = 20 | 30 | 40 | 50 | 100

export const useItemImproves: Record<TTypeImproves, string> = {
    20: 'storm-improve-power',
    30: 'ship-improve-health',
    40: 'gun-improve-power',
    50: 'gun-improve-distance',
    100: 'storm-add-invaders',
}

export const UseItem: FC<TUseItemProps> = ({
    item,
    upswing,
    type,
    details,
    modules
}) => {

    const extr = holdModel.selectors.useHoldItems()

    const unit = unitModel.selectors.useBuyUnit()

    console.log('UseItem unit', unit)

    // if (unit)


    const [card, setCard] = useState<TExtrTypes>(unit && ~modules.indexOf(unit) ? unit : modules[0])

    console.log('UseItem card', card)

    const extrIndex = extr.findIndex(item => item === card)

    const closePopout = () => popoutModel.events.setPopout(null)

    const openExtraction = () => {
        console.log('extrIndex', extrIndex)
        if (~extrIndex) {
            holdModel.events.selectExtraction({
                id: card as TExtrTypes,
                index: extrIndex
            })
            // popoutModel.events.setPopout('select-extraction')
            onUseExtraction()
        } else {

            popoutModel.events.setPopout('alert')
            alertModel.events.setAlert({
                alert: list_modules[card].name,
                message: `В трюме нет нужного предмета для использования. Перейти к покупке?`,
                action: {
                    text: 'Подтвердить',
                    _click: () => {
                        // unitModel.events.selectUnit(card)
                        unitModel.events.selectBuyUnit(card)
                        popoutModel.events.setPopout('select-unit')
                    }
                }
            })
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
                                            {list_modules[module].icon(66, 66)}
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
                            Применить
                        </div>
                    </div>
                </div>


            </div>
        </div>
    )

}


