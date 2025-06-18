import { homeList, todoUpdate } from "./todo-functionality";

let prevClicked = "Home";

const home = document.querySelector("#Home");
home.addEventListener("click", () => {
    prevClicked = "Home";
    getprojectTodo();
})

const today = document.querySelector("#Today");
today.addEventListener("click", () => {
    prevClicked = "Today";
    getprojectTodo();
})

const week = document.querySelector("#Week");
week.addEventListener("click", () => {
    prevClicked = "Week";
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
        let projArr = [];
        if (prevClicked == "Today") {
            let todaysDate = new Date();
            for (let item of homeList) {
                if (item.due.setHours(0,0,0,0) == todaysDate.setHours(0,0,0,0)) {
                    projArr.push(item);
                }
            }
        }
        else if (prevClicked == "Week") {
            let todaysDate = new Date();
            todaysDate.setHours(0,0,0,0);
            let oneWeek = new Date (todaysDate);
            oneWeek.setDate(oneWeek.getDate() + 7)
            for (let item of homeList) {
                if (item.due.setHours(0,0,0,0) >= todaysDate && item.due.setHours(0,0,0,0) <= oneWeek) {
                    projArr.push(item);
                }
            }
        }
        else {
            for (let item of homeList) {
                if (item.project == prevClicked) {
                    projArr.push(item);
                }
                }    
        }
        todoUpdate(todoItems, projArr);
    }
}

export { insertProject, displayProjects, getprojectTodo, prevClicked };