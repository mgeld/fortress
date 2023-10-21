import { FC } from "react";

import { IconModuleExp } from "entities/extraction/icons/_icons";
import { extractionModel } from "entities/extraction";
import { TExtrTypes } from "@ctypes/model";
import { onUseExtraction } from "../model";

import styles from './styles.module.scss'
import { popoutModel } from "shared/ui/PopoutRoot";

const list = {
    1: {
        name: 'Модуль опыта',
        feature_name: 'Опыт завоеваний',
        feature_amount: '150XP',
        icon: <IconModuleExp width={66} height={66} />,
        description: 'Модуль опыта  повышает общий опыт завоеваний на 150 очков.\n\n' +
            'Можно находить в фортах при освободении территорий от захватчиков.',
    },
    2: {
        name: 'Модуль опыта',
        feature_name: 'Опыт завоеваний',
        feature_amount: '150XP',
        icon: <IconModuleExp width={66} height={66} />,
        description: 'Модуль опыта  повышает общий опыт завоеваний на 150 очков.\n\n' +
            'Можно находить в фортах при освободении территорий от захватчиков.',
    },
    3: {
        name: 'Модуль опыта',
        feature_name: 'Опыт завоеваний',
        feature_amount: '150XP',
        icon: <IconModuleExp width={66} height={66} />,
        description: 'Модуль опыта  повышает общий опыт завоеваний на 150 очков.\n\n' +
            'Можно находить в фортах при освободении территорий от захватчиков.',
    },
    4: {
        name: 'Модуль опыта',
        feature_name: 'Опыт завоеваний',
        feature_amount: '150XP',
        icon: <IconModuleExp width={66} height={66} />,
        description: 'Модуль опыта  повышает общий опыт завоеваний на 150 очков.\n\n' +
            'Можно находить в фортах при освободении территорий от захватчиков.',
    },
    5: {
        name: 'Модуль опыта',
        feature_name: 'Опыт завоеваний',
        feature_amount: '150XP',
        icon: <IconModuleExp width={66} height={66} />,
        description: 'Модуль опыта  повышает общий опыт завоеваний на 150 очков.\n\n' +
            'Можно находить в фортах при освободении территорий от захватчиков.',
    },
    6: {
        name: 'Модуль опыта',
        feature_name: 'Опыт завоеваний',
        feature_amount: '150XP',
        icon: <IconModuleExp width={66} height={66} />,
        description: 'Модуль опыта  повышает общий опыт завоеваний на 150 очков.\n\n' +
            'Можно находить в фортах при освободении территорий от захватчиков.',
    },
}

export const ExtractionPopout: FC = () => {

    const extr: TExtrTypes | null = extractionModel.selectors.useExtraction()?.id || null

    if (!extr) return <></>

    const extraction = list[extr]

    const closePopout = () => popoutModel.events.setPopout(null)

    return (
        <div className={styles.extraction}>

            <div className={styles.header}>
                <div className={styles.__border}>
                    {extraction.name}
                </div>
            </div>

            <div className={styles.__content}>

                <div className={styles.feature}>

                    <div className={styles.properties}>

                        <div className={styles.__name}>
                            {extraction.feature_name}
                        </div>

                        <div className={styles.__amount}>
                            {extraction.feature_amount}
                        </div>
                    </div>

                    <div className={styles.icon}>
                        {extraction.icon}
                    </div>
                </div>

                <div className={styles.description}>
                    {extraction.description}
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
                            onClick={() => onUseExtraction()}
                            className={styles.button}
                        >
                            Использовать
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )

}


