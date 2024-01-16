  
 function returnConsoleAula(materiasComAulasNoDia, tempo) {
  if (materiasComAulasNoDia.length === 0) {
    return 'Você não tem aula neste dia!';
  }

  const frases = materiasComAulasNoDia.map(aula => {
    const { dia_descricao, disciplina_nome, hora_inicio,hora_fim, sala_label,bloco_label, professor_nome } = aula;
    const acao = tempo ? 'terá' : 'teve';
    return {
      dia_descricao,
      acao,
      frase: `aula de ${disciplina_nome} das ${hora_inicio} as ${hora_fim} horas na sala ${sala_label} do bloco ${bloco_label} com ${professor_nome}`
    };
  });

  if (frases.length === 1) {
    const { dia_descricao, acao, frase } = frases[0];
    return `${dia_descricao} você ${acao} ${frase}`;
  } else {
    const ultimaFrase = frases.pop();
    const frasesAnteriores = frases.map(({ frase }) => frase);
    return `${ultimaFrase.dia_descricao} você ${ultimaFrase.acao} ${frasesAnteriores.join(', ')} e ${ultimaFrase.frase}`;
  }
}

module.exports = returnConsoleAula;