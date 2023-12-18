import { TExtrTypes, TFindContType, TLatLng } from "../../common-types/model"
import { randomNumber } from "../../libs/random-number"

export type TArenaSectorProps = {
    id: string
    number?: number
    latlng: TLatLng
    team_id: number
    defenders?: number
    invaders?: number

    booty?: TFindContType | 0

    arena: string
}

export type UnmarshalledArenaSector = Required<TArenaSectorProps>

type LeaveSectorStatus = 'invader' | 'defender' | null

export class ArenaSector {

    private _id: string

    private _number: number
    
    private _latlng: TLatLng
    private _team_id: number
    
    private _defenders: number
    private _invaders: number

    private _booty: TFindContType | 0

    private _arena: string

    private constructor(sector: TArenaSectorProps) {
        this._id = sector.id
        this._number = sector?.number || 0
        this._latlng = sector.latlng
        this._team_id = sector.team_id
        this._defenders = sector.defenders || 5
        this._invaders = sector.invaders || 0
        this._booty = sector.booty || 0
        this._arena = sector.arena
    }

    public static create(sector: TArenaSectorProps) {
        return new ArenaSector(sector)
    }

    unmarshal(): UnmarshalledArenaSector {
        return {
            id: this._id,
            number: this._number,
            latlng: this._latlng,
            team_id: this._team_id,
            defenders: this._defenders,
            invaders: this._invaders,
            booty: this._booty,
            arena: this._arena
        }
    }

    generateBooty(): TFindContType {
        const container = Math.random() < 0.2 ? 3 : Math.random() < 0.6 ? 2 : 1
        this._booty = container
        return container
    }

    takenBooty() {
        this._booty = 0
    }

    public static probabilityGettingExtractionInFort(pos: TLatLng): boolean {
        const probabilityNumber = Math.ceil((+pos[0].toString().slice(-1) + +pos[1].toString().slice(-1)))
        return probabilityNumber <= 6
    }

    invade(invader_team: number): 'defense' | 'victory' | 'defeat' {

        // Если это мой сектор
        // И на секторе нет чужих штурмовиков
        if (
            invader_team === this._team_id &&
            this._invaders === 0
        ) {
            // Добавляем стража
            this.addDefender()
            return 'defense'
        } else {
            const winner = this.fightWinner()

            // Если это мой сектор
            // Если победил мой защитник (внешний защитник (захватчик)) на моем секторе
            // И на секторе есть чужие захватчики
            if (invader_team === this._team_id && winner === 'defender') {

                this.killInvader()
                this.addDefender()

                return 'victory'
            } else if (invader_team === this._team_id && winner === 'invader') {

                return 'defeat'

            } else if (invader_team !== this._team_id && winner === 'defender') {

                return 'defeat'

            } else if (invader_team !== this._team_id && winner === 'invader') {

                this.killDefender()
                this.addInvader()

                return 'victory'

            }
            return 'defense'

        }

    }

    leaveGuard(user: number): LeaveSectorStatus {
        let isLeave: LeaveSectorStatus = null
        if (user === this._team_id) {
            if(this._invaders > 0) {
                this.killInvader()
                isLeave = 'invader'
            } else if(this._defenders > 1) {
                this.killDefender()
                isLeave = 'defender'
            }
        }
        return isLeave
    }

    // Меняем владельца
    public setOwner(new_owner_id: number) {
        if (this._defenders === 0) {
            this._team_id = new_owner_id
            this._defenders = this._invaders
            this._invaders = 0
        }
    }

    public static getContainerExtr(cont_id: 1 | 2 | 3): TExtrTypes {
        const __containers = {
            // Контейнер: [список добыч]
            1: [10, 20, 30, 40, 50, 110, 111],
            2: [11, 21, 31, 41, 51, 111, 121],
            3: [12, 22, 32, 42, 52],
        }
        const cont: number[] = __containers[cont_id]
        return cont[randomNumber(0, cont.length - 1)] as TExtrTypes
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

    fightWinner(): 'invader' | 'defender' {
        return Math.random() > 0.5 ? 'invader' : 'defender'
    }

    get id(): string {
        return this._id
    }

    get invaders(): number {
        return this._invaders
    }

    get team_id(): number {
        return this._team_id
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