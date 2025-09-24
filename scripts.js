import { Cliente } from "./classes.js";
import { validarCliente, criarElementoCliente, extrairEmails, contarClientes, buscarPorEmail } from "./utils.js";

const API_URL = "https://crudcrud.com/api/8ed122cc9ba14c27bf80b7a392c5da2c/clientes";

const form = document.getElementById("clienteForm");
const lista = document.getElementById("clientesLista");

// Cadastrar cliente
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const nome = document.getElementById("nome").value;
  const email = document.getElementById("email").value;

  if (!validarCliente(nome, email)) {
    alert("Preencha todos os campos!");
    return;
  }

  const cliente = new Cliente(nome, email);

  try {
    await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(cliente)
    });

    form.reset();
    carregarClientes();
  } catch (error) {
    console.error("Erro ao cadastrar cliente:", error);
  }
});

// Listar clientes
async function carregarClientes() {
  lista.innerHTML = "";

  try {
    const resposta = await fetch(API_URL);
    const clientesData = await resposta.json();

    // Transformamos em objetos Cliente
    const clientes = clientesData.map(c => new Cliente(c.nome, c.email, c._id));

    clientes.forEach(cliente => {
      const li = criarElementoCliente(cliente, excluirCliente);
      lista.appendChild(li);
    });

    // Debug: exemplos de funções funcionais
    console.log("Emails:", extrairEmails(clientes));
    console.log("Total de clientes:", contarClientes(clientes));
    console.log("Buscar por email:", buscarPorEmail(clientes, "teste@teste.com"));

  } catch (error) {
    console.error("Erro ao carregar clientes:", error);
  }
}

// Excluir cliente
async function excluirCliente(id) {
  try {
    await fetch(`${API_URL}/${id}`, {
      method: "DELETE"
    });
    carregarClientes();
  } catch (error) {
    console.error("Erro ao excluir cliente:", error);
  }
}

// Inicializa
carregarClientes();
