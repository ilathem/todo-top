// for handling data transformation from js object to json and back agqain,
// and for communicating with storage implementations (local storage for now)
// Uses the facade pattern

class LocalStorage {
    constructor() {
        console.log('Creating new local storage object');
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

    
}

export default Storage;
