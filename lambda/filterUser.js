function filtrarCurso(coordenador, handlerInput) {
  const filterCurso = handlerInput.requestEnvelope.request.intent.slots.curso.value;
  const curso = coordenador.find(usuario =>
    usuario.curso_nome === filterCurso);

  return curso;
}

module.exports = filtrarCurso;

