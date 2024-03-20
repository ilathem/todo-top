/* 
functions: 
for validating data from the UI (throw errors if invalid, UI will handle it
inside try/catch blocks) 

storing and maintaining application state

encapsulating business logic
*/
import Storage from './Storage';

const Priority  = Object.freeze({
  low: 0,
  medium: 1,
  high: 2
});

export default function Todo() {
    console.log('starting todo');
    const storage = new Storage('localStorage');

    const defaultTodo = {
        id: -1,
        projectId: 0,
        desciption: '',
        dueDate: null,
        priority: Priority.medium,
        notes: '',
        checklist: [],
    };

    const defaultChecklistItem = {
        done: false,
        desciption: '',
    }

    const defaultProject = {
        id: 0,
        name: 'default',
    }

    const createTodo = (properties, projectId = 0) => {
        // create new todo
    }

    const createProject = (name) => {
        // create project 
    }

    const getAll = () => {
        // get all todos and projects
        console.log('getting all todos');
    }

    const getTodo = (todoId) => {
        // get one todo
    }

    const getProject = (projectId) => {
        // get all todos from project

        // return todos and project data
    }

    const updateTodo = (id, property) => {
        // update a todo or project property
    }

    const deleteTodo = (id) => {
        // delete todo or project
    }

    return {
        createTodo,
        createProject,
        getAll,
        getTodo,
        getProject,
        updateTodo,
        deleteTodo,
    }
}
