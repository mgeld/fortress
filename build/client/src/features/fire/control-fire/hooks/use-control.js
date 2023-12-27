"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useControl = void 0;
const model_1 = require("../model");
const react_1 = require("react");
const useControl = () => {
    const moveId = (0, react_1.useRef)();
    (0, react_1.useEffect)(() => {
        return () => {
            clearTimeout(moveId.current);
        };
    }, []);
    const moveControl = (e) => {
        if (moveId.current) {
            clearTimeout(moveId.current);
            moveId.current = undefined;
        }
        (0, model_1.fireControl)(e);
        moveId.current = setInterval(() => (0, model_1.fireControl)(e), 550);
    };
    const stopFire = () => {
        if (moveId.current) {
            clearTimeout(moveId.current);
            moveId.current = undefined;
        }
    };
    return {
        stopFire,
        moveControl
    };
};
exports.useControl = useControl;
