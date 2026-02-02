const mainTodoElem = document.querySelector('.todo-list-elem');
const inputValue = document.getElementById('inputValue');

let localTodolists = [];

//  SAVE 
const saveToLocal = () => {
    localStorage.setItem("todos", JSON.stringify(localTodolists));
};

//LOAD 
const loadFromLocal = () => {
    const data = localStorage.getItem("todos");
    if (data) {
        localTodolists = JSON.parse(data);
        localTodolists.forEach(text => createTodoUI(text));
    }
};

//  CREATE UI
const createTodoUI = (text) => {
    const divElement = document.createElement('div');
    divElement.classList.add('main_todo_list');

    divElement.innerHTML = `
        <li>${text}</li>
        <button class="deleteBtn">Delete</button>
    `;

    mainTodoElem.append(divElement);
};

// ADD 
const addTodoList = (e) => {
    e.preventDefault();

    const todoListValue = inputValue.value.trim();
    if (todoListValue === "") return;

    localTodolists.push(todoListValue);
    saveToLocal();

    createTodoUI(todoListValue);
    inputValue.value = "";
};

document.querySelector('.btn').addEventListener("click", addTodoList);

//  DELETE
mainTodoElem.addEventListener("click", (e) => {
    if (e.target.classList.contains("deleteBtn")) {
        const text = e.target.previousElementSibling.textContent;

        localTodolists = localTodolists.filter(t => t !== text);
        saveToLocal();

        e.target.parentElement.remove();
    }
});

// PAGE LOAD 
loadFromLocal();
