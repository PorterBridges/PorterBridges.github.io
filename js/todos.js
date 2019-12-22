var todoListFromLS = window.localStorage.getItem("todos");
if(todoListFromLS){
    todoListFromLS = JSON.parse(todoListFromLS);
}
var todoList = todoListFromLS || [];

renderTodoList();

function addTodo(title, description){
    todoList.push({
        id: (new Date()).getTime(),
        title: title,
        description: description,
        done: false
    });
    updateToLocalStorage();
    console.log("todolist: ", todoList)
}


function markAsDone(id){
    for(var i=0; i<todoList.length; i++){
        var todo = todoList[i];
        if(todo.id == id){
            todo.done = true;
        }
    }    
    updateToLocalStorage();
}

function toggleTodoDone(id){
    for(var i=0; i<todoList.length; i++){
        var todo = todoList[i];
        if(todo.id == id){
            todo.done = !todo.done;
        }
    }    
    updateToLocalStorage();
}

function updateToLocalStorage(){
    window.localStorage.setItem("todos", JSON.stringify(todoList));
}


function renderTodoList(){
    var todoListDiv = document.querySelector(".todo-list");
    todoListDiv.innerHTML = "";
    for(var i=0; i<todoList.length; i++){
        var todo = todoList[i];
        var todoItem = document.createElement("div");
        todoItem.innerText = todo.title + "-----" + todo.done;
        todoItem.setAttribute("data-id", todo.id);
        todoItem.addEventListener("click", function(event) {
            toggleTodoDone(event.target.dataset.id);
            renderTodoList();
        })
        todoListDiv.append(todoItem);
    }
}

var todoInput = document.querySelector("#todo-input");
var addTodoBtn = document.querySelector("#add-todo-btn");

todoInput.addEventListener("keyup", function(e) {
    if(e.which == 13){
        addTodo(todoInput.value, todoInput.value);
        renderTodoList();
    }
})

addTodoBtn.addEventListener("click", function(){
    addTodo(todoInput.value, todoInput.value);
    renderTodoList();
})