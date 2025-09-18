import express from "express"
import cors from "cors"
import ClienteRotas from "./routes/ClienteRotas"
import CategoriaRotas from "./routes/CategoriaRotas"


const app = express()

const porta = 3000

app.use(express.json())
app.use(cors())
app.use("/", ClienteRotas)
app.use("/", CategoriaRotas)

app.listen(porta, ()=> {
    console.log(`Servidor iniciado em http://localhost:${porta}`)
})