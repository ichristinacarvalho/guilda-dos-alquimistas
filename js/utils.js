export function validarCampos(nome, email) {

    return nome.trim() !== "" &&
        email.trim() !== "";
}

//* encontrar alquimista pelo ID *
export function encontrarAlquimista(alquimistas, id) {

    return alquimistas.find(alquimista => alquimista._id === id);
}

//* contar alquimistas *
export function contarAlquimistas(alquimistas) {

    return alquimistas.reduce((total) => total + 1, 0);
}