import { FC } from "react";

import { ShareLink } from "shared/ui/share-link";
import { battleLinkModel } from ".";

export const BattleLink: FC = () => {

    const battleId = battleLinkModel.selectors.useBattleShareId()

    if(!battleId) return <></>

    return (
        <ShareLink
            header="Новая арена"
            link={`vk.com/fortress#b${battleId}`}
            text="Ссылка для сражения с друзьями на одной арене. Отправьте ссылку другу, с которым хотите сразиться"
        />
    )
}