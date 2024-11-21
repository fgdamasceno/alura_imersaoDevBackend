// Importa o cliente do MongoDB para realizar a conexão com o banco de dados.
import { MongoClient } from "mongodb";

export default async function conectarAoBanco(stringConexao) {
  // Declara uma variável para armazenar a instância do cliente MongoDB.
  let mongoClient;

  // Bloco try-catch para tratar possíveis erros durante a conexão.
  try {
    // Cria uma nova instância do cliente MongoDB, passando a string de conexão como argumento.
    mongoClient = new MongoClient(stringConexao);

    // Imprime uma mensagem no console para indicar o início da conexão.
    console.log("Conectando ao cluster do banco de dados...");

    // Tenta estabelecer a conexão com o banco de dados e aguarda a conclusão da operação.
    await mongoClient.connect();

    // Imprime uma mensagem de sucesso caso a conexão seja estabelecida.
    console.log("Conectado ao MongoDB Atlas com sucesso!");

    // Retorna a instância do cliente MongoDB para que possa ser utilizada em outras partes do código.
    return mongoClient;
    // Bloco catch para tratar erros que ocorrerem durante a conexão.
  } catch (erro) {
    // Imprime uma mensagem de erro no console, juntamente com o objeto de erro.
    console.error("Falha na conexão com o banco!", erro);

    // Encerra a execução do processo em caso de falha na conexão.
    process.exit();
  }
}
