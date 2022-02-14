const todoControl = document.querySelector(".todo-control");
const headerInput = document.querySelector(".header-input");
const todoList = document.querySelector(".todo-list");
const todoCompleted = document.querySelector(".todo-completed");
let toDoData = [];

const todoLoad = function () {
  let result = JSON.parse(localStorage.getItem("toDoData"));

  if (result == null) {
    result = [];
  }

  return result;
};

toDoData = todoLoad();

const render = function () {
  todoList.innerHTML = "";
  todoCompleted.innerHTML = "";

  toDoData.forEach(function (item, index) {
    const li = document.createElement("li");
    li.classList.add("todo-item");
    li.innerHTML =
      '<span class="text-todo">' +
      item.text +
      "</span>" +
      '<div class="todo-buttons">' +
      '<button class="todo-remove"></button>' +
      '<button class="todo-complete"></button>' +
      "</div>";

    if (item.completed) {
      todoCompleted.append(li);
      localStorage.clear();
      localStorage.setItem("toDoData", JSON.stringify(toDoData));
    } else {
      todoList.append(li);
      localStorage.clear();
      localStorage.setItem("toDoData", JSON.stringify(toDoData));
    }
    li.querySelector(".todo-complete").addEventListener("click", function () {
      item.completed = !item.completed;
      render();
    });
    li.querySelector(".todo-remove").addEventListener("click", function () {
      toDoData.splice(toDoData.index, 1);
      localStorage.clear();
      localStorage.setItem("toDoData", JSON.stringify(toDoData));
      headerInput.value = "";
      render();
    });
  });
};

todoControl.addEventListener("submit", function (event) {
  event.preventDefault();
  const newToDo = {
    text: headerInput.value,
    completed: false,
  };
  if (headerInput.value !== "") {
    toDoData.push(newToDo);
    localStorage.clear();
    localStorage.setItem(toDoData, JSON.stringify(toDoData));
  } else {
    alert("добавить пустое дело нельзя, введите текст");
  }

  headerInput.value = "";
  render();
});

render();
