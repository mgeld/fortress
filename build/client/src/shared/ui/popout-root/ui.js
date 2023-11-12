"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PopoutRoot = exports.PopoutRootContext = void 0;
const react_1 = require("react");
const DEFAULT_VALUE = null;
exports.PopoutRootContext = (0, react_1.createContext)(DEFAULT_VALUE);
const PopoutRoot = ({ children, activePopout }) => {
    return (<exports.PopoutRootContext.Provider value={activePopout}>
            <div className="popoutRoot">
                {children}
            </div>
        </exports.PopoutRootContext.Provider>);
};
exports.PopoutRoot = PopoutRoot;
