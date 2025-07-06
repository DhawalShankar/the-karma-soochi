document.addEventListener('DOMContentLoaded', () => {
  const todoInput = document.getElementById("todo-input");
  const addTask = document.getElementById("add-btn");
  const ToDoList = document.getElementById("missionList");

  let todos = JSON.parse(localStorage.getItem('todos')) || [];
  todos.forEach((todo) => renderTodo(todo));

  addTask.addEventListener("click", function () {
    if (todoInput.value.trim() === "") return;

    const newTask = {
      id: Date.now(), 
      text: todoInput.value.trim(),
      completed: false
    };

    todos.push(newTask);
    saveTodos();
    renderTodo(newTask); // ✅ Add this so it shows on screen
    todoInput.value = "";
    console.log(todos);
  });

  function saveTodos() {
    localStorage.setItem("todos", JSON.stringify(todos));
  }

  function renderTodo(task) {
    const li = document.createElement("li");
    li.setAttribute("data-id", task.id);
    li.className = "flex text-2xl justify-between items-center border-1 px-6 py-3 bg-orange-300 rounded-lg shadow-md text-black m-2 ml-5";

    const span = document.createElement("span");
    span.textContent = task.text;
     span.addEventListener("click", () => {
    span.classList.toggle("cut");
    task.completed = !task.completed;
    saveTodos(); // Save updated completion status
  });
   span.addEventListener("dblclick", () => {
  const input = document.createElement("input");
  input.type = "text";
  input.value = task.text;
  input.className = "bg-yellow-100 text-black rounded px-2 py-1";

  // Replace span with input
  li.replaceChild(input, span);
  input.focus();

  input.addEventListener("blur", () => {
    task.text = input.value.trim() || task.text;
    saveTodos();

    span.textContent = task.text;
    li.replaceChild(span, input);
  });

  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") input.blur();
  });
});
    
    const delBtn = document.createElement("button");
    delBtn.textContent = "Delete";
    delBtn.className = "px-6 py-3 bg-gray-500 hover:bg-red-700 text-white rounded-lg shadow-md hover:shadow-gray-300 focus:ring-2 focus:ring-orange-300 transition m-2";

    delBtn.addEventListener("click", () => {
      todos = todos.filter(t => t.id != task.id);
      saveTodos();
      li.remove();
    });
    

    li.appendChild(span);
    li.appendChild(delBtn);
    ToDoList.appendChild(li); // ✅ corrected this line
  }
});
