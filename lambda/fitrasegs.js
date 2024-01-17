function removerSegundos(horario) {
    const regexFormato = /^(\d{2}:\d{2}):\d{2}$/;
    if (!regexFormato.test(horario)) {
      console.error('Formato de horário inválido');
      return horario;
    }
  
    const horarioSemSegundos = horario.replace(/:\d{2}$/, '');
  
    return horarioSemSegundos;
  }

  module.exports = removerSegundos