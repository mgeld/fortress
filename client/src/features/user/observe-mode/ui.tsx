import { FC } from "react";
import { Button } from "shared/ui/button/ui";

import { BottomFlex } from "shared/ui/bottom-flex";

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