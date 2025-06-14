import "./styles.css";
import { todoItem } from "./new-todo";

let todoList = [];

const newTodo = document.querySelector("#modalOpen");
const dialog = document.querySelector("#addTodoDialog");
newTodo.addEventListener("click", () => {
    dialog.showModal();
})

const submit = document.querySelector("#submitButton");
submit.addEventListener("click", (e) => {
    const form = document.querySelector("#addTodoForm");
    if (!form.checkValidity()) {
        alert("Please fill out all required fields.")
        e.preventDefault();
    }
    else {
        let todo = new todoItem(document.querySelector("#title").value, document.querySelector("#desc").value, document.querySelector("#dueDate").value, document.querySelector('input[name="todoPriority"]:checked').value, false);
        console.log(todo);
        todoList.push(todo);
        dialog.close();
        e.preventDefault();
    }
})

const close = document.querySelector("#modalClose");
close.addEventListener("click", (e) => {
    dialog.close();
    e.preventDefault();
})
