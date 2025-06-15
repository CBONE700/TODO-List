import "./styles.css";
import { todoItem } from "./new-todo";
import { de } from "date-fns/locale";

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
    for (let [index, item] of arr.entries()) {
        //put into if statement to check if exists by id
        if (!document.querySelector(`[data-id="${item.id}"]`)){
            const outerDiv = document.createElement("div");
            outerDiv.className = "todoItem";
            outerDiv.setAttribute('data-id', item.id);
        
            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.className = "completed";

            const title = document.createElement("div");
            title.textContent = `${item.title}`;
            title.className = "title";

            const detailButton = document.createElement("button");
            detailButton.textContent = "Details";
            detailButton.className = "detailButton";

            const dueDate = document.createElement("div");
            dueDate.textContent = `${String(item.due.getDate()).padStart(2, 0)}-${String(item.due.getMonth() + 1).padStart(2, 0)}-${item.due.getFullYear()}`
            dueDate.className = "due";

            //Create dialog that contains extra information
            const descDialog = document.createElement("dialog");

            const dialogTitle = document.createElement("h1");
            dialogTitle.textContent = `${item.title}`;

            const priority = document.createElement("div");
            priority.textContent = `${item.prio}`;

            const dialogDueDate = document.createElement("div");
            dialogDueDate.textContent = `${String(item.due.getDate()).padStart(2, 0)}-${String(item.due.getMonth() + 1).padStart(2, 0)}-${item.due.getFullYear()}`;

            const description = document.createElement("div");
            description.textContent = `${item.desc}`;

            descDialog.append(dialogTitle, priority, dialogDueDate, description);
            outerDiv.append(checkbox, title, detailButton, dueDate, descDialog);
            todoList.insertBefore(outerDiv, document.querySelectorAll(".todoItem")[index]);

            //Add event listener to the button to open the description modal
            detailButton.addEventListener("click", () => {
                descDialog.showModal();
            })
        }
    }
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