// Importa as funções para obter todos os posts e criar um novo post do módulo 'postsModels.js'
import { getTodosPosts, criarPost } from "../models/postsModels.js";
// Importa o módulo 'fs' para realizar operações no sistema de arquivos
import fs from "fs";

// Função assíncrona para listar todos os posts
export async function listarPosts(req, res) {
  // Obtém todos os posts do banco de dados
  const posts = await getTodosPosts();
  // Envia uma resposta HTTP com status 200 (sucesso) e os posts em formato JSON
  res.status(200).json(posts);
}

// Função assíncrona para criar um novo post
export async function postarNovoPost(req, res) {
  // Obtém os dados do novo post do corpo da requisição
  const novoPost = req.body;
  // Tenta criar o novo post
  try {
    // Chama a função para criar o post no banco de dados
    const postCriado = await criarPost(novoPost);
    // Envia uma resposta HTTP com status 200 (sucesso) e o post criado em formato JSON
    res.status(200).json(postCriado);
    // Caso ocorra algum erro
  } catch (erro) {
    // Imprime o erro no console para depuração
    console.error(erro.message);
    // Envia uma resposta HTTP com status 500 (erro interno do servidor) e uma mensagem de erro genérica
    res.status(500).json({ erro: "Falha na requisição" });
  }
}

// Função assíncrona para fazer upload de uma imagem e criar um novo post
export async function uploadImagem(req, res) {
  // Cria um objeto com os dados do novo post, incluindo o nome do arquivo da imagem
  const novoPost = {
    descricao: "",
    imgUrl: req.file.originalname,
    alt: "",
  };

  // Tenta criar o novo post e salvar a imagem
  try {
    // Chama a função para criar o post no banco de dados e obtém o ID inserido
    const postCriado = await criarPost(novoPost);
    // Constrói o novo caminho completo para a imagem
    const imagemAtualizada = `uploads/${postCriado.insertedId}.png`;
    // Renomeia o arquivo da imagem para o novo caminho
    fs.renameSync(req.file.path, imagemAtualizada);
    // Envia uma resposta HTTP com status 200 (sucesso) e o post criado em formato JSON
    res.status(200).json(postCriado);
    // Caso ocorra algum erro
  } catch (erro) {
    // Imprime o erro no console para depuração
    console.error(erro.message);
    // Envia uma resposta HTTP com status 500 (erro interno do servidor) e uma mensagem de erro genérica
    res.status(500).json({ erro: "Falha na requisição" });
  }
}
