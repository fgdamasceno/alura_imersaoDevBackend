// Importa as dependências necessárias para a aplicação
import express from "express";
import multer from "multer";
import {
  listarPosts,
  postarNovoPost,
  uploadImagem,
} from "../controllers/postsController.js";

// Configura o armazenamento em disco para o Multer
const storage = multer.diskStorage({
  // Define o diretório de destino para os arquivos carregados
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Certifique-se de que o diretório "uploads" exista
  },
  // Define o nome do arquivo no destino
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Mantém o nome original do arquivo
  },
});

// Cria uma instância do Multer usando a configuração de armazenamento
const upload = multer({ dest: "./uploads", storage });

// Define as rotas da aplicação
const routes = (app) => {
  // Permite que a aplicação entenda dados JSON no corpo das requisições
  app.use(express.json());

  // Rota para listar todos os posts (implementada em listarPosts)
  app.get("/posts", listarPosts);

  // Rota para criar um novo post (implementada em postarNovoPost)
  app.post("/posts", postarNovoPost);

  // Rota para fazer upload de imagens (implementada em uploadImagem)
  app.post("/upload", upload.single("imagem"), uploadImagem); // Valide e sanitize a imagem antes de salvar
};

// Exporta a função de rotas para ser usada em outros módulos
export default routes;
