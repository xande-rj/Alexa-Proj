function diaECoordenadorMaisProximo(apiData) {
  // Verifica se apiData é um array e se tem pelo menos um coordenador
  if (!Array.isArray(apiData) || apiData.length === 0) {
      console.error('Dados da API inválidos');
      return null;
  }

  // Obtém o dia da semana atual
  const hoje = new Date().getDay(); // 0 para Domingo, 1 para Segunda, ..., 6 para Sábado

  // Inicializa variáveis para armazenar o dia e os dados do coordenador mais próximos
  let diaMaisProximo = null;
  let coordenadorMaisProximo = null;

  // Itera sobre os coordenadores e seus quadros de horário
  apiData.forEach(coordenador => {
      if (coordenador.quadroHorario && Array.isArray(coordenador.quadroHorario)) {
          coordenador.quadroHorario.forEach(item => {
              const diaSemanaAtual = item.diaSemana;
              const diffAtual = (diaSemanaAtual.charCodeAt(0) - hoje + 7) % 7;

              // Se não há dia mais próximo ou o dia atual é mais próximo que o anterior, atualiza as variáveis
              if (diaMaisProximo === null || diffAtual < (diaMaisProximo.charCodeAt(0) - hoje + 7) % 7) {
                  diaMaisProximo = diaSemanaAtual;
                  coordenadorMaisProximo = coordenador;
              }
          });
      }
  });

  // Retorna um objeto com as informações
  return { diaMaisProximo, coordenadorMaisProximo };
}

module.exports = diaECoordenadorMaisProximo;

