import { FC } from "react";

import ControlFire from "features/fire/control-fire/ui";
import ControlInvader from "features/invader/control-invader/ui";
import ControlPointer from "features/pointer/control-pointer/ui";
import ControlProjector from "features/projector/control-projector/ui";

import { ObserveMode } from "features/user/observe-mode";

import { shipModel } from "entities/ship";

export const Control: FC = () => {

    const userHealth = shipModel.selectors.useShipHealth()

    if (userHealth < 1) return <ObserveMode />

    return (
        <>
            <ControlProjector />
            {/* <div className={styles.controlCenter}>
                <div className={styles.buttons}> */}
                    <ControlPointer />
                    <ControlFire />
                {/* </div>
            </div> */}
            <ControlInvader />
        </>
    )

}