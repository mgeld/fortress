import { FC } from "react";

import styles from './styles.module.scss'
import { LayoutRating } from "widgets/layout-rating";

export const RatingPage: FC = () => {

    // useEffect(() => {
    //     getRatingAPI()
    // }, [])

    return (
        <div className={styles.rating}>
            <LayoutRating />
        </div>
    )
}