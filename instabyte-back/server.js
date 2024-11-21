// Importa o framework Express para criar a aplicação web
import express from "express";

// Importa as rotas definidas no arquivo postsRoutes.js
import routes from "./src/routes/postsRoutes.js";

// Cria uma instância da aplicação Express
const app = express();

// Registra as rotas importadas na aplicação Express
routes(app);

// Inicia o servidor na porta 3000 e exibe uma mensagem no console quando o servidor estiver ativo
app.listen(3000, () => {
  console.log("Servidor escutando...");
});
