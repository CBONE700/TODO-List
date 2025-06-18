import "./styles.css";
import { createTodoFromForm, insertTodoSorted } from "./todo-functionality";
import { todoForm } from "./tab-functionality";
import { getprojectTodo, displayProjects } from "./project-functionality";
import { loadHomeList, loadProjects, projectList } from "./storage-functionality";

document.addEventListener("DOMContentLoaded", () => {
    loadHomeList();
    loadProjects();
    displayProjects(projectList);
    getprojectTodo();
})

//Open dialog to add new todo/project
const newTodo = document.querySelector("#modalOpenAdd");
const dialog = document.querySelector("#addTodoDialog");
newTodo.addEventListener("click", () => {
    todoForm("todo");
    dialog.showModal();
})

//Handle form submissions and update dom

//Edit todo items
const edit = document.querySelector("#submitButtonEdit");
edit.addEventListener("click", (e) => {
    const form = document.querySelector("#editTodoForm")
    if (!form.checkValidity()) {
        alert("Please fill out all required fields.");
    }
    else {
        insertTodoSorted(createTodoFromForm("edit"));
        getprojectTodo();
        document.querySelector("#editTodoDialog").close();
    }
    e.preventDefault();
})

const todoHeading = document.querySelector("#todoHeading");
todoHeading.addEventListener("click", () => {
    todoForm("todo");
})

const projectHeading = document.querySelector("#projectHeading");
projectHeading.addEventListener("click", () => {
    todoForm("project");
})

const btns = document.querySelectorAll("button");
for (let btn of btns) {
    btn.addEventListener("mouseover", () => {
        btn.style.color = "#D90166";
    })
    btn.addEventListener("mouseout", () => {
        btn.style.removeProperty("color");
    })
}