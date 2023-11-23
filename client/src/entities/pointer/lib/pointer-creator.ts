// import IconI from '../assets/icons/not-image-pointer.png'

export class PointerCreator {

    // private name: string
    private canvas: HTMLCanvasElement
    private ctx: CanvasRenderingContext2D

    constructor() {

        // name = name.length > 5 ? name.slice(0, 6) + '.' : name

        this.canvas = document.getElementById("draw") as HTMLCanvasElement
        this.ctx = this.canvas.getContext("2d") as CanvasRenderingContext2D

        // this.name = name

        if (!this.canvas) console.error('Не удалось найти элемент Canvas, для отрисовки поинтов')
    }

    private clearCanvas() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    public async createPoint(pointIcon: string, userIcon: string): Promise<string> {
        console.log("createPoint userIcon", userIcon)
        let img = this.pasteImageOnPointer(54, 70, pointIcon)
        return this.addUserImageToPoint(img, userIcon)
    }

    private async addUserImageToPoint(img: HTMLImageElement, userIcon: string): Promise<string> {

        let imgU = this.pasteImageOnPointer(36, 36, userIcon)

        return this.loadImages([img, imgU])
            .then(() => {
                const draw = this.addImageToPoint(img, imgU)
                this.clearCanvas()
                return draw
            })
            .catch(async () => {
                return import('../assets/icons/not-image-pointer.png')
                    .then(async icon => {

                        let imgUserNotImage = this.pasteImageOnPointer(36, 36, icon.default)

                        return this.loadImages([imgUserNotImage])
                            .then(() => {
                                const draw = this.addImageToPoint(img, imgUserNotImage)
                                this.clearCanvas()
                                return draw
                            })
                            .catch(() => {
                                throw new Error('ХУУУЙ')
                                // return new Promise((resolve) => {
                                //     resolve('')
                                // })
                            })
                    })
            })
    }

    private pasteImageOnPointer(w: number, h: number, image: string) {
        let _image = new Image(w, h)
        _image.crossOrigin = "anonymous"
        _image.src = image
        return _image
    }

    private loadImages(images: HTMLImageElement[]): Promise<Boolean> {
        let loades = 0
        return new Promise((resolve, reject) => {

            images.forEach((image, i) => {

                image.onload = () => {

                    loades++

                    if (loades === images.length) {
                        resolve(true)
                    }
                }

                image.onerror = () => {
                    reject(true)
                }

            })
        })
    }

    private addImageToPoint(img: HTMLImageElement, imgU: HTMLImageElement) {

        this.ctx.drawImage(img, 0, 0)

        // this.ctx.font = 'bold 15px Lilita'
        // this.ctx.fillStyle = '#C642EA'

        // var textString = this.name
            // textWidth = this.ctx.measureText(textString).width

        // let center_x = (this.canvas.width / 2) - (textWidth / 2)

        // this.ctx.strokeStyle = 'black'
        this.ctx.lineWidth = 1
        // this.ctx.strokeText(String(this.name), center_x, 13)

        // this.ctx.fillText(textString, center_x, 13)

        this.ctx.save()
        this.ctx.beginPath()

        // рисование круглой фигуры
        this.ctx.arc(this.canvas.width / 2, 22 + (36 / 2), (imgU.height) / 2, 0, Math.PI + (Math.PI / 2) * 2, true)

        // ctx.stroke()

        this.ctx.clip()
        this.ctx.closePath()

        // картинка показывается на пересечении самой картинки и фигуры
        // x.globalCompositeOperation = 'source-in';
        this.ctx.drawImage(imgU, (this.canvas.width - 36) / 2, 22, 36, 36)

        this.ctx.restore()
        this.ctx.save()

        // x.fillText(String(name), 33, 15, 56);

        return this.canvas.toDataURL("image/png", 1)
    }
}