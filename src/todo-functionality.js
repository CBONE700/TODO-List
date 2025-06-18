import editImage from "./images/editing.png";
import delImage from "./images/trash.png";
import detailImage from "./images/details.png";
import { todoItem } from "./todo-class";

let homeList = [];

//Create new todo object
function createTodoFromForm(type) {
    let title, desc ,due, priority, project;
    if (type == "add") {
        title = document.querySelector("#titleAdd").value;
        desc = document.querySelector("#descAdd").value;
        due = new Date(document.querySelector("#dueDateAdd").value);
        priority = document.querySelector('input[name="todoPriorityAdd"]:checked').value;
        project = document.querySelector("#projectAdd").options[document.querySelector("#projectAdd").selectedIndex].value;
        document.querySelector("#addTodoForm").reset();
    }
    else if (type == "edit") {
        title = document.querySelector("#titleEdit").value;
        desc = document.querySelector("#descEdit").value;
        due = new Date(document.querySelector("#dueDateEdit").value);
        priority = document.querySelector('input[name="todoPriorityEdit"]:checked').value;
        document.querySelector("#editTodoForm").reset();
        document.querySelector(`[data-id="${document.querySelector("#submitButtonEdit").getAttribute('data-id')}"]`).remove();
        for (let i = 0; i < homeList.length; i++) {
            if (homeList[i].id == document.querySelector("#submitButtonEdit").getAttribute('data-id')) {
                project = homeList[i].project;
                homeList.splice(i, 1);
                break;
            }
        }
    }

    return new todoItem(title, desc, due, priority, false, project);
}

//Insert sorted by date
function insertTodoSorted(todo) {
    for (let i = 0; i < homeList.length; i++) {
        if (homeList[i].due >= todo.due) {
            homeList.splice(i, 0, todo);
            return;
        }
    }
    homeList.push(todo);
}

//Update the dom
function todoUpdate(todoItems, arr){
    for (let [index, item] of arr.entries()) {
        if (!todoItems.querySelector(`[data-id="${item.id}"]`)){
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

            //Create dialog that edit
            edit.addEventListener("click", () => {
                document.querySelector("#titleEdit").value = item.title;
                document.querySelector("#descEdit").value = item.desc;
                document.querySelector("#dueDateEdit").value = item.due.toISOString().slice(0, 10);
                document.querySelector(`#${item.prio}Edit`).checked = true;
                document.querySelector("#submitButtonEdit").setAttribute('data-id', item.id);
                document.querySelector("#editTodoDialog").showModal();
            })

            trash.addEventListener("click", () => {
                outerDiv.remove();
                homeList.splice(index, 1);
            })
            
            outerDiv.append(checkbox, title, detailButton, dueDate, descDialog, edit, trash);
            todoItems.insertBefore(outerDiv, todoItems.childNodes[index]);

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

export { createTodoFromForm, insertTodoSorted, todoUpdate, homeList };