import { v4 as createUuid } from "uuid"
import { Recados } from "./recados.model"

export class user {
    private _id: string
    private _recados: Recados []

    constructor (
        private _username: string,
        private _email: string,
        private _password: string,
        private _cpf?: number,
        private _idade?: number,

    ) {
        this._id = createUuid ()
        this._recados = []
    }

    public get id () {
        return this._id
    }

    public get recados () {
        return this._recados
    }

    public get username () {
        return this._username
    }

    public get email () {
        return this._email
    }

    public get password () {
        return this._password
    }

    public get idade () {
        return this._idade
    }

    public set username (username: string) {
        this._username = username
    }

    public set email (email: string) {
        this._email = email
    }

    public set cpf (cpf: number) {
        this._cpf = cpf
    }

    public toJason () {
        return {
            id: this._id,
            username: this._username,
            email: this._email
        }
    }
}