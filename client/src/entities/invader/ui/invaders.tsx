import { FC } from "react";
import { invaderMapModel } from "..";
import { TakeIOS } from "./take-ios";


type InvadersMapProps = {
}

const Invaders: FC<InvadersMapProps> = () => {

    const takes = invaderMapModel.selectors.useInvader().takes

    return (
        <>
            {takes.map(take => {
                return <TakeIOS
                    key={'q' + take.id}
                    take={take}
                />
            })}
        </>
    )
}

export default Invaders