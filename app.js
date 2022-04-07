// Selectors 
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filter = document.querySelector('.filter');

//Event Listeners
document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteTodo);
filter.addEventListener('click', filterTodo);

//Functions
function addTodo(e){
    e.preventDefault();
    //Todo DIV
    const todoDiv = document.createElement("div");
    todoDiv.classList.add('todo');
    //Create LI
    const newTodo = document.createElement("li");
    newTodo.innerText = todoInput.value;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);
    // Add todo to local storage
    saveTodos(todoInput.value);
    //Check Button
    const checkButton = document.createElement('button');
    checkButton.innerHTML = '<i class="fa-solid fa-check"></i>'
    checkButton.classList.add('check-btn');
    todoDiv.appendChild(checkButton);
    //Delete Button
    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = '<i class="fas fa-trash"></i>'
    deleteButton.classList.add('delete-btn');
    todoDiv.appendChild(deleteButton);
    //Append Todo List
    todoList.appendChild(todoDiv);
    //Clear input
    todoInput.value = "";
}

function deleteTodo(e) {
    const item = e.target;
    if (item.classList[0] === 'delete-btn') {
        const todo = item.parentElement;
        todo.classList.add('fall');
        removeTodos(todo);
        todo.addEventListener('transitionend', function(){
            todo.remove();
        })
    }

    //Check Mark
    if (item.classList[0] === 'check-btn') {
        const todo = item.parentElement;
        todo.classList.toggle('completed');
    }
}


function filterTodo(e) {
    const todos = todoList.childNodes;
    todos.forEach(function(todo) {
        switch (e.target.value) {
            case "all":
            todo.style.display = "flex";
            break;

            case "completed":
                if (todo.classList.contains('completed')) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
            break;
            
            case "uncompleted":
                if (!todo.classList.contains('completed')) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
        }
    });
}

function saveTodos(todo) {
    // Check local
    let todos;
    if(localStorage.getItem("todos") === null) {
        todos = [];
    } else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos() {
    let todos;
    if(localStorage.getItem("todos") === null) {
        todos = [];
    } else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    todos.forEach(function(todo){
        const todoDiv = document.createElement("div");
        todoDiv.classList.add('todo');
        //Create LI
        const newTodo = document.createElement("li");
        newTodo.innerText = todo;
        newTodo.classList.add('todo-item');
        todoDiv.appendChild(newTodo);
        //Check Button
        const checkButton = document.createElement('button');
        checkButton.innerHTML = '<i class="fa-solid fa-check"></i>'
        checkButton.classList.add('check-btn');
        todoDiv.appendChild(checkButton);
        //Delete Button
        const deleteButton = document.createElement('button');
        deleteButton.innerHTML = '<i class="fas fa-trash"></i>'
        deleteButton.classList.add('delete-btn');
        todoDiv.appendChild(deleteButton);
        //Append Todo List
        todoList.appendChild(todoDiv);
    });

}
function removeTodos(todo) {
    let todos;
    if(localStorage.getItem("todos") === null) {
        todos = [];
    } else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem("todos", JSON.stringify(todos));    
}