import { FC, ReactNode } from "react";

import styles from './styles.module.scss'

import { extractionModel } from "entities/unit";
import { popoutModel } from "shared/ui/PopoutRoot";
import { TExtraction } from "entities/unit/model/extraction";

type TExtractionCardProps = {
    icon: ReactNode
    name: string
    id: TExtraction
}

export const ExtractionCard: FC<TExtractionCardProps> = ({
    icon,
    name,
    id
}) => {
    const { selectExtraction } = extractionModel.events

    const openExtraction = () => {
        selectExtraction(id)
        popoutModel.events.setPopout('select-extraction')
    }

    return (
        <div
            className={styles.extraction}
            onClick={openExtraction}
        >
            <div className={`${styles.item} c${id.id}`}>
                <div className={styles.__icon}>
                    {icon}
                </div>
                <div className={styles.__name}>
                    {name}
                </div>
            </div>
        </div>
    )

}