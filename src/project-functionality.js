import { homeList, todoUpdate } from "./todo-functionality";

let prevClicked = "Home";

const home = document.querySelector("#Home");
home.addEventListener("click", () => {
    prevClicked = "Home";
    getprojectTodo();
})

function insertProject(projectList) {
    const project = document.querySelector("#titleProj");
    projectList.push(project.value);
}

function displayProjects(projectList) {
    const projectHeader = document.querySelector("#Projects");
    for (let project of projectList) {
        if (!document.querySelector(`#${project.replace(/\s/g, "")}`)){
            let projectDiv = document.createElement("div");
            projectDiv.textContent = `${project}`;
            projectDiv.setAttribute("id", `${project.replace(/\s/g, "")}`);
            projectDiv.addEventListener("click", () => {
                prevClicked = `${project}`;
                getprojectTodo();
            })
            projectHeader.append(projectDiv);
        }
    }
}

function getprojectTodo() {
    if (prevClicked == "Home") {
        todoUpdate(todoItems, homeList);
    }
    else {
        const todoItems = document.querySelector("#todoItems");
        todoItems.textContent = '';
        let projArr = []
        for (let item of homeList) {
            if (item.project == prevClicked) {
                projArr.push(item);
            }
        }    
        todoUpdate(todoItems, projArr);
    }
}

export { insertProject, displayProjects, getprojectTodo, prevClicked };