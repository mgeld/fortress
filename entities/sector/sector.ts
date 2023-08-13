import { TLatLng } from "../../common-types/model"

export type TSectorProps = {
    id: string
    number?: number
    latlng: TLatLng
    user_id: number
    defenders?: number
    invaders?: number

    areal: number
}

export type UnmarshalledSector = Required<TSectorProps>

export class Sector {

    private _id: string

    private _number: number
    
    private _latlng: TLatLng
    private _user_id: number
    private _defenders: number
    private _invaders: number

    private _areal: number

    private constructor(sector: TSectorProps) {
        this._id = sector.id
        this._number = sector?.number || 0
        this._latlng = sector.latlng
        this._user_id = sector.user_id
        this._defenders = sector.defenders || 0
        this._invaders = sector.invaders || 0
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
            user_id: this._user_id,
            defenders: this._defenders,
            invaders: this._invaders,
            areal: this._areal
        }
    }

    invade(
        invader_user: number,
        invaders: number
    ): 'defense' | 'victory' | 'defeat' {

        if (
            invader_user === this._user_id &&
            this._invaders === 0
        ) {
            this.addDefender()
            return 'defense'
        } else {
            const winner = this.fightWinner()

            // Если победил мой защитник (внешний защитник (захватчик)) на моем секторе
            // И на секторе есть чужие захватчики
            if (winner === 'defender' && invader_user === this._user_id) {

                this.killInvader()
                this.addDefender()

                return 'victory'
            } else if (winner === 'invader' && invader_user === this._user_id) {

                return 'defeat'

            } else if (winner === 'defender' && invader_user !== this._user_id) {

                return 'defeat'

            } else if (winner === 'invader' && invader_user !== this._user_id) {

                this.killDefender()
                this.addInvader()

                return 'victory'

            }

            return 'defense'

        }

    }

    // Меняем владельца
    public setOwner(new_owner_id: number) {
        if (this._defenders === 0) {
            this._user_id = new_owner_id
            this._defenders = this._invaders
            this._invaders = 0
        }
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

    get user_id(): number {
        return this._user_id
    }

    get defenders(): number {
        return this._defenders
    }

    get latlng(): TLatLng {
        return this._latlng
    }

}