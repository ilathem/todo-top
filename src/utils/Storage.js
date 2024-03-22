import { seedData } from './constants.js';
// for handling data transformation from js object to json and back agqain,
// and for communicating with storage implementations (local storage for now)
// Uses the facade pattern

class LocalStorage {
    constructor() {
        // console.log('Creating new local storage object');
        this.name = 'LocalStorage';
    }

    readAll() {
        const projects = window.localStorage.getItem('projects');
        if (projects) {
            return JSON.parse(projects);
        } else {
            return null;
        }
    }

    initialize() {
        console.log('Initializing from LocalStorage');
        window.localStorage.setItem('projects', JSON.stringify(seedData));
    }

    setTodo(incomingTodo) {
        const projects = JSON.parse(window.localStorage.getItem('projects'))
        let saved = false;
        for (const project of projects) {
            if (project.id === incomingTodo.projectId) {
                for (let i = 0; i < project.todos.length; i++) {
                    let todo = project.todos[i];
                    if (todo.id === incomingTodo.id) {
                        todo = incomingTodo; 
                        saved = true;
                        break;
                    }
                }
                if (!saved) {
                    project.todos.push(incomingTodo);
                    saved = true;
                }
            }
        }
        if (saved) {
            window.localStorage.setItem('projects', JSON.stringify(projects));
        }
        return false;
    }

    setProject(incomingProject) {
        const projects = JSON.parse(window.localStorage.getItem('projects'));
        let saved = false;
        console.log(projects);
        for (const project of projects) {
            if (project.id === incomingProject.id) {
                project = incomingProject;
                saved = true;
            }
        }
        if (!saved) {
            projects.push(incomingProject);
            saved = true;
        }
        if (saved) {
            window.localStorage.setItem('projects', JSON.stringify(projects));
        }
    }

}

class Storage {
    #storageMediums = [];
    constructor(...buckets) {
        // console.log('creating new storage object');
        this.#initializeStorageMediums(buckets);
    }

    #initializeStorageMediums(buckets) {
        for (const bucket of buckets) {
            if (bucket === 'localStorage') {
                this.#storageMediums.push(new LocalStorage());
            }
        }
    }

    readAll() {
        const containerOutput = [];
        for (const container of this.#storageMediums) {
            containerOutput.push(container.readAll());
        }
        const first = containerOutput[0];
        for (let i = 1; i < containerOutput.length; i++) {
            if (containerOutput[i] != first) {
                console.error('all data sources are not equal!');
            }
        }
        return first;
    }

    initialize() {
        console.log('Initializing from Storage');
        console.log(this.#storageMediums);
        for (const container of this.#storageMediums) {
            container.initialize();
        }
    }

    setTodo(incomingTodo) {
        console.log('running set todo in storage');
        const containerOutput = [];
        for (const container of this.#storageMediums) {
            containerOutput.push({
                container: container.name, 
                results: container.setTodo(incomingTodo)
            });
        }
        for (let i = 1; i < containerOutput.length; i++) {
            if (containerOutput[i] != first) {
                console.error('all data sources are not equal!');
            }
        }
        return containerOutput;
    }

    setProject(project) {
        for (const container of this.#storageMediums) {
            container.setProject(project);
        }
    }


}

export default Storage;
