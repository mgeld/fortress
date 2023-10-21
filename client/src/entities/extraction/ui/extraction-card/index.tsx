import { FC, ReactNode } from "react";

import styles from './styles.module.scss'
import { extractionModel } from "entities/extraction";
import { TExtraction } from "entities/extraction/model";
import { popoutModel } from "shared/ui/PopoutRoot";

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
            <div className={styles.__icon}>
                {icon}
            </div>
            <div className={styles.__name}>
                {name}
            </div>
        </div>
    )
}