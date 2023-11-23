"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Extraction = void 0;
const hold_1 = require("entities/hold");
const modules_1 = require("entities/unit/lib/modules");
const icons_1 = require("entities/ship/ui/assets/icons");
const styles_module_scss_1 = __importDefault(require("./styles.module.scss"));
const hold_level_1 = require("entities/hold/lib/hold-level");
const back_button_1 = require("widgets/back-button");
const Extraction = () => {
    const list = hold_1.holdModel.selectors.useHoldItems();
    const level = hold_1.holdModel.selectors.useHoldLevel();
    return (<hold_1.ExtractionLayout>
            <>
                <div className={styles_module_scss_1.default.__header}>
                    <div className={styles_module_scss_1.default.iosTop}/>
                    <div className={styles_module_scss_1.default.__main}>
                        <div className={styles_module_scss_1.default.name}>
                            <div className={styles_module_scss_1.default.icon}>
                                <icons_1.IconHold width={24} height={24}/>
                            </div>
                            <div className={styles_module_scss_1.default.text}>Трюм</div>
                        </div>
                        <div className={styles_module_scss_1.default.details}>
                            {list.length} / {hold_level_1.HoldLevel.getMaxItems(level)}
                        </div>
                    </div>
                </div>

                <div className={styles_module_scss_1.default.__before}/>

                {list.length > 0 ?
            <>
                        {list.map((item, i) => {
                    if (item in modules_1.modules)
                        return (<hold_1.ExtractionCard key={String(i)} id={{
                                id: item,
                                index: i
                            }} icon={modules_1.modules[item].icon(66, 66)} name={modules_1.modules[item].name}/>);
                    return <></>;
                })}
                    </> :
            <div className={styles_module_scss_1.default.noData}>
                        <div>Трюм пустой</div>
                    </div>}
                <back_button_1.BackMap />
            </>
        </hold_1.ExtractionLayout>);
};
exports.Extraction = Extraction;
