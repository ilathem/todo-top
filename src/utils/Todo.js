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
    // console.log('starting todo');
    const storage = new Storage('localStorage');
    let projects = [];

    const defaultTodo = {
        id: -1,
        description: '',
        dueDate: null,
        priority: Priority.medium,
        notes: '',
        checklist: [],
    };

    const defaultChecklistItem = {
        done: false,
        description: '',
    }

    const defaultProject = {
        id: -1,
        name: 'default',
        todos: [],
    }

    const printProjects = () => {
        console.log(projects);
    }

    const createTodo = (projectId, todoId, incomingTodo) => {
        // create new todo
        // console.log('creating new todo');
        // console.log(incomingTodo)
        for (const project of projects) {
            if (project.id === projectId) {
                // console.log('project todos:');
                // console.log(project.todos);
                for (let i = 0; i < project.todos.length; i++) {
                    // console.log(project.todos[i]);
                }
                project.todos.push(incomingTodo);
                // console.log('todo added in memory');
                return true;
            }
        }
        // console.log(storage);
        // console.log(storage.setTodo(projectId, todoId, incomingTodo))
    }

    const createProject = (name) => {
        // create project 
    }

    const getAll = async () => {
        projects = await storage.readAllProm();
        console.log(projects);
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

    const addSeedData = () => {
        console.log('adding seed data');
        console.log(this.projects);
        // console.log('adding seed data');
        let exampleTodos = new Array(6);
        const exampleDescriptions = [
            'Mow lawn',
            'Bake cake',
            'Play that game',
            'Read the book',
            'Go to work',
            'Go to sleep'
        ];
        console.log(this.projects[0]);
        for (let i = 0; i < exampleTodos.length; i++) {
            exampleTodos[i] = structuredClone(defaultTodo);
            exampleTodos[i].description = exampleDescriptions[i];
            exampleTodos[i].id = Date.now() + i;
            createTodo(this.projects[0].id, exampleTodos[i].id, exampleTodos[i]);
        }
        console.log(this.projects[0]);
    }

    return {
        createTodo,
        createProject,
        getAll,
        getTodo,
        getProject,
        updateTodo,
        deleteTodo,
        addSeedData,
        printProjects,
    }
}
