"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const classnames_1 = require("shared/lib/classnames");
const get_platform_1 = require("shared/lib/get-platform");
const go_link_1 = require("shared/lib/go-link");
let platform = (0, get_platform_1.getPlatform)();
const Link = ({ link, children, className, disabled = false }) => {
    if (disabled)
        return (<div className={className}>
                {children}
            </div>);
    else if (platform === 'mobile_iphone')
        return (<a className={(0, classnames_1._classNames)(['linkPlatform', className])} href={link} target='_blank' rel="noreferrer">
                {children}
            </a>);
    else {
        return (<div className={className} onClick={(e) => (0, go_link_1.goLink)(link)}>
                {children}
            </div>);
    }
};
exports.default = Link;
