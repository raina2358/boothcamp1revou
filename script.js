document.addEventListener("DOMContentLoaded", () => {
  const todoInput = document.getElementById("todo-input");
  const todoDate = document.getElementById("todo-date");
  const addBtn = document.getElementById("add-btn");
  const todoList = document.getElementById("todo-list");
  const deleteAllBtn = document.getElementById("delete-all-btn");
  const filterBtn = document.getElementById("filter-btn");

  let todos = [];
  let currentFilter = "all"; // all | pending | done

  function renderTodos() {
    todoList.innerHTML = "";
    let filteredTodos = todos;

    // Terapkan filter
    if (currentFilter === "pending") {
      filteredTodos = todos.filter(todo => !todo.completed);
    } else if (currentFilter === "done") {
      filteredTodos = todos.filter(todo => todo.completed);
    }

    if (filteredTodos.length === 0) {
      todoList.innerHTML = `<tr><td colspan="4" class="text-muted">No task found</td></tr>`;
      return;
    }

    filteredTodos.forEach((todo, index) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${todo.task}</td>
        <td>${todo.date}</td>
        <td>${todo.completed ? "Done" : "Pending"}</td>
        <td>
          <button class="btn btn-sm btn-success" onclick="toggleStatus(${index})">✔</button>
          <button class="btn btn-sm btn-danger" onclick="deleteTodo(${index})">✖</button>
        </td>
      `;
      todoList.appendChild(row);
    });
  }

  addBtn.addEventListener("click", () => {
    const task = todoInput.value.trim();
    const date = todoDate.value;

    if (task === "" || date === "") return;

    todos.push({ task, date, completed: false });
    todoInput.value = "";
    todoDate.value = "";

    renderTodos();
  });

  deleteAllBtn.addEventListener("click", () => {
    todos = [];
    renderTodos();
  });

  filterBtn.addEventListener("click", () => {
    // toggle urutan filter
    if (currentFilter === "all") {
      currentFilter = "pending";
      filterBtn.textContent = "FILTER: Pending";
    } else if (currentFilter === "pending") {
      currentFilter = "done";
      filterBtn.textContent = "FILTER: Done";
    } else {
      currentFilter = "all";
      filterBtn.textContent = "FILTER: All";
    }
    renderTodos();
  });

  // Buat global supaya bisa dipanggil onclick
  window.toggleStatus = function(index) {
    todos[index].completed = !todos[index].completed;
    renderTodos();
  };

  window.deleteTodo = function(index) {
    todos.splice(index, 1);
    renderTodos();
  };

  renderTodos();
});
