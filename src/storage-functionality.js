import { todoItem } from "./todo-class";

let homeList = [];
let projectList = [];

function saveHomeList() {
    localStorage.setItem("todoList", JSON.stringify(homeList));
}

function loadHomeList() {
    const data = localStorage.getItem("todoList");
    if (data) {
        const parsed = JSON.parse(data);
        homeList = parsed.map(item => new todoItem(
            item.title,
            item.desc,
            new Date(item.due),
            item.prio,
            item.checklist,
            item.project
        ));
    }
}

function saveProjects() {   
    localStorage.setItem("projectList", JSON.stringify(projectList));
}

function loadProjects() {
    const data = localStorage.getItem("projectList");
    if (data) {
        const parsed = JSON.parse(data);
        projectList = parsed;
    }
}

export { saveHomeList, loadHomeList, homeList, saveProjects, loadProjects, projectList };