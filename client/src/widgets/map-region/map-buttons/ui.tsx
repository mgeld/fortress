import { FC } from "react";

import styles from './styles.module.scss'

import { NavBattle } from "./battle";
import { NavBooty } from "./booty";
import { NavMenu } from "./menu";
import { mapModel } from "entities/map";

export const MapButtons: FC = () => {
    
    const mode = mapModel.selectors.useMapMode().mode

    if(mode !== 'invade') return <></>

    return (
        <>
            <div className={styles.nav}>
                <NavBattle />
                {/* <NavShop /> */}
                <NavBooty />
            </div>
            <NavMenu />
        </>
    )
}