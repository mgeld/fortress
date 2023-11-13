"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CounterProgress = void 0;
const styles_module_scss_1 = __importDefault(require("./styles.module.scss"));
const CounterProgress = ({ icon, className, width, name, counter, progress, color, onClick, children }) => {
    return (<div onClick={onClick} className={`${styles_module_scss_1.default.counterProgress} ${className}`}>

            <div className={styles_module_scss_1.default.__icon}>
                {icon}
            </div>
            <div className={styles_module_scss_1.default.__progress}>

                {children}

                <div className={styles_module_scss_1.default.progress} style={{ width: `${width}px` }}>
                    {name ? <div className={`${styles_module_scss_1.default.__name} strw1`}>
                        {name}
                    </div> : null}

                    <div className={styles_module_scss_1.default.__progressBar}>
                        <div className={styles_module_scss_1.default.__prefix} style={{
            backgroundColor: color
        }}/>
                        <div className={styles_module_scss_1.default.__wrapper}>
                            <div className={styles_module_scss_1.default.__load} style={{
            width: `${progress > 100 ? 100 : progress}%`,
            backgroundColor: color
        }}/>
                        </div>
                    </div>

                    <div className={styles_module_scss_1.default.__counter}>
                        <span>{counter}</span>
                    </div>

                    <div className={styles_module_scss_1.default.__whiteEffect}>
                        <div />
                    </div>

                </div>

            </div>
        </div>);
};
exports.CounterProgress = CounterProgress;
