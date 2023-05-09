import { Router } from "express";
import { userController } from "../controller/user.controller";
import { middlewaresForMethodAndLog } from "../middlewares/log.middleware";
import { recadosController } from "../controller/recados.controller";
import { emailValided } from "../middlewares/emailvalidator.middleware";

export const userRoutes = () => {
    const app = Router()

    //GET http://localhost:3333/user
    app.get ("/", middlewaresForMethodAndLog, new userController().list)

    //GET http://localhost:3333/user/abc-1234
    app.get ("/:id", middlewaresForMethodAndLog, new userController().get)

    //PUT http://localhost:3333/user
    app.post ("/", middlewaresForMethodAndLog, emailValided, new userController().create)

    //DELETE http://localhost:3333/user/abc-1234
    app.delete ("/:id", middlewaresForMethodAndLog, new userController().delete)
    
    //POST http://localhost:3333/user
    app.put ("/:id", middlewaresForMethodAndLog, new userController().update)

    //PUT http://localhost:3333/user
    app.put ("/", middlewaresForMethodAndLog, new userController().loginValida)

    //GET http://localhost:3333/user/abc-1234/recados
    app.get ("/:id/recados", middlewaresForMethodAndLog, new recadosController().list)

    //POST http://localhost:3333/user/abc-1234/recados
    app.post ("/:id/recados", middlewaresForMethodAndLog, new recadosController().createRecado)

    //DELETE http://localhost:3333/user/abc-1234/recados/abc-1234
    app.delete ("/:userId/recados/:id", middlewaresForMethodAndLog, new recadosController().delete)

    //PUT http://localhost:3333/user/abc-1234/recados/abc-1234
    app.put ("/:userId/recados/:id", middlewaresForMethodAndLog, new recadosController().update)

    return app
}