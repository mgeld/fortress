"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PointerCreator = void 0;
class PointerCreator {
    constructor() {
        this.canvas = document.getElementById("draw");
        this.ctx = this.canvas.getContext("2d");
        if (!this.canvas)
            console.error('Не удалось найти элемент Canvas, для отрисовки поинтов');
    }
    clearCanvas() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
    createPoint(pointIcon, userIcon) {
        return __awaiter(this, void 0, void 0, function* () {
            let img = this.pasteImageOnPointer(54, 70, pointIcon);
            return this.addUserImageToPoint(img, userIcon);
        });
    }
    addUserImageToPoint(img, userIcon) {
        return __awaiter(this, void 0, void 0, function* () {
            let imgU = this.pasteImageOnPointer(36, 36, userIcon);
            return this.loadImages([img, imgU])
                .then(() => {
                const draw = this.addImageToPoint(img, imgU);
                this.clearCanvas();
                return draw;
            })
                .catch(() => __awaiter(this, void 0, void 0, function* () {
                return Promise.resolve().then(() => __importStar(require('../assets/icons/not-image-pointer.png'))).then((icon) => __awaiter(this, void 0, void 0, function* () {
                    let imgUserNotImage = this.pasteImageOnPointer(36, 36, icon.default);
                    return this.loadImages([imgUserNotImage])
                        .then(() => {
                        const draw = this.addImageToPoint(img, imgUserNotImage);
                        this.clearCanvas();
                        return draw;
                    })
                        .catch(() => {
                        throw new Error('ХУУУЙ');
                    });
                }));
            }));
        });
    }
    pasteImageOnPointer(w, h, image) {
        let _image = new Image(w, h);
        _image.crossOrigin = "anonymous";
        _image.src = image;
        return _image;
    }
    loadImages(images) {
        let loades = 0;
        return new Promise((resolve, reject) => {
            images.forEach((image, i) => {
                image.onload = () => {
                    loades++;
                    if (loades === images.length) {
                        resolve(true);
                    }
                };
                image.onerror = () => {
                    reject(true);
                };
            });
        });
    }
    addImageToPoint(img, imgU) {
        this.ctx.drawImage(img, 0, 0);
        this.ctx.lineWidth = 1;
        this.ctx.save();
        this.ctx.beginPath();
        this.ctx.arc(this.canvas.width / 2, 22 + (36 / 2), (imgU.height) / 2, 0, Math.PI + (Math.PI / 2) * 2, true);
        this.ctx.clip();
        this.ctx.closePath();
        this.ctx.drawImage(imgU, (this.canvas.width - 36) / 2, 22, 36, 36);
        this.ctx.restore();
        this.ctx.save();
        return this.canvas.toDataURL("image/png", 1);
    }
}
exports.PointerCreator = PointerCreator;
