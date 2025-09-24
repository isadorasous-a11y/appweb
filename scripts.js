const API_URL = "https://crudcrud.com/api/8ed122cc9ba14c27bf80b7a392c5da2c";

const form = document.getElementById("clienteForm");
const lista = document.getElementById("clientesLista");

// Cadastrar cliente
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const nome = document.getElementById("nome").value;
  const email = document.getElementById("email").value;

  const novoCliente = { nome, email };

  try {
    await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(novoCliente)
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
    const clientes = await resposta.json();

    clientes.forEach(cliente => {
      const li = document.createElement("li");
      li.textContent = `${cliente.nome} - ${cliente.email} `;

      const btnExcluir = document.createElement("button");
      btnExcluir.textContent = "Excluir";
      btnExcluir.onclick = () => excluirCliente(cliente._id);

      li.appendChild(btnExcluir);
      lista.appendChild(li);
    });

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

// Carregar clientes ao iniciar
carregarClientes();
