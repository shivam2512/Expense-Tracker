// Function to retrieve expenses from local storage
function getExpenses() {
  return JSON.parse(localStorage.getItem('expenses')) || [];
}

// Function to save expenses to local storage
function saveExpenses(expenses) {
  localStorage.setItem('expenses', JSON.stringify(expenses));
}

// Function to render expenses on the screen
function renderExpenses(expenses) {
  const expensesList = document.getElementById('expensesList');
  expensesList.innerHTML = '';

  expenses.forEach((expense, index) => {
    const expenseItem = document.createElement('div');
    expenseItem.classList.add('expense-item');

    const expenseInfo = document.createElement('div');
    expenseInfo.innerHTML = `
      <strong>${expense.description}</strong> - 
      <span>${expense.amount}</span> - 
      <span>${expense.category}</span>
    `;

    const expenseActions = document.createElement('div');
    expenseActions.classList.add('expense-actions');

    const editButton = document.createElement('button');
    editButton.innerHTML = 'Edit';
    editButton.addEventListener('click', () => editExpense(index));

    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = 'Delete';
    deleteButton.addEventListener('click', () => deleteExpense(index));

    expenseActions.appendChild(editButton);
    expenseActions.appendChild(deleteButton);

    expenseItem.appendChild(expenseInfo);
    expenseItem.appendChild(expenseActions);

    expensesList.appendChild(expenseItem);
  });
}

// Function to add a new expense
function addExpense(event) {
  event.preventDefault();

  const amountInput = document.getElementById('amount');
  const descriptionInput = document.getElementById('description');
  const categoryInput = document.getElementById('category');

  const amount = parseFloat(amountInput.value);
  const description = descriptionInput.value;
  const category = categoryInput.value;

  const expenses = getExpenses();
  expenses.push({ amount, description, category });
  saveExpenses(expenses);

  amountInput.value = '';
  descriptionInput.value = '';
  categoryInput.value = '';

  renderExpenses(expenses);
}

// Function to edit an expense
function editExpense(index) {
  const expenses = getExpenses();
  const expense = expenses[index];

  const amount = prompt('Enter new amount:', expense.amount);
  const description = prompt('Enter new description:', expense.description);
  const category = prompt('Enter new category:', expense.category);

  expense.amount = parseFloat(amount);
  expense.description = description;
  expense.category = category;

  saveExpenses(expenses);
  renderExpenses(expenses);
}

// Function to delete an expense
function deleteExpense(index) {
  const expenses = getExpenses();
  expenses.splice(index, 1);
  saveExpenses(expenses);
  renderExpenses(expenses);
}

// Add event listener to the form
document.getElementById('expenseForm').addEventListener('submit', addExpense);

// Render expenses on page load
const expenses = getExpenses();
renderExpenses(expenses);
