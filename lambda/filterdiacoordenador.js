function diaMaisProximo(apiData) {
  // Verifica se apiData é um array e se tem pelo menos um coordenador
  if (!Array.isArray(apiData) || apiData.length === 0) {
      console.error('Dados da API inválidos');
      return 'Desconhecido';
  }

  // Obtém o dia da semana atual
  const hoje = new Date().toLocaleString('en-US', { weekday: 'short' }); // Abreviação do dia da semana

  // Inicializa variáveis para armazenar o dia mais próximo
  let diaMaisProximo = null;

  // Itera sobre os coordenadores e seus quadros de horário
  apiData.forEach(coordenador => {
      if (coordenador.quadroHorario && Array.isArray(coordenador.quadroHorario)) {
          coordenador.quadroHorario.forEach(item => {
              const diaSemanaAtual = item.diaSemana;
              const diffAtual = (diaSemanaAtual.charCodeAt(0) - hoje.charCodeAt(0) + 7) % 7;

              // Se não há dia mais próximo ou o dia atual é mais próximo que o anterior, atualiza a variável
              if (diaMaisProximo === null || diffAtual < (diaMaisProximo.charCodeAt(0) - hoje.charCodeAt(0) + 7) % 7) {
                  diaMaisProximo = diaSemanaAtual;
              }
          });
      }
  });

  // Obtém o nome por extenso do dia mais próximo

  return diaMaisProximo;
}

module.exports = diaMaisProximo;

