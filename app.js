let finances = {
  salary: 0,
  expenses: [],
  descriptions: [],
  savingsGoal: 0
};

// Función para activar el modo oscuro
function enableDarkMode() {
  document.body.classList.add('night-mode');
  localStorage.setItem('darkModeEnabled', 'true');
}

// Función para desactivar el modo oscuro
function disableDarkMode() {
  document.body.classList.remove('night-mode');
  localStorage.setItem('darkModeEnabled', 'false');
}

// Función para verificar la preferencia del modo oscuro al cargar la página
function checkDarkModePreference() {
  const darkModeEnabled = localStorage.getItem('darkModeEnabled');

  if (darkModeEnabled === 'true') {
    enableDarkMode();
  } else {
    disableDarkMode();
  }
}

// Llama a la función para verificar la preferencia del modo oscuro al cargar la página
checkDarkModePreference();

// Esta función guarda los datos en el localStorage
function saveToLocalStorage() {
  localStorage.setItem('financesData', JSON.stringify(finances));
}

// Esta función carga los datos desde el localStorage al iniciar la página
function loadFromLocalStorage() {
  const savedData = localStorage.getItem('financesData');
  if (savedData) {
    finances = JSON.parse(savedData);
    // Aquí puedes hacer algo con los datos cargados, como mostrarlos en la interfaz
    showExpenses(); // Esta es una función que muestra los gastos en la tabla
  }
}

// Llama a la función para cargar los datos almacenados al iniciar la página
loadFromLocalStorage();

// Función para mostrar los gastos en la tabla
function showExpenses() {
  const table = document.getElementById('expensesTable');
  table.innerHTML = `<tr>
                        <th>Gasto</th>
                        <th>Descripción</th>
                      </tr>`;

  finances.expenses.forEach((expense, index) => {
    const row = table.insertRow(-1);
    const cell1 = row.insertCell(0);
    const cell2 = row.insertCell(1);
    cell1.innerHTML = `$${expense}`;
    cell2.innerHTML = finances.descriptions[index] || 'Sin descripción';
  });
}

// Función para calcular el ahorro
function calculateSavings() {
  finances.salary = Number(document.getElementById('salaryInput').value);
  finances.expenses = document.getElementById('expensesInput').value.split(',').map(expense => Number(expense.trim()));
  finances.descriptions = document.getElementById('descriptionInput').value.split(',').map(description => description.trim());
  finances.savingsGoal = Number(document.getElementById('savingsGoalInput').value);

  const totalExpenses = finances.expenses.reduce((acc, expense) => acc + expense, 0);
  const monthlySavings = finances.salary - totalExpenses;
  const monthsToGoal = finances.savingsGoal / monthlySavings;

  const months = Math.floor(monthsToGoal);
  const remainingWeeks = Math.ceil((monthsToGoal - months) * 4.34524);

  let resultMessage = '';

  if (months > 0) {
    resultMessage += `Con un ahorro mensual de ${monthlySavings}$, tardarás aproximadamente ${months} meses`;
    if (remainingWeeks > 0) {
      resultMessage += ` y ${remainingWeeks} semanas`;
    }
    resultMessage += ` en alcanzar tu meta.`;
  } else {
    resultMessage = 'Tu ahorro mensual no es suficiente para alcanzar la meta.';
  }

  const result = document.getElementById('result');
  result.innerHTML = resultMessage;

  showExpenses();
  saveToLocalStorage(); // Guarda los datos en localStorage después de calcular el ahorro
}

// Función para cambiar entre modo día y modo noche
function toggleMode() {
  const darkModeEnabled = localStorage.getItem('darkModeEnabled');

  if (darkModeEnabled === 'true') {
    disableDarkMode();
  } else {
    enableDarkMode();
  }
}
