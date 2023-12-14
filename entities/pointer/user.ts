export type TUserProps = {
    icon: string
    name: string
    // color: number
}

export type UnmarshalledUser = TUserProps

export class User {

    private _icon: string
    private _name: string
    // private _tutorial: number

    private constructor(user: TUserProps) {
        this._icon = user.icon
        this._name = user.name
        // this._tutorial = user.name
    }

    public static create(user: TUserProps) {
        const instance = new User(user)
        return instance
    }

    public unmarshal(): UnmarshalledUser {
        return {
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

    set icon(i: string) {
        this._icon = i
    }

    get name() {
        return this._name
    }

    set name(n: string) {
        
        if (n.trim().length >= 3 && n.trim().length <= 12) {
            this._name = n
        }
    }

}