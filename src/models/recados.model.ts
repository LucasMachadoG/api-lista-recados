import { v4 as createUuid } from "uuid";

export class Recados {
   private _id: string
   private _status: boolean

   constructor (
      private _descricao: string,
      private _conteudo: string
   ){
      this._id = createUuid()
      this._status = false
   }

   public get id () {
      return this._id
   }

   public set descricao (descricao: string) {
      this._descricao = descricao
   }

   public set conteudo (conteudo: string) {
      this._conteudo = conteudo
   }
}