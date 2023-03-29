import { Router } from "express";

export const userRoutes = () => {
    const app = Router()

    //POST http://localhost:3333/user
    app.post ("/")

    //GET http://localhost:3333/user/abc-1234
    app.get ("/:id")

    return app
}