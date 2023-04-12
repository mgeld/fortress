export class PointerCreator {

    private name: string
    private canvas: HTMLCanvasElement
    private ctx: CanvasRenderingContext2D

    constructor(name: string) {
        this.canvas = document.getElementById("draw") as HTMLCanvasElement
        this.ctx = this.canvas.getContext("2d") as CanvasRenderingContext2D

        this.name = name

        if (!this.canvas) console.error('Не удалось найти элемент Canvas, для отрисовки поинтов')
    }

    public async createPoint(pointIcon: string): Promise<string> {
        let img = this.pasteImageOnPointer(50, 86, pointIcon)
        const UserIcon = 'https://sun2-17.userapi.com/s/v1/ig2/gdaDjou5jcnvOqKrJ5bDtV6RMVAkCxm0asqd4pz76PawCAU-qkT6xChOWNlqyEBIz2D_BbH7-u_7QZJ0YvQ1TMlr.jpg?size=100x100&quality=95&crop=0,231,728,728&ava=1%22'

        let imgU = this.pasteImageOnPointer(36, 36, UserIcon)

        return this.loadImages([img, imgU]).then(() => this.addImageToPoint(img, imgU))
    }

    private pasteImageOnPointer(w: number, h: number, image: string) {
        let _image = new Image(w, h)
        _image.crossOrigin = "anonymous"
        _image.src = image
        return _image
    }

    private loadImages(images: HTMLImageElement[]): Promise<Boolean> {
        return new Promise((resolve) => {
            let loades = 0
            images.forEach(img => {
                img.onload = () => {
                    loades++
                    if (loades === images.length) resolve(true)
                }
            })
        })
    }

    private addImageToPoint(img: HTMLImageElement, imgU: HTMLImageElement) {

        this.ctx.drawImage(img, 0, 0)

        this.ctx.font = 'bold 15px Lilita'
        this.ctx.fillStyle = '#C642EA'

        var textString = this.name,
            textWidth = this.ctx.measureText(textString).width

        let center_x = (this.canvas.width / 2) - (textWidth / 2)

        this.ctx.strokeStyle = 'black'
        this.ctx.lineWidth = 1
        this.ctx.strokeText(String(this.name), center_x, 15)

        this.ctx.fillText(textString, center_x, 15)

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

        return this.canvas.toDataURL()
    }
}