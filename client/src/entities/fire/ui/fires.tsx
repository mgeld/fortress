import { FC } from "react";
import { fireMapModel } from "..";

import { Fire } from "./fire";

import './l-styles.css'

type FiresMapProps = {
}

const Fires: FC<FiresMapProps> = () => {

    const fires = fireMapModel.selectors.useFire().fires

    return (
        <>
            {fires.map(fire => {
                console.log(`'q' + fire.id`, 'q' + fire.id)
                return (
                    <Fire
                        key={'q' + fire.id}
                        fire={fire}
                    />
                )
            })}
        </>
    )
}

export default Fires






 

















