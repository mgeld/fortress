export const getSizeDroneForZoom = (zoom: number): number => {
    switch (true) {
        case zoom === 15:
            return 36
        case zoom === 16:
            return 72
        default:
            return 0
    }
}