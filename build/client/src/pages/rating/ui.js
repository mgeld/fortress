"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RatingPage = void 0;
const styles_module_scss_1 = __importDefault(require("./styles.module.scss"));
const layout_rating_1 = require("widgets/layout-rating");
const RatingPage = () => {
    return (<div className={styles_module_scss_1.default.rating}>
            <layout_rating_1.LayoutRating><></></layout_rating_1.LayoutRating>
        </div>);
};
exports.RatingPage = RatingPage;
