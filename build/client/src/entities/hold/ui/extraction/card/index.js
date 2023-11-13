"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExtractionCard = void 0;
const styles_module_scss_1 = __importDefault(require("./styles.module.scss"));
const popout_root_1 = require("shared/ui/popout-root");
const hold_1 = require("entities/hold");
const ExtractionCard = ({ icon, name, id }) => {
    const { selectExtraction } = hold_1.holdModel.events;
    const openExtraction = () => {
        selectExtraction(id);
        popout_root_1.popoutModel.events.setPopout('select-extraction');
    };
    return (<div className={styles_module_scss_1.default.extraction} onClick={openExtraction}>
            <div className={`${styles_module_scss_1.default.item} c${id.id}`}>
                <div className={styles_module_scss_1.default.__icon}>
                    {icon}
                </div>
                <div className={styles_module_scss_1.default.__name}>
                    <div>{name}</div>
                </div>
            </div>
        </div>);
};
exports.ExtractionCard = ExtractionCard;
