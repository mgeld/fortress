import { FC } from "react";

import { userModel } from "entities/user";

import { ShareLink } from "shared/ui/share-link";

export const AbductionLink: FC = () => {

    const zoneId = userModel.selectors.useUserId()

    return (
        <ShareLink
            header="Похищение"
            link={`vk.com/app51787878#a${zoneId}`}
            text="Отправьте ссылку другу, которого хотите похитить и сделать одним из пришельцев"
        />
    )
}