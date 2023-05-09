import { Request, Response } from "express";
import { serverError } from "../errors/serverError";
import { userDatabase } from "../database/user.database";
import { requestError } from "../errors/request.error";
import { Recados } from "../models/recados.model";

export class recadosController {
    public list (req: Request, res: Response) {
        try {
            const { id } = req.params
            // const { nome, arquivada } = req.query

            const database = new userDatabase()
            let user = database.get(id)
            console.log (user?.recados)
            // let recadosArquivados = arquivada === 'true'

            if (!user) {
                return requestError.notFoundError(res, "User")
            }

            // let recados = user.recados

            // if (nome) {
            //     console.log (recados)
            //     recados = recados.filter ((recado) => {
            //         return recado.nome === nome
            //     })

            //     const result = recados.map ((recado) => {
            //         return recado.toJson()
            //     })
                
            //     console.log (recados)

            //     return res.status(200).send({
            //         ok: true,
            //         message: "Recado!",
            //         data: result
            //     })
            // }

            // if (arquivada) {
            //     recados = recados.filter ((recado) => {
            //         return recado.arquivada === recadosArquivados
            //     })

            //     const result = recados.map ((recado) => {
            //         return recado.toJson()
            //     })

            //     return res.status(200).send({
            //         ok: true,
            //         message: "Recado!",
            //         data: result
            //     })
            // }

            const result = user.recados.map ((user) => user.toJson())

            return res.status(200).send({
                ok: true,
                message: "Recados successfully obtained",
                data: result
            })
        } catch (error: any) {
            return serverError.genericError(res, error)
        }
    }

    public createRecado (req: Request, res: Response) {
        try {
            const { id } = req.params
            const { nome, descricao, conteudo } = req.body

            if (!nome) {
                return requestError.fieldNotProvider(res, "Nome ")
            }

            if (!descricao) {
                return requestError.fieldNotProvider(res, "Descriacao ")
            }

            if (!conteudo) {
                return requestError.fieldNotProvider(res, "Conteudo ")
            }

            const database = new userDatabase()
            const user = database.get(id)

            if (!user) {
                return requestError.notFoundError(res, "User")
            }

            user.recados.push(new Recados(nome, descricao, conteudo))

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
            const { nome, descricao, conteudo, arquivada } = req.body

            const database = new userDatabase()
            const user = database.get(userId)

            if (!user) {
                return requestError.notFoundError(res, "User")
            }

            const recado = user.recados.find ((recado) => recado.id === id)

            if (!recado) {
                return requestError.notFoundError(res, "Recado")
            }

            if (nome) {
                recado.nome === nome
            }

            if (descricao) {
                recado.descricao = descricao
            }

            if (conteudo) {
                recado.conteudo = conteudo
            }

            if (arquivada) {
                recado.arquivada = arquivada
            }

            return res.status(200).send({
                ok: true,
                message: "Recado successfully updated",
                data: recado.toJson()
            })
        } catch (error: any) {
            return serverError.genericError(res, error)
        }
    }
}