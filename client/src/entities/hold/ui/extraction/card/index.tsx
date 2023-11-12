import { FC, ReactNode } from "react";

import styles from './styles.module.scss'

import { popoutModel } from "shared/ui/popout-root";
import { TExtraction } from "entities/hold/model/hold";
import { holdModel } from "entities/hold";

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
    const { selectExtraction } = holdModel.events

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
                    <div>{name}</div>
                </div>
            </div>
        </div>
    )

}