// Importe o axios
const axios = require('axios');

class Api {
  constructor(url) {
    this.url = url;
    this.data = null
  }

  async callApi() {
    try {
      const response = await axios.get(this.url);
      this.data = response.data; // Retorna apenas os dados da resposta
      return this.data;
    } catch (error) {
      console.error('Erro ao fazer a requisição à API:', error);
      throw error; // Rejeitar a promessa em caso de erro
    }
  }

  async nomeUser(){
    try {
      const dados = this.data
        return dados[0].data.aluno_nome
      } catch (error) {
        console.error('Erro ao fazer a requisição à API:', error);
        throw error; // Rejeitar a promessa em caso de erro
      }
  }
  

  
}

module.exports = Api;
