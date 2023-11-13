"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPlatform = void 0;
const getPlatform = () => new URL(window.location.href).searchParams.get('vk_platform');
exports.getPlatform = getPlatform;
