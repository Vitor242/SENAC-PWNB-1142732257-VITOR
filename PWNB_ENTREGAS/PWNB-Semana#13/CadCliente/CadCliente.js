// Função para incluir um novo cliente
function incluirCliente() {
  if (!validarDados()) {
    return;
  }

  const uf = document.getElementById("uf").value;
  if (uf === "") {
    alert("selecione uma UF");
    return;
  }

  const cep = document.getElementById("cep").value.replace("-", "");
  const cliente = {
    nome: document.getElementById("nome").value,
    sobrenome: document.getElementById("sobrenome").value,
    dataNascimento: document.getElementById("dataNascimento").value,
    cidade: document.getElementById("cidade").value,
    cep: cep,
    endereco: document.getElementById("endereco").value,
    email: document.getElementById("email").value,
    tipo: document.getElementById("tipoCliente").value,
    uf: uf
  };

  const dadosClientes = JSON.parse(localStorage.getItem('dadosClientes')) || [];
  dadosClientes.push(cliente);
  localStorage.setItem('dadosClientes', JSON.stringify(dadosClientes));

  limparCampos();
  window.location.href = "../Relatorio/relatorio.html";
}

function limparCampos() {
  document.getElementById("frm1").reset();
}

function irParaRelatorios() {
  window.location.href = "../Relatorio/relatorio.html";
}

function validarDados() {
  const nome = document.getElementById("nome").value;
  const sobrenome = document.getElementById("sobrenome").value;
  const dataNascimento = document.getElementById("dataNascimento").value;
  const cidade = document.getElementById("cidade").value;
  const cep = document.getElementById("cep").value;
  const endereco = document.getElementById("endereco").value;
  const email = document.getElementById("email").value;

  const regexNome = /^[a-zA-Z\s]{3,}$/;
  const regexDataNascimento = /^\d{4}-\d{2}-\d{2}$/;
  const regexCidade = /^[a-zA-Z\s]{3,}$/;
  const regexCEP = /^\d+$/;
  const regexEndereco = /^.{3,}$/;
  const regexEmail = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;

  if (
    nome === "" ||
    sobrenome === "" ||
    dataNascimento === "" ||
    cidade === "" ||
    cep === "" ||
    endereco === "" ||
    email === ""
  ) {
    alert("Erro campo vazio");
    return false;
  }

  if (!regexNome.test(nome)) {
    alert("O nome deve conter pelo menos 3 letras e ter somente letras e espaços");
    return false;
  }

  if (!regexDataNascimento.test(dataNascimento)) {
    alert("A data de nascimento tem que estar no formato AAAA-MM-DD");
    return false;
  }

  if (!regexCidade.test(cidade)) {
    alert("A cidade deve ter no minimo  3 letras e ter apenas letras e espaços");
    return false;
  }

  if (!regexCEP.test(cep)) {
    alert("O CEP deve conter apenas números");
    return false;
  }

  if (!regexEndereco.test(endereco)) {
    alert("O endereço deve conter pelo menos 3 caracteres");
    return false;
  }

  if (!regexEmail.test(email)) {
    alert("O email deve ser válido ");
    return false;
  }

  return true;
}

function carregarUFs() {
  const ufSelect = document.getElementById("uf");
  const ufs = ["AC", "AL", "AM", "AP", "BA", "CE", "DF", "ES", "GO", "MA", "MG", "MS", "MT", "PA", "PB", "PE", "PI", "PR", "RJ", "RN", "RO", "RR", "RS", "SC", "SE", "SP", "TO"];

  for (const uf of ufs) {
    const option = document.createElement("option");
    option.value = uf;
    option.textContent = uf;
    ufSelect.appendChild(option);
  }
}

carregarUFs();