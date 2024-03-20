/* 
functions: 
for validating data from the UI (throw errors if invalid, UI will handle it
inside try/catch blocks) 

storing and maintaining application state

encapsulating business logic
*/
import storage from './Storage.js';

const Priority  = Object.freeze({
  low: 0,
  medium: 1,
  high: 2
})

class Todo {
    #defaultTodo = {
        id: -1,
        projectId: 0,
        desciption: '',
        dueDate: null,
        priority: Priority.medium,
        notes: '',
        checklist: [],
    }

    #defaultChecklistItem = {
        done: false,
        desciption: '',
    }

    #defaultProject = {
        id: 0,
        name: 'default',
    }

    constructor() {
        if (instance) {
            throw new Error("only 1 instance of Todo allowed"); // verify this works
        }
        instance = this;
        getAll();
    }

    createTodo(properties, projectId = 0) {
        // create new todo
    }

    createProject(name) {
        // create project 
    }

    getAll() {
        // get all todos and projects
    }

    getTodo(todoId) {
        // get one todo
    }

    getProject(projectId) {
        // get all todos from project

        // return todos and project data
    }

    update(id, property) {
        // update a todo or project property
    }

    delete(id) {
        // delete todo or project
    }
}

let todo = Object.freeze(new Todo());

export default todo;
