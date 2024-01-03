"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbductionLink = void 0;
const user_1 = require("entities/user");
const share_link_1 = require("shared/ui/share-link");
const AbductionLink = () => {
    const zoneId = user_1.userModel.selectors.useUserId();
    return (<share_link_1.ShareLink header="Похищение" link={`vk.com/app51787878#a${zoneId}`} text="Отправьте ссылку другу, которого хотите похитить и сделать одним из пришельцев"/>);
};
exports.AbductionLink = AbductionLink;
