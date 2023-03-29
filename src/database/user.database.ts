import { user } from "../models/user.models";
import { users } from "./users";

export class userDatabase {
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
}