import express from "express";
import routes from './routes';
import dotenv from "dotenv";
import connect from "./database/connection";
import cors from 'cors';


dotenv.config();

// será usado 3000 se a variável de ambiente não tiver sido definida
const PORT = process.env.PORT || 3000;
const app = express(); // cria o servidor e coloca na variável app

app.use(cors({
    origin: 'http://10.68.55.162:8081', // Permitir requisições do frontend
    //origin: 'http://192.168.0.20:8081', // Permitir requisições do frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
    allowedHeaders: ['Content-Type', 'Authorization'], // Cabeçalhos permitidos
    credentials: true // Permitir envio de cookies e headers de autenticação
  }));

  
// suportar parâmetros JSON no body da requisição
app.use(express.json());

// conecta ao MongoDB no início da aplicação
connect();

// inicializa o servidor na porta especificada
app.listen(PORT, () => {
    console.log(`Rodando na porta ${PORT}`);
});

// define a rota para o pacote /routes
app.use(routes);

