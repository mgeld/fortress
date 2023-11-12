import { TExtrTypes } from "@ctypes/model";
import { ExtractionCard, ExtractionList, holdModel } from "entities/hold";
import { FC } from "react";

import { modules } from "entities/unit/lib/modules";

import { IconHold } from "entities/ship/ui/assets/icons";

import styles from './styles.module.scss'
import { HoldLevel, THoldLevel } from "entities/hold/lib/hold-level";
import { pageModel } from "shared/ui/page-root";
import { BackMap } from "widgets/back-button";

export const Extraction: FC = () => {

    const list = holdModel.selectors.useHoldItems()
    const level = holdModel.selectors.useHoldLevel()

    return (
        <ExtractionList>
            <>
                <div
                    className={styles.__header}
                >
                    <div className={styles.name}>
                        <div className={styles.icon}>
                            <IconHold width={24} height={24} />
                        </div>
                        <div className={styles.text}>Трюм</div>
                    </div>
                    <div className={styles.details}>{list.length} / {HoldLevel.getMaxItems(level as THoldLevel)}</div>
                </div>
                {list.length > 0 ?
                    <>
                        {list.reverse().map((item, i) => {
                            console.log('item', item)
                            if (item in modules)
                                return (
                                    <ExtractionCard
                                        key={String(i)}
                                        id={{
                                            id: item as TExtrTypes,
                                            index: i
                                        }}
                                        icon={modules[item].icon(66,66)}
                                        name={modules[item].name}
                                    />
                                )
                            return <></>
                        })}
                    </> : <>
                        <div className={styles.noData}>
                            <div>Трюм пустой</div>
                        </div>
                    </>}
                <BackMap />
            </>
        </ExtractionList>
    )
}