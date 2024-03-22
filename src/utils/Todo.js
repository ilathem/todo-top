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
    }


    printProjects = () => {
        console.log(projects);
    }

    setTodo = (incomingTodo) => {
        for (const key in todoInterface) { // TODO: add check for checklist
            if (!incomingTodo.hasOwnProperty(key) ||
                !typeof incomingTodo[key] === todoInterface[key]) {
                throw new Error('Todo does not match format');
            }
        }
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
        this.projects = storage.readAll();
    }

    getTodo = (todoId) => {
        // get one todo
    }

    getProject = (projectId) => {
        // get all todos from project

        // return todos and project data
    }

    updateTodo = (id, property) => {
        // update a todo or project property
    }

    deleteTodo = (id) => {
        // delete todo or project
    }
}

const todo = new Todo();

export default todo;
