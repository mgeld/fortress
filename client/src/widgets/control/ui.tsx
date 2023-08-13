import { userModel } from "entities/user";
import ControlFire from "features/fire/control-fire/ui";
import ControlInvader from "features/invader/control-invader/ui";
import ControlPointer from "features/pointer/control-pointer/ui";
import { ObserveMode } from "features/user/observe-mode";
import { FC } from "react";

export const Control: FC = () => {

    const userHealth = userModel.selectors.useUserHealth()

    if (userHealth < 1) return <ObserveMode />

    return (
        <>
            <ControlPointer />
            <ControlFire />
            <ControlInvader />
        </>
    )

}