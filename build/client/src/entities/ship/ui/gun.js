"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Gun = void 0;
const styles_module_scss_1 = __importDefault(require("./styles.module.scss"));
const popout_root_1 = require("shared/ui/popout-root");
const weapon_1 = require("entities/weapon");
const gun_level_1 = require("entities/weapon/lib/gun-level");
const _icons_1 = require("shared/assets/icons/_icons");
const Gun = () => {
    const bullets = weapon_1.weaponModel.selectors.useBullets();
    const level = weapon_1.weaponModel.selectors.useLevel();
    return (<div onClick={() => popout_root_1.popoutModel.events.setPopout('gun')} className={styles_module_scss_1.default.item}>
            <div className={styles_module_scss_1.default.__icon}>
                <_icons_1.IconShipGun width={40} height={40}/>
            </div>
            <div className={styles_module_scss_1.default.__info}>
                <div className={styles_module_scss_1.default.head}>
                    <div className={styles_module_scss_1.default.name}>Пушка</div>
                    <div className={styles_module_scss_1.default.level}>
                        <span>{level} ур.</span>
                    </div>
                </div>
                <div className={styles_module_scss_1.default.description}>
                    <div className={styles_module_scss_1.default.name}>Снаряды</div>
                    <div className={styles_module_scss_1.default.counter}>{bullets} / {gun_level_1.GunLevel.getMaxShells(level)}</div>
                </div>
            </div>
        </div>);
};
exports.Gun = Gun;
