function unidadeExtenso(abreviacao) {
    const diasDaSemanaExtenso = {
        'Coord. BS': 'Coord. Bonsucesso',
        'Coord. BG': 'Coord. Bangu',
        'Coord. CG': 'Coord. Campo Grande',
    };

    return diasDaSemanaExtenso[abreviacao] || 'Desconhecido';
}

module.exports = unidadeExtenso