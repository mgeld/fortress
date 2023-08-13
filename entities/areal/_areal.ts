export class Areal {

    private _id: number

    private _pointers: number[] = []
    
    // _sectors: string[] = []

    constructor(id: number) {
        this._id = id
    }

    create({ id }: { id: number }) {
        return new Areal(id)
    }

    addPointer(pointerId: number) {
        this._pointers.push(pointerId)
    }

    delPointer(pointerId: number) {
        this._pointers = this._pointers.filter(pointer => pointer !== pointerId)
    }

    // addSector(sectorId: string) {
    //     this._sectors.push(sectorId)
    // }

    // delSector(sectorId: string) {
    //     this._sectors = this._sectors.filter(sector => sector !== sectorId)
    // }

    clearPointers() {
        this._pointers = []
    }

    // clearSectors() {
    //     this._sectors = []
    // }

    get pointers() {
        return this._pointers
    }

    get id() {
        return this._id
    }

    // get sectors() {
    //     return this._sectors
    // }

}