import { TExtrTypes, TExtrTypesName, TFindContType, TLatLng } from "../../common-types/model"
import { randomNumber } from "../../libs/random-number"

export type TSectorProps = {
    id: string
    number?: number
    latlng: TLatLng
    zone_id: number
    defenders?: number
    invaders?: number

    booty?: TFindContType | 0

    areal: number
}

export type UnmarshalledSector = Required<TSectorProps>

type LeaveSectorStatus = 'invader' | 'defender' | null

export class Sector {

    private _id: string

    private _number: number

    private _latlng: TLatLng
    private _zone_id: number

    private _defenders: number
    private _invaders: number

    private _booty: TFindContType | 0

    private _areal: number

    private constructor(sector: TSectorProps) {
        this._id = sector.id
        this._number = sector?.number || 0
        this._latlng = sector.latlng
        this._zone_id = sector.zone_id
        this._defenders = sector.defenders || 5
        this._invaders = sector.invaders || 0
        this._booty = sector.booty || 0
        this._areal = sector.areal
    }

    public static create(sector: TSectorProps) {
        return new Sector(sector)
    }

    unmarshal(): UnmarshalledSector {
        return {
            id: this._id,
            number: this._number,
            latlng: this._latlng,
            zone_id: this._zone_id,
            defenders: this._defenders,
            invaders: this._invaders,
            booty: this._booty,
            areal: this._areal
        }
    }

    generateBooty(): TFindContType {
        const rand = Math.random()
        const container = rand > 0.5 ? 1 : rand < 0.6 && rand > 0.2 ? 2 : 3
        this._booty = container
        return container
    }

    takenBooty() {
        this._booty = 0
    }

    public static probabilityGettingExtractionInFort(pos: TLatLng): boolean {
        const probabilityNumber = Math.ceil((+pos[0].toString().slice(-1) + +pos[1].toString().slice(-1)))

        console.log('pos', pos)
        console.log('probabilityNumber', probabilityNumber)

        return probabilityNumber === 10

    }

    invade(
        invader_user: number,
        invader_power: number,
        defender_power: number,
    ): 'defense' | 'victory' | 'defeat' {

        // Если это мой сектор
        // И на секторе нет чужих штурмовиков
        if (
            invader_user === this._zone_id &&
            this._invaders === 0
        ) {
            // Добавляем стража
            this.addDefender()
            return 'defense'
        } else {
            const winner = this.fightWinner(invader_power, defender_power)

            console.log('winner', winner)

            // Если это мой сектор
            // Если победил мой защитник (внешний защитник (захватчик)) на моем секторе
            // И на секторе есть чужие захватчики
            if (invader_user === this._zone_id && winner === 'defender') {

                this.killInvader()
                this.addDefender()

                return 'victory'
            } else if (invader_user === this._zone_id && winner === 'invader') {

                return 'defeat'

            } else if (invader_user !== this._zone_id && winner === 'defender') {

                return 'defeat'

            } else if (invader_user !== this._zone_id && winner === 'invader') {

                this.killDefender()
                this.addInvader()

                return 'victory'

            }
            return 'defense'

        }

    }

    leaveGuard(user: number): LeaveSectorStatus {
        let isLeave: LeaveSectorStatus = null
        if (user === this._zone_id) {
            if (this._invaders > 0) {
                this.killInvader()
                isLeave = 'invader'
            } else if (this._defenders > 1) {
                this.killDefender()
                isLeave = 'defender'
            }
        }
        return isLeave
    }

    // Меняем владельца
    public setOwner(new_owner_id: number) {
        if (this._defenders === 0) {
            this._zone_id = new_owner_id
            this._defenders = this._invaders
            this._invaders = 0
        }
    }

    public static getContainerExtr(cont_id: 1 | 2 | 3): TExtrTypes {

        const items: Record<TExtrTypesName, TExtrTypes[]> = {
            rank_exp: [10, 11, 12],
            storm_power: [20, 21, 22],
            ship_health: [30, 31, 32],
            gun_power: [40, 41, 42],
            gun_distance: [50, 51, 52],
            stormtroopers: [100, 101, 101],
            rubies: [110, 111, 111],
            coins: [120, 121, 121]
        }

        const percent = randomNumber(0, 100)

        let item: TExtrTypes[] = []
        if (percent <= 40) {
            item = items.coins
        } else if (percent <= 57) {
            item = items.rubies
        } else if (percent <= 72) {
            item = items.ship_health
        } else if (percent <= 82) {
            item = items.stormtroopers
        } else if (percent <= 92) {
            item = items.rank_exp
        } else if (percent <= 95) {
            item = items.gun_power
        } else if (percent <= 98) {
            item = items.gun_distance
        } else if (percent <= 100) {
            item = items.storm_power
        }

        // const __containers = {
        //     // Контейнер: [список предметов в них]
        //     1: [],
        //     2: [item[cont_id - 1]],
        //     3: [item[cont_id - 1]],
        // }
        // const cont: number[] = __containers[cont_id]

        return item[cont_id - 1] as TExtrTypes
    }

    addDefender() {
        // if (userId !== this._user_id) throw new Error('addDefender ERROR')
        this._defenders = this._defenders + 1
        return this._defenders
    }

    killDefender(): number {
        this._defenders = this._defenders - 1
        return this._defenders
    }

    addInvader() {
        this._invaders = this._invaders + 1
        return this._invaders
    }

    killInvader() {
        this._invaders = this._invaders - 1
        return this._invaders
    }

    fightWinner(
        invader_power: number,
        defender_power: number
    ): 'invader' | 'defender' {
        const chance = randomNumber(0, invader_power + defender_power)
        return chance < invader_power ? 'invader' : 'defender'
        // Math.random() > 0.5 ? 'invader' : 'defender'
    }

    get id(): string {
        return this._id
    }

    get invaders(): number {
        return this._invaders
    }

    get zone_id(): number {
        return this._zone_id
    }

    get defenders(): number {
        return this._defenders
    }

    get latlng(): TLatLng {
        return this._latlng
    }

    get booty() {
        return this._booty
    }

}