import { Counter } from "shared/ui/Counter"
import { IconCoin, IconExperience, IconSapphire, IconSector, IconTrophy, IconZone } from "./icons/_icons"
import { CounterProgress } from "shared/ui/CounterProgress"

import styles from './styles.module.scss'

export const Counters = () => {
    return (
        <>
            <Counter
                onClick={() => { }}
                width={74}
                className={styles.__sector}
                icon={(
                    <IconSector />
                )}
                text="364"
            />

            <Counter
                onClick={() => { }}
                width={74}
                className={styles.__trophy}
                icon={(
                    <IconTrophy />
                )}
                text="124"
            />

            <Counter
                onClick={() => { }}
                width={74}
                className={styles.__coin}
                icon={(
                    <IconCoin />
                )}
                text="430"
            />

            <Counter
                onClick={() => { }}
                width={74}
                className={styles.__sapphire}
                icon={(
                    <IconSapphire />
                )}
                text="90"
            />

            <CounterProgress
                className={styles.__experience}
                icon={(
                    <IconExperience />
                )}
                progress={80}
                color="#C163E0"
                counter={332}
                width={73}
            />

            <CounterProgress
                className={styles.__zone}
                icon={(
                    <IconZone />
                )}
                progress={40}
                color="#C163E0"
                name={"Зона: 21 ур"}
                counter={245}
                width={73}
            />

        </>
    )
}