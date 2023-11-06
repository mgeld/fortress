import { FC } from "react";

import { extractionModel } from "entities/unit";
import { TExtrTypes } from "@ctypes/model";
import { onUseExtraction } from "../model";

import styles from './styles.module.scss'

import { popoutModel } from "shared/ui/PopoutRoot";
import { modules } from "entities/unit/lib/modules";

export const ExtractionPopout: FC = () => {

    const extr: TExtrTypes | null = extractionModel.selectors.useExtraction()?.id || null

    if (!extr) return <></>

    const extraction = modules[extr]

    const closePopout = () => popoutModel.events.setPopout(null)

    return (
        <div className={`${styles.extraction} ${extr}`}>

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

                    <div className={`${styles.icon} e${extr}`}>
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


