const Priority  = Object.freeze({
  low: 0,
  medium: 1,
  high: 2
});
const epochtime = Date.now();
export const seedData = {
    projects: [
        {
            name: 'default',
            id: epochtime,
            todos: [
                {
                    projectId: epochtime,
                    id: epochtime + 1,
                    description: 'Mow lawn',
                    dueDate: null,
                    priority: 1,
                    notes: '',
                    checklist: [],
                },
                {
                    projectId: epochtime,
                    id: epochtime + 2,
                    description: 'Bake Cake',
                    dueDate: null,
                    priority: 1,
                    notes: '',
                    checklist: [],
                },
                {
                    projectId: epochtime,
                    id: epochtime + 3,
                    description: 'Play that game',
                    dueDate: null,
                    priority: 1,
                    notes: '',
                    checklist: [],
                },
                {
                    projectId: epochtime,
                    id: epochtime + 4,
                    description: 'Read the book',
                    dueDate: null,
                    priority: 1,
                    notes: '',
                    checklist: [],
                },
                {
                    projectId: epochtime,
                    id: epochtime + 5,
                    description: 'Go to work',
                    dueDate: null,
                    priority: 1,
                    notes: '',
                    checklist: [],
                },
                {
                    projectId: epochtime,
                    id: epochtime + 6,
                    description: 'Go to sleep',
                    dueDate: null,
                    priority: 1,
                    notes: '',
                    checklist: [],
                },
            ]
        }
    ]
}

export const todoInterface = {
    id: 'number',
    description: 'string',
    dueDate: 'number',
    priority: 'number',
    notes: 'string',
    checklist: 'object', // TODO: checklist check
};

export const defaultChecklistItem = {
    done: false,
    description: '',
}

export const defaultProject = {
    id: -1,
    name: 'default',
    todos: [],
}
