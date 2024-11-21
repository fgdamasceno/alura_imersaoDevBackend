// Importa a função para conectar ao banco de dados
import conectarAoBanco from "../config/dbConfig.js";

// Estabelece a conexão com o banco de dados
const conexao = await conectarAoBanco(process.env.STRING_CONEXAO);

// Função assíncrona para obter todos os posts
export async function getTodosPosts() {
  // Obtém o banco de dados "imersao-instabyte"
  const db = conexao.db("imersao-instabyte");
  // Obtém a coleção "posts"
  const colecao = db.collection("posts");
  // Retorna todos os documentos da coleção
  return colecao.find().toArray();
}

// Função assíncrona para criar um novo post
export async function criarPost(novoPost) {
  // Obtém o banco de dados "imersao-instabyte"
  const db = conexao.db("imersao-instabyte");
  // Obtém a coleção "posts"
  const colecao = db.collection("posts");
  // Insere um novo documento na coleção
  return colecao.insertOne(novoPost);
}
