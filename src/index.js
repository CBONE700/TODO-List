import "./styles.css";
import { todoItem } from "./new-todo";

//Array for storage
let todoList = [];

let tmp = new todoItem("Callums Thing", "", new Date("2025-06-02"), "Urgent", false);
todoList.push(tmp);
todoUpdate(document.querySelector("#todoItems"), todoList);

//Open dialog
const newTodo = document.querySelector("#modalOpen");
const dialog = document.querySelector("#addTodoDialog");
newTodo.addEventListener("click", () => {
    dialog.showModal();
})

//Handle form submissions and update dom
const submit = document.querySelector("#submitButton");
const todoItems = document.querySelector("#todoItems");
submit.addEventListener("click", (e) => {
    const form = document.querySelector("#addTodoForm");
    if (!form.checkValidity()) {
        alert("Please fill out all required fields.")
        e.preventDefault();
    }
    else {
        insertTodoSorted(createTodoFromForm());
        todoUpdate(todoItems, todoList);
        console.log(todoList);
        dialog.close();
        e.preventDefault();
    }
})

//Close dialog
const close = document.querySelector("#modalClose");
close.addEventListener("click", (e) => {
    dialog.close();
    e.preventDefault();
})

//Update the dom
function todoUpdate(todoList, arr){
    todoList.innerHTML = '';
    for (let item of arr) {
        todoList.innerHTML += 
        `<div id="${item.title}">
            <input type="checkbox" class="completed">
            <div class="title">${item.title}</div>
            <button class="detailButton">Details</button>
            <div class="due">${item.due.getDate()}-${item.due.getMonth() + 1}-${item.due.getFullYear()}</div>
        </div>`;
    }
    console.log(todoList.innerHTML);
}

//Create new todo object
function createTodoFromForm() {
    const title = document.querySelector("#title").value;
    const desc = document.querySelector("#desc").value;
    const due = new Date(document.querySelector("#dueDate").value);
    const priority = document.querySelector('input[name="todoPriority"]:checked').value;

    return new todoItem(title, desc, due, priority, false);
}

//Insert sorted by date
function insertTodoSorted(todo) {
    for (let i = 0; i < todoList.length; i++) {
        if (todoList[i].due >= todo.due) {
            todoList.splice(i, 0, todo);
            return;
        }
    }
    todoList.push(todo);
}