const salarios = [1550, 2120, 1910, 2340, 19000, 1300, 2850, 1710, 2990, 2000];

  function calcularNovoSalario(salario) {
      if (salario <= 2000) {
          return salario * 1.15;
      } else {
          return salario * 1.1; 
      }
  }


  const novosSalarios = salarios.map(calcularNovoSalario);

  for (let i = 0; i < salarios.length; i++) {

  console.log(`O salário antigo é: ${salarios[i]} - Novo salário é: ${novosSalarios[i]}`);
  }

  const salariosSuperiores2500 = novosSalarios.filter(salario => salario > 2500);

  console.log(`Os salários superiores a 2500 são: ${salariosSuperiores2500}`);

  const somaSalarios = salariosSuperiores2500.reduce((total, salario) => total + salario, 0);

  console.log(`A soma dos salários superiores a 2500 é: ${somaSalarios}`);



const descriptionInput = document.getElementById('task-description');
const authorInput = document.getElementById('task-author');
const departmentInput = document.getElementById('task-department');
const importanceInput = document.getElementById('task-importance');
const paidTaskCheck = document.getElementById('paid-task');
const timedTaskCheck = document.getElementById('timed-task');
const addButton = document.getElementById('add-task-button');
const orderTasksButton = document.getElementById('order-tasks-button');
const importanceList = document.getElementById('importance-list');
const taskTableBody = document.querySelector('#exercicio-2 tbody[tarefas]');


addButton.addEventListener('click', addTask);
orderTasksButton.addEventListener('click', orderTasksByImportance);


function addTask() {
  const description = descriptionInput.value;
  const author = authorInput.value;
  const department = departmentInput.value;
  const importance = importanceInput.value || null;


  const task = {
    description,
    author,
    department,
    importance,

  };

  const row = createTaskRow(task);
  taskTableBody.insertAdjacentHTML('beforeend', row);
}


function createTaskRow(task) {
  const id = `task-${task.id}`;

  return `
    <tr id="${id}">
      <td>${task.description}</td>
      <td>${task.author}</td>
      <td>${task.department}</td>
      <td>${task.importance}</td>
      <td><button onclick="deleteTask('${id}')">Excluir</button></td>
    </tr>
  `;
}


function deleteTask(taskId) {
  const taskRow = document.getElementById(taskId);
  if (taskRow) {
    taskRow.remove();
  }
}


function orderTasksByImportance() {
  const taskRows = Array.from(taskTableBody.querySelectorAll('tr'));
  const sortedTasks = taskRows
    .map(row => {
      return {
        description: row.querySelector('td:first-child').textContent,
        importance: parseInt(row.querySelector('td:nth-child(4)').textContent) || 0
      };
    })
    .sort((taskA, taskB) => taskB.importance - taskA.importance);

  importanceList.innerHTML = '';

  sortedTasks.forEach(task => {
    const listItem = document.createElement('li');
    listItem.textContent = task.description;
    importanceList.appendChild(listItem);
  });
}