"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BattleLink = void 0;
const share_link_1 = require("shared/ui/share-link");
const _1 = require(".");
const BattleLink = () => {
    const battleId = _1.battleLinkModel.selectors.useBattleShareId();
    if (!battleId)
        return <></>;
    return (<share_link_1.ShareLink header="Новая арена" link={`vk.com/fortress#b${battleId}`} text="Ссылка для сражения с друзьями на одной арене. Отправьте ссылку другу, с которым хотите сразиться"/>);
};
exports.BattleLink = BattleLink;
