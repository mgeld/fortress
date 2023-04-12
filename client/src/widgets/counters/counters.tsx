import ProgressIcon from "shared/ui/ProgressIcon/ProgressIcon"
import { ProgressBarCounter } from "shared/ui/ProgressBarCounter"
import ProgressCounter from "shared/ui/ProgressCounter/ProgressCounter"
import { IconLevelProgressBar, IconSectorProgressBar, IconTrophyProgressBar } from "shared/assets/icons/_icons"

import styles from './styles.module.scss'

export const Counters = () => {
    return (
        <>
            <ProgressBarCounter
                className={styles.__level}
                icon={(
                    <ProgressIcon fill="#50B3FB">
                        <IconLevelProgressBar />
                    </ProgressIcon>
                )}
                progress={(
                    <ProgressCounter
                        width={110}
                        progress={70}
                        progress_color="#50B3FB"
                    />
                )}
            />

            <ProgressBarCounter
                className={styles.__trophy}
                icon={(
                    <ProgressIcon fill="#BC69D9">
                        <IconTrophyProgressBar />
                    </ProgressIcon>
                )}
                progress={(
                    <ProgressCounter
                        width={100}
                        progress={80}
                        progress_color="#BC69D9"
                    />
                )}
            />

            <ProgressBarCounter
                className={styles.__sector}
                icon={(
                    <ProgressIcon fill="#BC69D9">
                        <IconSectorProgressBar />
                    </ProgressIcon>
                )}
                progress={(
                    <ProgressCounter
                        width={100}
                        progress={50}
                        progress_color="#BC69D9"
                    />
                )}
            />
        </>
    )
}