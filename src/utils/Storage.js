// for handling data transformation from js object to json and back agqain,
// and for communicating with storage implementations (local storage for now)
// Uses the facade pattern

class LocalStorage {
    constructor() {
        console.log('Creating new local storage object');
    }

    readAll() {
        const projects = window.localStorage.getItem('projects');
        if (projects) {
            return JSON.parse(projects);
        } else {
            console.log('no prior data, initializing');
            this.#initialize();
            return [];
        }
    }

    #initialize() {
        window.localStorage.setItem('projects', []);
    }
}

class Storage {
    #storageMediums = [];
    constructor(...buckets) {
        console.log('creating new storage object');
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
            containerOutput.push(container.getAll());
        }
        const first = containerOutput[0];
        for (let i = 1; i < containerOutput.length; i++) {
            if (containerOutput[i] != first) {
                console.error('all data sources are not equal!');
            }
        }
        return first;
    }
}

export default Storage;
