import "dotenv/config";
import express from "express";

// Conexão com o banco de dados
import conn from './config/conn.js'

// Importação dos módulos e criação de tabela
import './models/livroModel.js'
import './models/funcionarioModel'
import './models/clienteModel'

// Importação de rotas
import livroRouts from './routes/livroRoutes'
import funcionarRouts from './routes/funcionariosRoutes'
import clientesRouts from './routes/clientesRoutes'


const PORT = process.env.PORT;

const app = express()

app.use(express.urlencoded({extended: true}))
app.use(express.json());

//utilização das rotas
//http:localhost:3333/livros
app.use('/livros', livroRoutes)
app.use('/funcionario', funcionarioRoutes)
app.use('clientes', clientesRoutes)

app.get('/', (request, response) => {
    response.send("Olá, Mundo")
});
app.listen(PORT, ()=>{
    console.log("Servidor on Port" +PORT)
})


