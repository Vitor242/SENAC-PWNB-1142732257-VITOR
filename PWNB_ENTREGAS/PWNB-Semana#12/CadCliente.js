// Declaração de variáveis
let clientes = [];

// Funções e Arrow Functions
function validarDados() {
  const nome = document.getElementById("nome").value;
  const sobrenome = document.getElementById("sobrenome").value;
  const dataNascimento = document.getElementById("dataNascimento").value;
  const cidade = document.getElementById("cidade").value;
  const cep = document.getElementById("cep").value;
  const endereco = document.getElementById("endereco").value;
  const email = document.getElementById("email").value;

  // Expressões regulares para validações
  const regexNome = /^[a-zA-Z\s]{3,}$/;
  const regexDataNascimento = /^\d{4}-\d{2}-\d{2}$/;
  const regexCidade = /^[a-zA-Z\s]{3,}$/;
  const regexCEP = /^\d{8}$/;
  const regexEndereco = /^.{3,}$/;
  const regexEmail = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;

  // Verifique se os campos estão vazios
  if (
    nome === "" ||
    sobrenome === "" ||
    dataNascimento === "" ||
    cidade === "" ||
    cep === "" ||
    endereco === "" ||
    email === ""
  ) {
    alert("Por favor, preencha todos os campos.");
    return false;
  }

  // Verifique outras validações usando regex
  if (!regexNome.test(nome)) {
    alert("O nome deve conter pelo menos 3 letras e ser composto apenas por letras e espaços.");
    return false;
  }

  if (!regexDataNascimento.test(dataNascimento)) {
    alert("A data de nascimento deve estar no formato AAAA-MM-DD.");
    return false;
  }

  if (!regexCidade.test(cidade)) {
    alert("A cidade deve conter pelo menos 3 letras e ser composta apenas por letras e espaços.");
    return false;
  }

  if (!regexCEP.test(cep)) {
    alert("O CEP deve conter exatamente 8 dígitos numéricos.");
    return false;
  }

  if (!regexEndereco.test(endereco)) {
    alert("O endereço deve conter pelo menos 3 caracteres.");
    return false;
  }

  if (!regexEmail.test(email)) {
    alert("O email deve ter o formato válido de um endereço de email.");
    return false;
  }

  return true;
}

function incluirCliente() {
  // Valida os dados do formulário
  if (!validarDados()) {
    return;
  }

  // Cria um novo cliente
  const cliente = {
    nome: nome.value,
    sobrenome: sobrenome.value,
    dataNascimento: dataNascimento.value,
    cidade: cidade.value,
    cep: cep.value.replace("-", ""),
    endereco: endereco.value,
    email: email.value,
    tipo: tipoCliente.value
  };

  // Adiciona o cliente à lista de clientes
  clientes.push(cliente);

  // Limpa os campos do formulário
  limparCampos();

  // Atualiza a tabela
  atualizarTabela();
}
  

function atualizarTabela() {
  const clientesLista = document.getElementById("clientesLista");

  // Limpa a tabela
  while (clientesLista.firstChild) {
    clientesLista.removeChild(clientesLista.firstChild);
  }

  // Adiciona um novo registro para cada cliente
  for (const cliente of clientes) {
    const tr = document.createElement("tr");

    // Adiciona as colunas da tabela
    tr.appendChild(document.createElement("td").textContent(cliente.nome));
    tr.appendChild(document.createElement("td").textContent(cliente.sobrenome));
    tr.appendChild(document.createElement("td").textContent(cliente.dataNascimento));
    tr.appendChild(document.createElement("td").textContent(cliente.cidade));
    tr.appendChild(document.createElement("td").textContent(cliente.cep));
    tr.appendChild(document.createElement("td").textContent(cliente.endereco));
    tr.appendChild(document.createElement("td").textContent(cliente.email));
    tr.appendChild(document.createElement("td").textContent(cliente.tipo));

    // Adiciona a linha à tabela
    clientesLista.appendChild(tr);

    // Remove o cliente da lista
    clientes.splice(clientes.indexOf(cliente), 1);
  }
}