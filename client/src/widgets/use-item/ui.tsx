import { FC, useState } from "react";

import { TExtrTypes } from "@ctypes/model";
import { extractionModel } from "entities/unit";

import { ReactComponent as IconArrow } from './arrow.svg';

import { noticeModel } from "shared/ui/Notice";
import { popoutModel } from "shared/ui/PopoutRoot";
import { modules as list_modules } from "entities/unit/lib/modules";

import styles from './styles.module.scss'

type TUseItemProps = {
    item: string,
    upswing: string,
    items: {
        name: string,
        was: number,
        prefix?: string,
    }[],
    modules: TExtrTypes[]
}

export const UseItemPopout: FC<TUseItemProps> = ({
    item,
    upswing,
    items,
    modules
}) => {

    const extr = extractionModel.selectors.useExtractionList().filter(item => item >= 50 && item <= 52)

    const [card, setCard] = useState<TExtrTypes>(modules[0])

    const extrIndex = extractionModel.selectors.useExtractionList().findIndex(item => item === card)

    const { selectExtraction } = extractionModel.events

    const closePopout = () => popoutModel.events.setPopout(null)

    const openExtraction = () => {
        console.log('extrIndex', extrIndex)
        if (~extrIndex) {
            selectExtraction({
                id: card as TExtrTypes,
                index: extrIndex
            })
            popoutModel.events.setPopout('select-extraction')
        } else {
            noticeModel.events.newToast({
                name: 'Ошибка',
                text: 'У вас нет необходимого модуля',
                t: 'error'
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
                    {items.map(item => {
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
                        Доступные модули:
                    </div>

                    <div className={styles.items}>

                        {modules.map(module => {
                            return (
                                <div
                                    className={`${styles.item}${module === card ? ' ' + styles.select : ''}`}
                                    onClick={() => setCard(module)}
                                >
                                    <div className={styles.module}>
                                        <div className={styles.__icon}>
                                            {list_modules[module].icon}
                                            {/* <IconStorm width={36} height={36} /> */}
                                        </div>
                                        <div className={styles.__name}>{list_modules[module].name}</div>
                                    </div>
                                    <div className={styles.__status}>
                                        {extr.filter(item => item === module).length} штук
                                    </div>
                                </div>
                            )
                        })}

                        {/* <div
                            className={`${styles.item}${card === 50 ? ' ' + styles.select : ''}`}
                            onClick={() => setCard(50)}
                        >
                            <div className={styles.module}>
                                <div className={styles.__icon}>
                                    <IconStorm width={36} height={36} />
                                </div>
                                <div className={styles.__name}>Модуль ДЗ-1</div>
                            </div>
                            <div className={styles.__status}>
                                {extr.filter(item => item === 50).length} штук
                            </div>
                        </div>

                        <div
                            className={`${styles.item}${card === 51 ? ' ' + styles.select : ''}`}
                            onClick={() => setCard(51)}
                        >
                            <div className={styles.module}>
                                <div className={styles.__icon}>
                                    <IconStorm width={36} height={36} />
                                </div>
                                <div className={styles.__name}>Модуль ДЗ-2</div>
                            </div>
                            <div className={styles.__status}>
                                {extr.filter(item => item === 51).length} штук
                            </div>
                        </div>

                        <div
                            className={`${styles.item}${card === 52 ? ' ' + styles.select : ''}`}
                            onClick={() => setCard(52)}
                        >
                            <div className={styles.module}>
                                <div className={styles.__icon}>
                                    <IconStorm width={36} height={36} />
                                </div>
                                <div className={styles.__name}>Модуль ДЗ-3</div>
                            </div>
                            <div className={styles.__status}>
                                {extr.filter(item => item === 51).length} штук
                            </div>
                        </div> */}

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


