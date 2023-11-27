"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useHitFirePointer = void 0;
const react_1 = require("react");
const useHitFirePointer = (health) => {
    const [fireHitTarget, setFireHitTarget] = (0, react_1.useState)(false);
    const initFireHitTarget = (0, react_1.useRef)(0);
    (0, react_1.useEffect)(() => {
        if (initFireHitTarget.current) {
            setFireHitTarget(true);
            setTimeout(() => setFireHitTarget(false), 250);
        }
        else {
            initFireHitTarget.current = 1;
        }
    }, [health]);
    return {
        fireHitTarget
    };
};
exports.useHitFirePointer = useHitFirePointer;
