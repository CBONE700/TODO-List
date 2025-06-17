import "./styles.css";
import { todoItem } from "./new-todo";
import editImage from "./images/editing.png";
import delImage from "./images/trash.png";
import detailImage from "./images/details.png";

//Array for storage
let todoList = [];

let tmp = new todoItem("Callums Thing", "asdasdsa", new Date("2025-06-02"), "High", false);
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
    document.querySelector("#addTodoForm").reset();
    dialog.querySelector("#submitButton").textContent = "Add";
    dialog.close();
    e.preventDefault();
})

//Create new todo object
function createTodoFromForm() {
    let btn = dialog.querySelector("#submitButton");
    if (btn.textContent == "Update"){
        for (let [index, item] of todoList.entries()) {
            if (item.id == btn.getAttribute("data-id")) {
                document.querySelector(`[data-id="${item.id}"]`).remove();
                todoList.splice(index, 1);
            }
        }
    }

    const title = document.querySelector("#title").value;
    const desc = document.querySelector("#desc").value;
    const due = new Date(document.querySelector("#dueDate").value);
    const priority = document.querySelector('input[name="todoPriority"]:checked').value;
    document.querySelector("#addTodoForm").reset();
    dialog.querySelector("#submitButton").textContent = "Add";

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

//Update the dom
function todoUpdate(todoList, arr){
    for (let [index, item] of arr.entries()) {
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
            detailButton.className = "detailButton";
            const detailImg = document.createElement("img");
            detailImg.src = detailImage;
            detailButton.appendChild(detailImg);

            const dueDate = document.createElement("div");
            dueDate.textContent = `${String(item.due.getDate()).padStart(2, 0)}-${String(item.due.getMonth() + 1).padStart(2, 0)}-${item.due.getFullYear()}`
            dueDate.className = "due";

            const edit = document.createElement("button");
            edit.className = "editBtn";
            const editImg = document.createElement("img");
            editImg.src = editImage;
            edit.appendChild(editImg);

            const trash = document.createElement("button");
            trash.className = "delBtn";
            const delImg = document.createElement("img");
            delImg.src = delImage;
            trash.appendChild(delImg);

            //Create dialog that contains extra information
            const descDialog = document.createElement("dialog");
            descDialog.className = "descDialog";

            const descDiv = document.createElement("div");

            const dialogTitle = document.createElement("h1");
            dialogTitle.textContent = `${item.title}`;

            const priority = document.createElement("div");
            priority.textContent = `Priority: ${item.prio}`;

            const dialogDueDate = document.createElement("div");
            dialogDueDate.textContent = `Due Date: ${String(item.due.getDate()).padStart(2, 0)}-${String(item.due.getMonth() + 1).padStart(2, 0)}-${item.due.getFullYear()}`;

            const description = document.createElement("div");
            description.textContent = `Description: ${item.desc}`;

            const closeModal = document.createElement("button")
            closeModal.textContent = "Close";

            descDiv.append(dialogTitle, priority, dialogDueDate, description, closeModal);
            descDialog.appendChild(descDiv);

            //Create dialog that edits 
            edit.addEventListener("click", () => {
                const btn = dialog.querySelector("#submitButton");
                btn.textContent = "Update";
                btn.setAttribute('data-id', item.id);
                dialog.querySelector("#title").value = item.title;
                dialog.querySelector("#desc").value = item.desc;
                dialog.querySelector("#dueDate").value = item.due.toISOString().slice(0, 10);
                dialog.querySelector(`#${item.prio}`).checked = true;
                dialog.showModal();
            })

            trash.addEventListener("click", () => {
                outerDiv.remove();
                arr.splice(index, 1);
            })
            
            outerDiv.append(checkbox, title, detailButton, dueDate, descDialog, edit, trash);
            todoList.insertBefore(outerDiv, todoList.childNodes[index]);

            //Add event listener to the button to open and close the description modal
            detailButton.addEventListener("click", () => {
                descDialog.showModal();
            })
            
            closeModal.addEventListener("click", () => {
                descDialog.close();
            })
        }
    }
}