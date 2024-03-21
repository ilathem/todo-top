// for handling data transformation from js object to json and back agqain,
// and for communicating with storage implementations (local storage for now)
// Uses the facade pattern

class LocalStorage {
    constructor() {
        // console.log('Creating new local storage object');
        this.name = 'LocalStorage';
    }

    readAll() {
        // console.log('running readAll');
        const projects = window.localStorage.getItem('projects');
        if (projects) {
            return JSON.parse(projects);
        } else {
            // console.log('no prior data, initializing');
            this.#initialize();
            return [];
        }
    }

    #initialize() {
        const projects = [
            {
                name: 'default',
                todos: [],
                id: Date.now(),
            }
        ];
        window.localStorage.setItem('projects', JSON.stringify(projects));
    }

    setTodo(projectId, todoId, incomingTodo) {
        const projects = JSON.parse(window.localStorage.getItem('projects'))
        for (const project of projects) {
            if (project.id === projectId) {
                for (let i = 0; i < project.todos.length; i++) {
                    let todo = project.todos[i];
                    if (todo.id === todoId) {
                        todo = incomingTodo; 
                        // console.log('todo edited in localstorage');
                        return true;
                    }
                }
                project.todos.push(incomingTodo);
                // console.log('todo added in localstorage');
                return true;
            }
        }
        return false;
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

    readAllProm = () => {
        var mediums = this.#storageMediums;
        return new Promise((res, rej) => {
            const containerOutput = [];
            for (const container of mediums) {
                containerOutput.push(container.readAll());
            }
            const first = containerOutput[0];
            for (let i = 1; i < containerOutput.length; i++) {
                if (containerOutput[i] != first) {
                    console.error('all data sources are not equal!');
                }
            }
            res(first);
        });
    }

    setTodo(projectId, todoId, incomingTodo) {
        console.log('running set todo in storage');
        const containerOutput = [];
        for (const container of this.#storageMediums) {
            containerOutput.push({
                container: container.name, 
                results: container.setTodo(projectId, todoId, incomingTodo)
            });
        }
        for (let i = 1; i < containerOutput.length; i++) {
            if (containerOutput[i] != first) {
                console.error('all data sources are not equal!');
            }
        }
        return containerOutput;
    }

}

export default Storage;
