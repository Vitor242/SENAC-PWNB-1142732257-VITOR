let clientes = [];

function criarTabela() {
  const clientesLista = document.getElementById("clientesLista");
  const tbody = clientesLista.querySelector("tbody");

  for (const cliente of clientes) {
    const tr = document.createElement("tr");

    tr.appendChild(document.createElement("td")).textContent = cliente.nome || "";
    tr.appendChild(document.createElement("td")).textContent = cliente.sobrenome || "";
    tr.appendChild(document.createElement("td")).textContent = cliente.dataNascimento || "";
    tr.appendChild(document.createElement("td")).textContent = cliente.cidade || "";
    tr.appendChild(document.createElement("td")).textContent = cliente.cep || "";
    tr.appendChild(document.createElement("td")).textContent = cliente.endereco || "";
    tr.appendChild(document.createElement("td")).textContent = cliente.email || "";
    tr.appendChild(document.createElement("td")).textContent = cliente.tipo || "";
    tr.appendChild(document.createElement("td")).textContent = cliente.uf || ""; 

    tbody.appendChild(tr);
  }
}

function adicionarEventosDeClique() {
  var linhas = document.querySelectorAll("#clientesLista tbody tr");

  for (var i = 0; i < linhas.length; i++) {
    linhas[i].onclick = function () {
      selecionarLinha(this);
    };
  }
}

function selecionarLinha(linha) {
  var linhas = document.querySelectorAll("#clientesLista tbody tr");
  for (var i = 0; i < linhas.length; i++) {
    linhas[i].classList.remove("selecionada");
  }

  linha.classList.add("selecionada");
}

function deletarCliente() {
  var linhaSelecionada = document.querySelector("#clientesLista tbody tr.selecionada");

  if (linhaSelecionada) {
    const indice = linhaSelecionada.rowIndex - 1;
    clientes.splice(indice, 1);
    linhaSelecionada.remove();
  } else {
    alert("escolha um cliente para deletar");
  }
}

function editarCliente() {
  var linhaSelecionada = document.querySelector("#clientesLista tbody tr.selecionada");

  if (linhaSelecionada) {
    const indice = linhaSelecionada.rowIndex - 1;

    document.getElementById("nome").value = clientes[indice].nome;
    document.getElementById("sobrenome").value = clientes[indice].sobrenome;
    document.getElementById("dataNascimento").value = clientes[indice].dataNascimento;
    document.getElementById("cidade").value = clientes[indice].cidade;
    document.getElementById("cep").value = clientes[indice].cep;
    document.getElementById("endereco").value = clientes[indice].endereco;
    document.getElementById("email").value = clientes[indice].email;
    document.getElementById("tipoCliente").value = clientes[indice].tipo;
    document.getElementById("uf").value = clientes[indice].uf;  

    clientes.splice(indice, 1);
    linhaSelecionada.remove();
  } else {
    alert("Escolha um cliente para editar");
  }
}

async function incluirCliente() {
  if (!validarDados()) {
    return;
  }

  const uf = document.getElementById("uf").value;
  if (uf === "") {
    alert("Selecione uma uf");
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

  clientes.push(cliente);
  limparCampos();
  atualizarTabela();
  adicionarEventosDeClique();
}

function atualizarTabela() {
  const clientesLista = document.getElementById("clientesLista");
  const tbody = clientesLista.querySelector("tbody");

  tbody.innerHTML = "";
  criarTabela();
  adicionarEventosDeClique();
}

function limparCampos() {
  document.getElementById("frm1").reset();
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
    alert("erro, Preencha todos os cantos!");
    return false;
  }

  if (!regexNome.test(nome)) {
    alert("o nome so pode ter letras e espaços e no minimo 3 letras");
    return false;
  }

  if (!regexDataNascimento.test(dataNascimento)) {
    alert("erro, formato de data tem que ser assim AAAA-MM-DD");
    return false;
  }

  if (!regexCidade.test(cidade)) {
    alert("A cidade só pode ter letras e espaços e no minimo 3 letras");
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
    alert("O email tem que ser um formato válido de um endereço de email");
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
criarTabela();
adicionarEventosDeClique();