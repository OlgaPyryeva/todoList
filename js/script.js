"use strict";

const todoControl = document.querySelector(".todo-control");
const headerInput = document.querySelector(".header-input");
const todoList = document.querySelector(".todo-list");
const todoCompleted = document.querySelector(".todo-completed");
const toDoData = JSON.parse(localStorage.getItem("toDoData")) || [];

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
      localStorage.setItem("toDoData", JSON.stringify(toDoData));
    } else {
      todoList.append(li);
      localStorage.setItem("toDoData", JSON.stringify(toDoData));
    }
    li.querySelector(".todo-complete").addEventListener("click", function () {
      item.completed = !item.completed;
      render();
    });
    li.querySelector(".todo-remove").addEventListener("click", function () {
      toDoData.splice(index, 1);
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
  if (headerInput.value.trim() !== "") {
    toDoData.push(newToDo);
    localStorage.setItem("toDoData", JSON.stringify(toDoData));
  } else {
    alert("добавить пустое дело нельзя, введите текст");
  }

  headerInput.value = "";
  render();
});

render();
