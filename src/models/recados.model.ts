import { v4 as createUuid } from "uuid";

export class Recados {
   private _id: string
   private _arquivada: boolean

   constructor (
      private _nome: string,
      private _descricao: string,
      private _conteudo: string
   ){
      this._id = createUuid()
      this._arquivada = false
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

   public set arquivada (arquivada: boolean) {
      this._arquivada = arquivada
   }

   public set nome (nome: string) {
      this._nome = nome
   }

   public toJson () {
      return {
         nome: this._nome,
         descricao: this._descricao,
         conteudo: this._conteudo,
         arquivada: this._arquivada, 
         id: this._id
      }
   }
}