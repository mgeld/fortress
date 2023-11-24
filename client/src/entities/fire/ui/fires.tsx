import { FC } from "react";
import { fireMapModel } from "..";

import { Fire } from "./fire";

import './l-styles.css'
import { FireIOS } from "./fire-ios";

type FiresMapProps = {
}

const Fires: FC<FiresMapProps> = () => {

    const fires = fireMapModel.selectors.useFire().fires

    return (
        <>
            {fires.map(fire => {
                return (
                    <FireIOS
                        key={'q' + fire.id}
                        fire={fire}
                    />
                )
            })}
        </>
    )
}

export default Fires






 

















