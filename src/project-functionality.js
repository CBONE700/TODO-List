import { todoUpdate } from "./todo-functionality";
import { saveHomeList, saveProjects, homeList, projectList } from "./storage-functionality";

let prevClicked = "Home";
const todoItems = document.querySelector("#todoItems");

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
    saveProjects();

}

function displayProjects(projects) {
    const projectHeader = document.querySelector("#Projects");
    projectHeader.textContent = "";
    const heading = document.createElement("div");
    heading.textContent = "Projects";
    projectHeader.append(heading);
    for (let project of projects) {
        if (!document.querySelector(`#${project.replace(/\s/g, "")}`)){
            let projectDiv = document.createElement("div");
            projectDiv.setAttribute("id", `${project.replace(/\s/g, "")}`)

            let projectBtn = document.createElement("button");
            projectBtn.textContent = `${project}`;
            projectBtn.setAttribute("id", `${project.replace(/\s/g, "")}`);
            projectBtn.addEventListener("click", () => {
                prevClicked = `${project}`;
                getprojectTodo();
            })
            projectBtn.addEventListener("mouseover", () => {
                projectBtn.style.color = "#D90166";
            })
            projectBtn.addEventListener("mouseout", () => {
                projectBtn.style.removeProperty("color");
            })

            let projectDel = document.createElement("button");
            projectDel.textContent = "Del";
            projectDel.addEventListener("click", () => {
                for (let i = 0; i < projectList.length; i++) {
                    if (projectList[i] == project) {
                        projectList.splice(i, 1);
                    }
                }
                for (let i = 0; i < homeList.length; i++) {
                    if (homeList[i].project == project) {
                        const todoItem = todoItems.querySelector(`[data-id="${homeList[i].id}"]`);
                        todoItem.remove();
                        homeList.splice(i, 1);
                    }
                }
                prevClicked = "Home";
                getprojectTodo();
                displayProjects(projectList);
                saveHomeList();
                saveProjects();
            })

            projectDiv.append(projectBtn, projectDel)
            projectHeader.append(projectDiv);
        }
    }
}

function getprojectTodo() {
    if (prevClicked == "Home") {
        todoUpdate(todoItems, homeList);
    }
    else {
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