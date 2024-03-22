/* 
functions: 
for validating data from the UI (throw errors if invalid, UI will handle it
inside try/catch blocks) 

encapsulating business logic
*/
import Storage from './Storage';
import { todoInterface } from './constants';

class Todo {
    // console.log('starting todo');
    constructor() {
        this.storage = new Storage('localStorage');
        if (!this.storage.readAll()) {
            this.storage.initialize();
        }
        this.getAll();
    }


    printProjects = () => {
        console.log(this.projects);
    }

    setTodo = (incomingTodo) => {
        for (const key in todoInterface) { // TODO: add check for checklist
            if (!incomingTodo.hasOwnProperty(key) ||
                !typeof incomingTodo[key] === todoInterface[key]) {
                throw new Error('Todo does not match format');
            }
        }
        const project = this.projects.find(project => project.id === incomingTodo.projectId);
        let todoFound = false;
        project.todos.forEach(todo => {
            if (todo.id === incomingTodo.id) {
                todo === incomingTodo;
                todoFound = true;
                return;
            }
        });
        if (!todoFound) project.todos.push(incomingTodo);
        storage.setTodo(incomingTodo);
    }

    createProject = (name) => {
        const project = {
            name,
            id: Date.now(),
            todos: [],
        }
        this.storage.setProject(project);
    }

    getAll = () => {
        this.projects = this.storage.readAll();
    }

    getProject = (projectId) => {
        return this.projects.find(project => project.id === projectId);
    }

    getTodo(id, projectId) {
        const project = this.projects.find(project => project.id === projectId);
        return project.todos.find(todo => todo.id === id);
    }

    updateTodo = (id, projectId, property, value) => {
        let todo = getTodo(id, projectId);
        todo[property] = value;
        try {
            setTodo(todo)
        } catch (exception) {
            throw exception;
        }
    }

    deleteTodo = (incomingTodo) => {
        const project = this.projects.find(project => project.id === incomingTodo.projectId);
        let indexToRemove = -1;
        project.todos.forEach((todo, index) => {
            if (todo.id === incomingTodo.id) {
                todo === incomingTodo;
                indexToRemove = index;
                return
            }
        });
        if (indexToRemove >= 0) {
            project.todos = project.todos.splice(indexToRemove, 1);
            this.storage.setProject(project);
        }
    }

    deleteProject = (incomingProject) => {
        let indexToRemove = -1;
        this.projects.forEach((project, index) => {
            if (project.id === incomingProject.id) {
                indexToRemove = index;
                return;
            }
        });
        if (indexToRemove === -1) return;
        this.projects.splice(indexToRemove, 1);
        this.storage.deleteProject(incomingProject, indexToRemove);
    }

}

const todo = new Todo();

export default todo;
