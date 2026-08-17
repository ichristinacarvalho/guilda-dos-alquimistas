"use strict";

//função para carregar alquimistas
function carregarAlquimistas() {
    //fazer a requisição
    fetch("https://crudcrud.com/api/0aa3e61c8d96431f93a1fa1972b63e82/alquimistas")
        .then(resposta => resposta.json())
        .then(dados => {
            let lista = document.getElementById("alquimistasRegistrados");
            //limpa a lista
            lista.innerHTML = "";
            //criando um loop para cada alquimista criado
            for (let alquimista of dados) {
                lista.innerHTML += `
    <li>
        ${alquimista.nome} - ${alquimista.email} 
        <button class="btn-expulsar" onclick="excluirAlquimista('${alquimista._id}')">
            Expulsar da Guilda
        </button>
    </li>`;
            }
        })
        .catch(erro => {
            alert("Não foi possível fazer a verificação do alquimista.");
            console.error("Erro técnico capturado", erro);
        }
        )
}

//chamando a função carregarAlquimistas
carregarAlquimistas();

//função para cadastrar alquimista
function cadastrarAlquimista() {
    //acessar os inputs
    let nome = document.getElementById("nome").value;
    let email = document.getElementById("email").value;

    //validação
    if (nome === "" || email === "") {
        alert("Digite todas as informações, alquimista!");
        return;
    }

    fetch("https://crudcrud.com/api/0aa3e61c8d96431f93a1fa1972b63e82/alquimistas", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ nome: nome, email: email })
    })

        .then(resposta => resposta.json())
        .then(dados => {
            alert("Alquimista registrado com sucesso!");
            //limpa os campos
            document.getElementById("nome").value = "";
            document.getElementById("email").value = "";
            //chama a função para buscar os dados
            carregarAlquimistas();

            console.log("Salvo na API:", dados);
        })
        .catch(erro => {
            alert("Erro ao cadastrar alquimista.");
            console.error("Erro técnico:", erro);
        })
}

//chamando os eventos
let form = document.getElementById("formAlquimista");
form.addEventListener("submit", function (evento) {

    evento.preventDefault();

    cadastrarAlquimista();
})

//função para excluir alquimista
function excluirAlquimista(id) {
    fetch(`https://crudcrud.com/api/0aa3e61c8d96431f93a1fa1972b63e82/alquimistas/${id}`, {
        method: "DELETE"
    })
        .then(() => {
            alert("Alquimista removido com sucesso!");
            carregarAlquimistas();
        })
        .catch(erro => {
            alert("Erro ao remover alquimista!");
            console.error("Erro técnico capturado", erro);
        });
}
