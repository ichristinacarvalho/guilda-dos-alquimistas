import { Alquimista } from "./classes.js";

import {
    validarCampos,
    encontrarAlquimista,
    contarAlquimistas
} from "./utils.js";

"use strict";


//* API *

const API_URL = "https://crudcrud.com/api/6605711f789d45849f7962bfa2fb7d2f/alquimistas";


//* elementos do DOM *

const form = document.getElementById("formAlquimista");

const lista = document.getElementById("alquimistasRegistrados");


//* CARREGAR ALQUIMISTAS *

function carregarAlquimistas() {

    fetch(API_URL)

        .then(resposta => {

            if (!resposta.ok) {
                throw new Error(`Erro HTTP: ${resposta.status}`);
            }

            return resposta.json();

        })

        .then(dados => {

            lista.innerHTML = "";


            //* MAP *

            dados.map(alquimista => {

                const item = document.createElement("li");

                item.textContent = `${alquimista.nome} - ${alquimista.email}`;


                const botao = document.createElement("button");

                botao.textContent = "Expulsar da Guilda";

                botao.classList.add("btn-expulsar");


                botao.addEventListener("click", function () {

                    excluirAlquimista(alquimista._id, dados);

                });


                item.appendChild(botao);

                lista.appendChild(item);

            });


            //* REDUCE *

            const total = contarAlquimistas(dados);

            console.log(`Total de alquimistas: ${total}`);

        })

        .catch(erro => {

            alert("Não foi possível carregar os alquimistas.");

            console.error("Erro técnico capturado:", erro);

        });

}


//* CADASTRAR ALQUIMISTA *

function cadastrarAlquimista() {

    const nome = document.getElementById("nome").value;

    const email = document.getElementById("email").value;


    //* validação *

    if (!validarCampos(nome, email)) {

        alert("Digite todas as informações, alquimista!");

        return;

    }


    //* criando objeto *

    const alquimista = new Alquimista(nome, email);


    //* enviando para a API *

    fetch(API_URL, {

        method: "POST",

        headers: {

            "Content-Type": "application/json"

        },

        body: JSON.stringify(alquimista)

    })

        .then(resposta => {

            if (!resposta.ok) {
                throw new Error(`Erro HTTP: ${resposta.status}`);
            }

            return resposta.json();

        })

        .then(dados => {

            alert("Alquimista registrado com sucesso!");

            document.getElementById("nome").value = "";

            document.getElementById("email").value = "";


            console.log("Salvo na API:", dados);


            //* atualiza a lista sem recarregar a página *

            carregarAlquimistas();

        })

        .catch(erro => {

            alert("Erro ao cadastrar alquimista.");

            console.error("Erro técnico:", erro);

        });

}


//* EXCLUIR ALQUIMISTA *

function excluirAlquimista(id, alquimistas) {

    //* FIND *

    const alquimista = encontrarAlquimista(alquimistas, id);


    if (!alquimista) {

        alert("Alquimista não encontrado.");

        return;

    }


    const confirmar = confirm(
        `Deseja realmente expulsar ${alquimista.nome} da Guilda?`
    );


    if (!confirmar) {
        return;
    }


    fetch(`${API_URL}/${id}`, {

        method: "DELETE"

    })

        .then(resposta => {

            if (!resposta.ok) {
                throw new Error(`Erro HTTP: ${resposta.status}`);
            }

        })

        .then(() => {

            alert("Alquimista removido com sucesso!");

            carregarAlquimistas();

        })

        .catch(erro => {

            alert("Erro ao remover alquimista!");

            console.error("Erro técnico capturado:", erro);

        });

}


//* EVENTO DO FORMULÁRIO *

form.addEventListener("submit", function (evento) {

    evento.preventDefault();

    cadastrarAlquimista();

});


//* inicia a aplicação *

carregarAlquimistas();