import { TExtrTypes } from "@ctypes/model";
import { extractionModel } from "entities/unit";
import { ExtractionCard, ExtractionList } from "entities/unit/ui";
import { FC } from "react";

import { modules } from "entities/unit/lib/modules";

import { pageModel } from "shared/ui/PageRoot";
import { IconHold } from "entities/ship/ui/assets/icons";

import styles from './styles.module.scss'

export const Extraction: FC = () => {

    const list = extractionModel.selectors.useExtractionList()

    console.log('Extraction list', list)

    return (
        <ExtractionList>
            <>
                <div
                    className={styles.__header}
                    onClick={() => pageModel.events.setPage('map')}
                >
                    <div className={styles.name}>
                        <div className={styles.icon}>
                            <IconHold width={24} height={24} />
                        </div>
                        <div className={styles.text}>Трюм</div>
                    </div>
                    <div className={styles.details}>80 / 100</div>
                </div>
                {list.length > 0 ?
                    <>

                        {list.map((item, i) => {
                            console.log('item', item)
                            if (item in modules)
                                return (
                                    <ExtractionCard
                                        key={String(i)}
                                        id={{
                                            id: item as TExtrTypes,
                                            index: i
                                        }}
                                        icon={modules[item].icon}
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
            </>
        </ExtractionList>
    )
}