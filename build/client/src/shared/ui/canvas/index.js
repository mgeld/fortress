"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Canvas = ({ width, height }) => {
    return (<canvas id='draw' width={width || 600} height={height || 340} style={{ width: '0px', height: '0px', position: 'absolute' }}/>);
};
exports.default = Canvas;
