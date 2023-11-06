export type TUserProps = {
    icon: string
    name: string
    // color: number
}

export type UnmarshalledUser = TUserProps

export class User {

    private _icon: string
    private _name: string

    // private _color: number

    private constructor(user: TUserProps) {
        this._icon = user.icon
        this._name = user.name
        // this._color = pointer.color
    }

    public static create(user: TUserProps) {
        const instance = new User(user)
        return instance
    }

    public unmarshal(): UnmarshalledUser {
        return {
            // color: this.color,
            icon: this._icon,
            name: this._name,
        }
    }

    // get color() {
    //     return this._color
    // }

    get icon() {
        return this._icon
    }

    get name() {
        return this._name
    }

}