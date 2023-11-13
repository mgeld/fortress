"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useControl = void 0;
const react_1 = require("react");
const model_1 = require("../model");
const useControl = () => {
    console.log('useControl');
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
        (0, model_1.direction)(e.direction);
        moveId.current = setInterval(() => (0, model_1.direction)(e.direction), 200);
    };
    const stopPoint = () => {
        if (moveId.current) {
            clearTimeout(moveId.current);
            moveId.current = undefined;
        }
    };
    return {
        stopPoint,
        moveControl
    };
};
exports.useControl = useControl;
