// nmp install dotenv cors 
//npm install @types/cors
import express from 'express'
import cors from 'cors' //Cors define regras para que nossa API seja chamada de alguma origem
import { userRoutes } from './routes/user.routes'
import * as dotenv from 'dotenv'

dotenv.config()

const app = express ()

app.use(express.json())

app.use(cors())

app.use("/user", userRoutes())

app.listen(process.env.PORT, () => {
    console.log (`API esta rodando na porta ${process.env.PORT}`)
})