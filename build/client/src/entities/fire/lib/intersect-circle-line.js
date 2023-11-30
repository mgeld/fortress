"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IntersectCircleLine = void 0;
const IntersectCircleLine = (center, radius, p1, p2) => {
    const x01 = p1.x - center.x;
    const y01 = p1.y - center.y;
    const x02 = p2.x - center.x;
    const y02 = p2.y - center.y;
    const dx = x02 - x01;
    const dy = y02 - y01;
    const a = dx * dx + dy * dy;
    const b = 2.0 * (x01 * dx + y01 * dy);
    const c = x01 * x01 + y01 * y01 - radius * radius;
    if (-b < 0)
        return (c < 0);
    if (-b < (2.0 * a))
        return (4.0 * a * c - b * b < 0);
    return (a + b + c < 0);
};
exports.IntersectCircleLine = IntersectCircleLine;
