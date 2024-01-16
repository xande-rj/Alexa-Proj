const moment = require('moment');
require('moment/locale/pt-br');
moment.locale('pt-br');

function capitalizeWords(str) { //utiliza uma expressão regular para identificar as primeiras letras de cada palavra na string e as transforma em maiúsculas.
  return str.replace(/\b\w/g, char => char.toUpperCase());
}

function obterDiaSemana(dia) {
  const diasValidos = ["ontem", "hoje", "amanhã"];

  if (!diasValidos.includes(dia)) {
    throw new Error("Dia inválido");
  }

  const diaAtual = moment();
  let diaSemanaDesejado = "";

  switch (dia) {
    case "ontem":
      diaSemanaDesejado = diaAtual.subtract(1, 'days').format('dddd');
      break;
    case "hoje":
      diaSemanaDesejado = diaAtual.format('dddd');
      break;
    case "amanhã":
      diaSemanaDesejado = diaAtual.add(1, 'days').format('dddd');
      break;
  }

  return capitalizeWords(diaSemanaDesejado);
}

module.exports = obterDiaSemana;

