"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PageRoot = exports.PageRootContext = void 0;
const react_1 = require("react");
const DEFAULT_VALUE = 'map';
exports.PageRootContext = (0, react_1.createContext)(DEFAULT_VALUE);
const PageRoot = ({ children, activePage }) => {
    return (<exports.PageRootContext.Provider value={activePage}>
            <div className="pageRoot">
                {children}
            </div>
        </exports.PageRootContext.Provider>);
};
exports.PageRoot = PageRoot;
