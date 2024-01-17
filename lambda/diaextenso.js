function abreviacaoParaDiaExtenso(abreviacao) {
    const diasDaSemanaExtenso = {
        'DOM': 'Domingo',
        'SEG': 'Segunda',
        'TER': 'Terça',
        'QUA': 'Quarta',
        'QUI': 'Quinta',
        'SEX': 'Sexta',
        'SAB': 'Sábado'
    };

    return diasDaSemanaExtenso[abreviacao] || 'Desconhecido';
}

module.exports = abreviacaoParaDiaExtenso