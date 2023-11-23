"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Snackbar = void 0;
const styles_module_scss_1 = __importDefault(require("./styles.module.scss"));
const _1 = require(".");
const Snackbar = () => {
    const toasts = _1.snackbarModel.selectors.useSnackbar().data;
    return (<div className={styles_module_scss_1.default.snackbarRoot}>
            {toasts.map(toast => {
            return (<div key={toast.id} className={styles_module_scss_1.default.snackbar}>
                        <div>
                            {toast.text} {toast.count > 1 ? ` [${toast.count}]` : null}
                        </div>
                    </div>);
        })}
        </div>);
};
exports.Snackbar = Snackbar;
