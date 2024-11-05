const form = document.querySelector('#form');
const field = document.querySelector('#field');
const todoWrapper = document.querySelector('.todo-items');

function validate(field) {
    if (field.value.length < 3) {
        alert("Belgilar yetarli emas!");
        field.focus();
        return false;
    }
    return true;
}

function createCard(data) {
    return `
    <div class="todo-item" data-id="${data.id}">
        <p>${data.name}</p>
        <span class="delete">Delete</span>
    </div>
    `;
}

function getDataFromLocalStorage() {
    const storedData = localStorage.getItem('todos');
    if (storedData) {
        return JSON.parse(storedData);
    } else {
        return [];
    }
}

function saveDataToLocalStorage(data) {
    localStorage.setItem('todos', JSON.stringify(data));
}

function displayTodos() {
    const todos = getDataFromLocalStorage();
    todoWrapper.innerHTML = '';
    todos.reverse().forEach(todo => {
        const card = createCard(todo);
        todoWrapper.innerHTML += card;
    });
    deleteTodo();
}

function addTodo() {
    const isValid = validate(field);
    if (!isValid) {
        return;
    }

    const todo = {
        id: Date.now(),
        name: field.value
    };

    let todos = getDataFromLocalStorage();
    todos.push(todo);
    saveDataToLocalStorage(todos);
    displayTodos();
    field.value = '';
}

function deleteTodo() {
    const deleteButtons = document.querySelectorAll('.delete');
    deleteButtons.forEach(button => {
        button.onclick = function() {
            const todoItem = this.parentElement;
            const todoId = Number(todoItem.getAttribute('data-id'));
            let todos = getDataFromLocalStorage();
            todos = todos.filter(todo => todo.id !== todoId);
            saveDataToLocalStorage(todos);
            displayTodos();
        };
    });
}

form.onsubmit = function(event) {
    event.preventDefault();
    addTodo();
};

document.addEventListener('DOMContentLoaded', function() {
    displayTodos();
});
    