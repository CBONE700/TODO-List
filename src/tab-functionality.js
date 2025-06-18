import { createTodoFromForm, insertTodoSorted } from "./todo-functionality";
import { insertProject, displayProjects, getprojectTodo } from "./project-functionality";

const projectList = [];

function todoForm (type) {
    const form = document.querySelector("#addTodoForm");

    const submitBtn = document.createElement("button");
    const closeBtn = document.createElement("button");

    if (type == "todo") {
        form.textContent='';
        const titleAdd = document.createElement("label");
        titleAdd.setAttribute("for", "titleAdd");
        const titleDiv = document.createElement("div");
        titleDiv.textContent = "Title:"
        const titleInput = document.createElement("input");
        titleInput.setAttribute("type", "text");
        titleInput.setAttribute("id", "titleAdd");
        titleInput.setAttribute("name", "todoTitle");
        titleInput.required = true;

        titleAdd.append(titleDiv, titleInput);
        
        const descAdd = document.createElement("label");
        descAdd.setAttribute("for", "descAdd");
        const descDiv = document.createElement("div");
        descDiv.textContent = "Description:"
        const descInput = document.createElement("textarea");
        descInput.setAttribute("id", "descAdd");
        descInput.setAttribute("name", "todoDescription");
        descInput.setAttribute("rows", "4");
        descInput.setAttribute("cols", "40");
        
        descAdd.append(descDiv, descInput);

        const dueDateAdd = document.createElement("label");
        dueDateAdd.setAttribute("for", "dueDateAdd");
        const dueDiv = document.createElement("div");
        dueDiv.textContent = "Due Date:"
        const dueInput = document.createElement("input");
        dueInput.setAttribute("type", "date");
        dueInput.setAttribute("id", "dueDateAdd");
        dueInput.setAttribute("name", "todoDueDate");
        dueInput.required = true;

        dueDateAdd.append(dueDiv, dueInput);

        const priorityAdd = document.createElement("fieldset");
        const legend = document.createElement("legend");
        legend.textContent = "Priority";

        const urgentAdd = document.createElement("label");
        urgentAdd.setAttribute("for", "UrgentAdd");
        const urgentDiv = document.createElement("div");
        urgentDiv.textContent = "Urgent";
        const urgentInput = document.createElement("input");
        urgentInput.setAttribute("type", "radio");
        urgentInput.setAttribute("id", "UrgentAdd");
        urgentInput.setAttribute("name", "todoPriorityAdd");
        urgentInput.setAttribute("value", "Urgent");
        urgentInput.checked = true;

        urgentAdd.append(urgentDiv, urgentInput);

        const highAdd = document.createElement("label");
        highAdd.setAttribute("for", "HighAdd");
        const highDiv = document.createElement("div");
        highDiv.textContent = "High";
        const highInput = document.createElement("input");
        highInput.setAttribute("type", "radio");
        highInput.setAttribute("id", "HighAdd");
        highInput.setAttribute("name", "todoPriorityAdd");
        highInput.setAttribute("value", "High");

        highAdd.append(highDiv, highInput);

        const mediumAdd = document.createElement("label");
        mediumAdd.setAttribute("for", "MediumAdd");
        const mediumDiv = document.createElement("div");
        mediumDiv.textContent = "Medium";
        const mediumInput = document.createElement("input");
        mediumInput.setAttribute("type", "radio");
        mediumInput.setAttribute("id", "MediumAdd");
        mediumInput.setAttribute("name", "todoPriorityAdd");
        mediumInput.setAttribute("value", "Medium");

        mediumAdd.append(mediumDiv, mediumInput);

        const lowAdd = document.createElement("label");
        lowAdd.setAttribute("for", "LowAdd");
        const lowDiv = document.createElement("div");
        lowDiv.textContent = "Low";
        const lowInput = document.createElement("input");
        lowInput.setAttribute("type", "radio");
        lowInput.setAttribute("id", "LowAdd");
        lowInput.setAttribute("name", "todoPriorityAdd");
        lowInput.setAttribute("value", "Low");

        lowAdd.append(lowDiv, lowInput);

        priorityAdd.append(legend, urgentAdd, highAdd, mediumAdd, lowAdd);

        const projectAdd = document.createElement("label");
        projectAdd.setAttribute("for", "projectAdd");
        const projectDiv = document.createElement("div");
        projectDiv.textContent = "Project:";
        const projectSelect = document.createElement("select");
        projectSelect.setAttribute("id", "projectAdd");
        projectSelect.setAttribute("name", "projects");
        const initial = document.createElement("option");
        initial.value = "";
        initial.selected = true;
        initial.textContent = "None";
        projectSelect.append(initial);
        for (let project of projectList) {
            let projectOption = document.createElement("option");
            projectOption.setAttribute("value", `${project}`);
            projectOption.textContent = `${project}`;
            projectSelect.append(projectOption);
        }
        projectAdd.append(projectDiv, projectSelect);

        const btns = document.createElement("div");

        submitBtn.autofocus = true;
        submitBtn.setAttribute("type", "submit");
        submitBtn.setAttribute("id", "submitButtonAdd");
        submitBtn.textContent = "Add";

        closeBtn.autofocus = true;
        closeBtn.setAttribute("id", "modalCloseAdd");
        closeBtn.textContent = "Close";

        btns.append(submitBtn, closeBtn);

        submitBtn.addEventListener("click", (e) => {
            if (!form.checkValidity()) {
                alert("Please fill out all required fields.");
            }
            else {
                insertTodoSorted(createTodoFromForm("add"));
                getprojectTodo();
                document.querySelector("#addTodoDialog").close();
            }
            e.preventDefault();
        })


        form.append(titleAdd, descAdd, dueDateAdd, priorityAdd, projectAdd, btns);
    }
    else if (type == "project") {
        form.textContent='';
        const titleProj = document.createElement("label");
        titleProj.setAttribute("for", "titleProj");
        const titleDiv = document.createElement("div");
        titleDiv.textContent = "Title:"
        const titleInput = document.createElement("input");
        titleInput.setAttribute("type", "text");
        titleInput.setAttribute("id", "titleProj");
        titleInput.setAttribute("name", "projectTitle");
        titleInput.required = true;

        titleProj.append(titleDiv, titleInput);

        const btns = document.createElement("div");

        submitBtn.autofocus = true;
        submitBtn.setAttribute("type", "submit");
        submitBtn.setAttribute("id", "submitButtonAdd");
        submitBtn.textContent = "Add";

        closeBtn.autofocus = true;
        closeBtn.setAttribute("id", "modalCloseAdd");
        closeBtn.textContent = "Close";

        btns.append(submitBtn, closeBtn);

        submitBtn.addEventListener("click", (e) => {
            if (!form.checkValidity()) {
                alert("Please fill out all required fields.");
            }
            else {
                insertProject(projectList);
                displayProjects(projectList);
                document.querySelector("#addTodoDialog").close();
            }
            e.preventDefault();
        })

        form.append(titleProj, btns);
    }

    closeBtn.addEventListener("click", (e) => {
        document.querySelector("#addTodoForm").reset();
        document.querySelector("#addTodoDialog").close();
        e.preventDefault();
    })
}

export { todoForm };