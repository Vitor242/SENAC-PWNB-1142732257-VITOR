document.addEventListener("DOMContentLoaded", function () {
  const tabelaRelatorio = document.getElementById("clientesRelatorio").querySelector("tbody");

  function carregarClientes() {
    tabelaRelatorio.innerHTML = "";

    const dadosClientes = JSON.parse(localStorage.getItem('dadosClientes')) || [];

    for (let i = 0; i < dadosClientes.length; i++) {
      const cliente = dadosClientes[i];
      const tr = document.createElement("tr");

      tr.innerHTML = `
        <td>${cliente.nome || ""}</td>
        <td>${cliente.sobrenome || ""}</td>
        <td>${cliente.dataNascimento || ""}</td>
        <td>${cliente.cidade || ""}</td>
        <td>${cliente.cep || ""}</td>
        <td>${cliente.endereco || ""}</td>
        <td>${cliente.email || ""}</td>
        <td>${cliente.tipo || ""}</td>
        <td>${cliente.uf || ""}</td>
      `;

      tr.addEventListener("click", function () {
        selecionarCliente(tr);
      });

      tabelaRelatorio.appendChild(tr);
    }
  }

  window.selecionarCliente = function (linha) {
    const linhas = tabelaRelatorio.getElementsByTagName("tr");
    for (let i = 0; i < linhas.length; i++) {
      linhas[i].classList.remove("selecionada");
    }

    linha.classList.add("selecionada");
  };

  window.deletarCliente = function () {
    const linhaSelecionada = tabelaRelatorio.querySelector(".selecionada");
    if (linhaSelecionada) {
      const index = linhaSelecionada.rowIndex - 1;
      const dadosClientes = JSON.parse(localStorage.getItem('dadosClientes')) || [];
      dadosClientes.splice(index, 1);
      localStorage.setItem('dadosClientes', JSON.stringify(dadosClientes));
      carregarClientes();
    } else {
      alert("Por favor, selecione um cliente para deletar.");
    }
  };

  window.voltar = function () {
    
    window.location.href = "../CadCliente/CadCliente.html";
  };

  carregarClientes();
});