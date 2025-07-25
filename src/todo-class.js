import { v4 as uuidv4 } from 'uuid';

class todoItem {
    constructor(title, desc, due, prio, checklist, project) {
        this.title = title;
        this.desc = desc;
        this.due = due;
        this.prio = prio;
        this.checklist = checklist;
        this.project = project;
        this.id = uuidv4();
    }
}

export { todoItem }

