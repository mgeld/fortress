export const getSizeInvaderForZoom = (zoom: number): number => {
    switch (true) {
        case zoom === 15:
            return 18
        case zoom === 16:
            return 36
        default:
            return 0
    }
}