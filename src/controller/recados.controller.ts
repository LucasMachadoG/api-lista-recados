import { Request, Response } from "express";
import { serverError } from "../errors/serverError";
import { userDatabase } from "../database/user.database";
import { requestError } from "../errors/request.error";
import { Recados } from "../models/recados.model";

export class recadosController {
    public createRecado (req: Request, res: Response) {
        try {
            const { id } = req.params
            const { descricao, conteudo } = req.body

            if (!descricao) {
                return requestError.fieldNotProvider(res, "Descriacao")
            }

            if (!conteudo) {
                return requestError.fieldNotProvider(res, "Conteudo")
            }

            const database = new userDatabase()
            const user = database.get(id)

            if (!user) {
                return requestError.notFoundError(res, "User")
            }

            user.recados.push(new Recados(descricao, conteudo))

            return res.status(400).send({
                ok: true, 
                message: "Recado successfully created!"
            })
        } catch (error: any) {
            return serverError.genericError(res, error)
        }
    }

    public delete (req: Request, res: Response) {
        try {
            const { userId, id } = req.params

            const database = new userDatabase ()
            const user = database.get(userId)

            if (!user) {
                return requestError.notFoundError(res, "User")
            }

            const recadoIndex = user.recados.findIndex ((recado) => recado.id === id)

            if (recadoIndex < 0) {
                return requestError.notFoundError(res, "Recado")
            }

            user.recados.splice (recadoIndex, 1)

            return res.status(200).send({
                ok: true,
                message: "Recado successfully deleted!",
            })
        } catch (error: any) {
            return serverError.genericError(res, error)
        }
    }

    public update (req: Request, res: Response) {
        try {
            const { userId, id } = req.params
            const { descricao, conteudo } = req.body

            const database = new userDatabase()
            const user = database.get(userId)

            if (!user) {
                return requestError.notFoundError(res, "User")
            }

            const recado = user.recados.find ((recado) => recado.id === id)

            if (!recado) {
                return requestError.notFoundError(res, "Recado")
            }

            if (descricao) {
                recado.descricao = descricao
            }

            if (conteudo) {
                recado.conteudo = conteudo
            }

            return res.status(200).send({
                ok: true,
                message: "Recado successfully updated"
            })
        } catch (error: any) {
            return serverError.genericError(res, error)
        }
    }
}