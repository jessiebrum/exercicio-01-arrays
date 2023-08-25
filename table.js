const lista = [];

const botaoAdicionarTarefa = document.querySelector("#btnAddTarefa");
const tBody = document.querySelector('tbody');
const tableRows = tBody.getElementsByTagName('tr');

//Cria o body da tabela a partir da array 'lista' que é alimentada no evento do botão de Adicionar
function updateTable(tabela) {
  const tableData = tabela.map((row) => {
    return `
    <tr id="idTr">
    <td>${row.Descrição}</td>
    <td>${row.Autor}</td>
    <td>${row.Departamento}</td>
    <td>${row.Importância}</td>
    <td>${row.Valor}</td>
    <td>${row.Duração}</td>
    <td><button type="submit" id="idBtn">Excluir</td>
    </tr>`;
  })
    .join('');

  tBody.innerHTML = tableData;
  deleteBtn();
}

//Determina o evento do botão para adicionar tarefas e alimentar a array 'lista'
botaoAdicionarTarefa.addEventListener("click", (e) => {
  e.preventDefault();

  const descricaoInput = document.querySelector("#idDescricao").value;
  const autorInput = document.querySelector("#idAutor").value;
  const dptoInput = document.querySelector("#idDpto").value;
  const importanciaInput = document.querySelector("#idImportancia").value;
  const valorInput = document.querySelector("#idValor").value;
  const duracaoInput = document.querySelector("#idDuracao").value;

  const objTabela = {
    "Descrição": descricaoInput,
    "Autor": autorInput,
    "Departamento": dptoInput,
    "Importância": importanciaInput,
    "Valor": valorInput,
    "Duração": duracaoInput
  }

  lista.push(objTabela);
  updateTable(lista);
});

//Funcionalidade para o botão excluir incluso em cada linha da tabela
function excluirLinha() {
  this.parentElement.parentElement.remove();
  const children = this.parentElement.parentElement.children;
  const linhaObj = {};
  linhaObj.Descrição = children[0].innerText;
  linhaObj.Autor = children[1].innerText;
  linhaObj.Departamento = children[2].innerText;
  linhaObj.Importância = children[3].innerText;
  linhaObj.Valor = children[4].innerText;
  linhaObj.Duração = children[5].innerText;

  const excluirIndex = lista.findIndex((obj) => {
    return obj.Descrição === linhaObj.Descrição &&
      obj.Autor === linhaObj.Autor &&
      obj.Departamento === linhaObj.Departamento &&
      obj.Importância === linhaObj.Importância &&
      `${obj.Valor}` === linhaObj.Valor &&
      obj.Duração === linhaObj.Duração
  });

  lista.splice(excluirIndex, 1);
}

//Cria o evento para o botão excluir a partir da linha em que foi gerado
function deleteBtn() {
  for (let i = 0; i < tableRows.length; i++) {
    const excluirBtn = tableRows[i].querySelector('#idBtn');
    excluirBtn.addEventListener("click", excluirLinha);
  }
}