function encontrarDiaMaisProximo(quadroHorario) {
  // Obtém o dia da semana atual
  const hoje = new Date().toLocaleString('en-US', { weekday: 'short' }); // Abreviação do dia da semana

  // Inicializa variáveis para armazenar o dia mais próximo
  let diaMaisProximo = null;

  // Itera sobre os itens do quadroHorario
  quadroHorario.forEach(item => {
      const diaSemanaAtual = item.diaSemana;
      const diffAtual = (diaSemanaAtual.charCodeAt(0) - hoje.charCodeAt(0) + 7) % 7;

      // Se não há dia mais próximo ou o dia atual é mais próximo que o anterior, atualiza a variável
      if (diaMaisProximo === null || diffAtual < (diaMaisProximo.charCodeAt(0) - hoje.charCodeAt(0) + 7) % 7) {
          diaMaisProximo = diaSemanaAtual;
      }
  });

  // Encontra o objeto correspondente ao dia mais próximo
  const diaMaisProximoInfo = quadroHorario.find(item => item.diaSemana === diaMaisProximo);

  return diaMaisProximoInfo;
}


module.exports = encontrarDiaMaisProximo;

