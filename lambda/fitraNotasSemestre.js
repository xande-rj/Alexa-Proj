function encontrarObjetoPorSemestre(array, semestreDesejado) {
    for (let i = 0; i < array.length; i++) {
        if (array[i].semestre === semestreDesejado) {
            return array[i];
        }
    }
    return null; // Retorna null se o semestre não for encontrado no array
}
module.exports = encontrarObjetoPorSemestre