import { user } from "../models/user.models";
import { users } from "./users";

export class userDatabase {
    public list () {
        return [
            ...users
        ]
    }
    
    public get (id: string) {
        return users.find ((user) => user.id === id)
    }

    public create (user: user) {
        users.push (user)
    }

    public getIndex (id: string) {
        return users.findIndex ((user) => user.id === id)
    }

    public delete (index: number) {
        users.splice (index, 1)
    }

    public getByEmail (email: string) {
        return users.find ((user) => user.email === email)
    }
}