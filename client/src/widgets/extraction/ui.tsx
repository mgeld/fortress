import { TExtrTypes } from "@ctypes/model";
import { extractionModel } from "entities/extraction";
import { IconModuleExp } from "entities/extraction/icons/_icons";
// import { TExtrTypes } from "entities/extraction/model";
import { ExtractionCard, ExtractionList } from "entities/extraction/ui";
import { FC, ReactNode } from "react";

// const list: TExtrNumbers[] = [1, 1, 3, 4,1, 1, 3, 4,1, 1, 3, 4,1, 1, 3, 4,1, 1, 3, 4,1, 1, 3, 4,1, 1, 3, 4,]
// const list: TExtrNumbers[] = [1, 1, 3, 4, 1, 1, 3,]

const extraction_list: {
    [key: number]: {
        icon: ReactNode
        name: string
    }
} = {
    1: {
        icon: <IconModuleExp width={44} height={44} />,
        name: 'Оп'
    },
    2: {
        icon: <IconModuleExp width={44} height={44} />,
        name: 'Модуль ОС-1'
    },
    3: {
        icon: <IconModuleExp width={44} height={44} />,
        name: 'Модуль ОЗ-1'
    },
    4: {
        icon: <IconModuleExp width={44} height={44} />,
        name: 'Золотой слиток'
    },
    5: {
        icon: <IconModuleExp width={44} height={44} />,
        name: 'Багровый камень'
    },
    6: {
        icon: <IconModuleExp width={44} height={44} />,
        name: 'Модуль '
    },
}

export const Extraction: FC = () => {

    const list = extractionModel.selectors.useExtractionList()

    console.log('Extraction list', list)

    return (
        <ExtractionList>
            <>
                {list.map((item, i) => {
                    console.log('item', item)
                    if (item in extraction_list)
                        return (
                            <ExtractionCard
                                key={String(i)}
                                id={{
                                    id: item as TExtrTypes,
                                    index: i
                                }}
                                icon={extraction_list[item].icon}
                                name={extraction_list[item].name}
                            />
                        )
                    return <></>
                })}
            </>
        </ExtractionList>
    )
}