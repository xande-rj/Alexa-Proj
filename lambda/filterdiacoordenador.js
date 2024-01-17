function converterDiaSemana(quadroHorario) {
  const diasDaSemana = {
    'DOM': 'Domingo',
    'SEG': 'Segunda',
    'TER': 'Terça',
    'QUA': 'Quarta',
    'QUI': 'Quinta',
    'SEX': 'Sexta',
    'SAB': 'Sábado'
  };

  for (let i = 0; i < quadroHorario.length; i++) {
    const diaAbreviado = quadroHorario[i].diaSemana;
    if (diasDaSemana[diaAbreviado]) {
      quadroHorario[i].diaSemana = diasDaSemana[diaAbreviado];
    } else {
      console.error(`Dia da semana inválido: ${diaAbreviado}`);
    }
  }

  return quadroHorario;
}


module.exports = converterDiaSemana;

