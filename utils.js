// Função pura: valida se os campos estão preenchidos
export function validarCliente(nome, email) {
  return nome.trim() !== "" && email.trim() !== "";
}

// Cria elemento de lista para um cliente
export function criarElementoCliente(cliente, excluirCallback) {
  const li = document.createElement("li");
  li.textContent = `${cliente.nome} - ${cliente.email} `;

  const btnExcluir = document.createElement("button");
  btnExcluir.textContent = "Excluir";
  btnExcluir.addEventListener("click", () => excluirCallback(cliente.id));

  li.appendChild(btnExcluir);
  return li;
}

// Exemplo de uso do map para extrair apenas os emails
export function extrairEmails(clientes) {
  return clientes.map(c => c.email);
}

// Exemplo de uso do reduce para contar total de clientes
export function contarClientes(clientes) {
  return clientes.reduce((total) => total + 1, 0);
}

// Exemplo de uso do find para buscar cliente por email
export function buscarPorEmail(clientes, email) {
  return clientes.find(c => c.email === email);
}
