import './form.css';
import {
    createElement,
    createTextElement,
    createInput,
    createButton,
} from '../element/element';

export const openCreateTodo = () => {
    console.log('create new todo')
    openContainer('todo');
}

export const openCreateProject = () => {
    console.log('create new project');
    openContainer('project');
}

let data = {};
let checklistDiv = null;

const updateForm = (key, value) => {
    data[key] = value;
    console.log(data);
}

const addChecklistItem = (value) => {
    let isADuplicate = false;
    if (data.checklist) { 
        data.checklist.forEach(item => {
            if (item.description === value) 
                isADuplicate = true;
                return;
        })
        if (!isADuplicate) {
            updateForm('checklist', [...data.checklist, {
                done: false,
                description: value
            }])
        }
    } else {
        updateForm('checklist', [{
            done: false,
            description: value
        }])
    }
    if (!checklistDiv) return;
    if (isADuplicate) return;
    createTextElement(
        'p',
        'checklistItem',
        checklistDiv,
        value,
        {},
        (event) => toggleChecklistItem(event)
    )

}

const toggleChecklistItem = event => {
    console.log(event.target.innerText);
    for (let i = 0; i < data.checklist.length; i++) {
        if (data.checklist[i].description === event.target.innerText) {
            data.checklist[i].done = !data.checklist[i].done;
            data.checklist[i].done ?
                event.target.classList.add('checklistItemDone')
                :
                event.target.classList.remove('checklistItemDone')
        }
    }
    console.log(event);
    console.log(data);
}

const openContainer = (type) => {
    const container = createElement(
        'div',
        'newContainer',
        document.querySelector('body')
    );
    createTextElement(
        'p',
        'newContainerTitle',
        container,
        type === 'todo' ?
            'New Todo'
            :
            'New Project'
    );
    if (type === 'todo') addTodoForm(container);
    else addProjectForm(container);
}

const createTodo = () => {
    console.log(data);
}

const addTodoForm = (parent) => {
    createInput(
        'text',
        parent,
        'Description',
        text => updateForm('description', text)
    );
    createInput(
        'datetime-local',
        parent,
        'Due Date/Time (leave blank if none)',
        dueDate => updateForm('due', dueDate)
    );
    const radioDiv = createElement('div', 'radioDiv', parent);
    const radioDivTitle = createTextElement(
        'p',
        'radioTitle',
        radioDiv,
        'Priority'
    )
    const radioSelections = createElement('div', 'radioSelections', parent);
    createInput(
        'radio',
        radioSelections,
        'Low',
        () => updateForm('priority', 0),
        'priority'
    )
    createInput(
        'radio',
        radioSelections,
        'Medium',
        () => updateForm('priority', 1),
        'priority'
    )
    createInput(
        'radio',
        radioSelections,
        'High',
        () => updateForm('priority', 2),
        'priority'
    )
    createInput(
        'text',
        parent,
        'Notes',
        text => updateForm('notes', text)
    )
    checklistDiv = createElement('div', ['checklistDiv'], parent);
    createTextElement(
        'p',
        'checklistTitle',
        checklistDiv,
        'Checklist',
    );
    createTextElement(
        'p',
        'checklistsubTitle',
        checklistDiv,
        'click/tap to mark done',
    );
    const [checklistInput, checklistInputDiv] = createInput(
        'text',
        parent,
        'Add new checklist item',
        () => { }
    )
    createButton(
        checklistInputDiv,
        'Add Item',
        () => addChecklistItem(checklistInput.value)
    )
    createButton(
        parent,
        'Create Todo',
        () => createTodo()
    )
}

const addProjectForm = (parent) => {

}
