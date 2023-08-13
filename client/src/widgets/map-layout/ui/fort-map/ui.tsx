import { Fort } from "entities/fort";
import { userModel } from "entities/user";
import { FC } from "react";

export const FortMap: FC = () => {
    const { pos } = userModel.selectors.useUser()
    return (
        <Fort pos={pos} />
    )
}