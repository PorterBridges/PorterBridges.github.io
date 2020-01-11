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
        todoItem.className += " clearfix";
        var checkbox = document.createElement('input');
        checkbox.type = "checkbox";
        checkbox.name = "name";
        checkbox.checked = todo.done;

        todoItem.innerHTML = "<div class='todo-item'><div class='title'><b>" + todo.title + "</b></div>"  +"\n"+  "<div class='desc'>" + todo.description + "</div></div>";
        todoItem.prepend(checkbox);
        todoItem.setAttribute("data-id", todo.id);
        checkbox.setAttribute("data-id", todo.id);
        checkbox.addEventListener("change", function(event) {
            toggleTodoDone(event.target.dataset.id);
            renderTodoList();
        })
        todoListDiv.append(todoItem);
    }
}


var todoInput = document.querySelector("#todo-input");
var todoDesc = document.querySelector("#desc-input");
var addTodoBtn = document.querySelector("#add-todo-btn");

todoInput.addEventListener("keyup", function(e) {
    if(e.which == 13){
        addTodo(todoInput.value, todoDesc.value);
        renderTodoList();
    }
})


addTodoBtn.addEventListener("click", function(){
    addTodo(todoInput.value,todoDesc.value);
    renderTodoList();
})

