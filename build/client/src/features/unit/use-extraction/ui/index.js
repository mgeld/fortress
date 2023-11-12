"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExtractionPopout = void 0;
const model_1 = require("../model");
const styles_module_scss_1 = __importDefault(require("./styles.module.scss"));
const popout_root_1 = require("shared/ui/popout-root");
const modules_1 = require("entities/unit/lib/modules");
const hold_1 = require("entities/hold");
const ExtractionPopout = () => {
    var _a;
    const extr = ((_a = hold_1.holdModel.selectors.useExtraction()) === null || _a === void 0 ? void 0 : _a.id) || null;
    if (!extr)
        return <></>;
    const extraction = modules_1.modules[extr];
    const closePopout = () => popout_root_1.popoutModel.events.setPopout(null);
    return (<div className={`${styles_module_scss_1.default.extraction} ${extr}`}>

            <div className={styles_module_scss_1.default.header}>
                <div className={styles_module_scss_1.default.__border}>
                    {extraction.name}
                </div>
            </div>

            <div className={styles_module_scss_1.default.__content}>

                <div className={styles_module_scss_1.default.feature}>
                    <div className={styles_module_scss_1.default.properties}>

                        <div className={styles_module_scss_1.default.__name}>
                            {extraction.feature_name}
                        </div>

                        <div className={styles_module_scss_1.default.__amount}>
                            +{extraction.feature_amount}
                        </div>
                    </div>

                    <div className={`${styles_module_scss_1.default.icon} e${extr}`}>
                        {extraction.icon(66, 66)}
                    </div>
                </div>

                <div className={styles_module_scss_1.default.description}>
                    {extraction.description}
                </div>

                <div className={styles_module_scss_1.default.actions}>
                    <div className={styles_module_scss_1.default.inside}>
                        <div onClick={closePopout} className={`${styles_module_scss_1.default.button} ${styles_module_scss_1.default.__white}`}>
                            Отмена
                        </div>
                        <div onClick={() => (0, model_1.onUseExtraction)()} className={styles_module_scss_1.default.button}>
                            Использовать
                        </div>
                    </div>
                </div>

            </div>
        </div>);
};
exports.ExtractionPopout = ExtractionPopout;
