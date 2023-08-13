import { FC } from "react";
import { Button } from "shared/ui/Button/ui";

import { userModel } from "entities/user";
import { BottomFlex } from "shared/ui/BottomFlex";

export const ObserveMode: FC = () => {

    // userModel.events.resetUser()

    return (
        <BottomFlex
            text="Режим наблюдателя"
            button={<Button
                className=""
                text="В цитадель"
                onClick={() => { }}
            />}
        />
    )
}