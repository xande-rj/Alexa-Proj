function returnInfoAulas(quadroHorario, diaSemanaDesejado) {
  const materiasComAulasNoDia = quadroHorario.filter(aula =>
   aula.dia_descricao === diaSemanaDesejado
  )
  return materiasComAulasNoDia;
}

module.exports = returnInfoAulas;