import "./form.css";
import {
  createElement,
  createTextElement,
  createInput,
  createButton,
  createDropdown,
} from "../element/element";
import todo from "../../utils/Todo";
import Projects from "../projects/projects";

export const openExistingTodo = (todo) => {
  data = todo;
  openContainer("existingTodo");
};

export const openCreateTodo = () => {
  openContainer("todo");
};

export const openCreateProject = () => {
  openContainer("project");
};

let data = {};
let checklistDiv = null;

const updateForm = (key, value) => {
  data[key] = value;
};

const addChecklistItem = (value) => {
  let isADuplicate = false;
  if (data.checklist) {
    data.checklist.forEach((item) => {
      if (item.description === value) isADuplicate = true;
      return;
    });
    if (!isADuplicate) {
      updateForm("checklist", [
        ...data.checklist,
        {
          done: false,
          description: value,
        },
      ]);
    }
  } else {
    updateForm("checklist", [
      {
        done: false,
        description: value,
      },
    ]);
  }
  if (!checklistDiv) return;
  if (isADuplicate) return;
  createTextElement("p", "checklistItem", checklistDiv, value, {}, (event) =>
    toggleChecklistItem(event),
  );
};

const toggleChecklistItem = (event) => {
  for (let i = 0; i < data.checklist.length; i++) {
    if (data.checklist[i].description === event.target.innerText) {
      data.checklist[i].done = !data.checklist[i].done;
      data.checklist[i].done
        ? event.target.classList.add("checklistItemDone")
        : event.target.classList.remove("checklistItemDone");
    }
  }
};

const openContainer = (type) => {
  const container = createElement(
    "div",
    "newContainer",
    document.querySelector("body"),
  );
  createTextElement(
    "p",
    "newContainerTitle",
    container,
    type === "todo"
      ? "New Todo"
      : type === "project"
        ? "New Project"
        : type === "existingTodo"
          ? "Existing Todo"
          : "",
  );
  if (type === "todo" || type === "existingTodo") addTodoForm(container);
  else if ((type = "project")) addProjectForm(container);
};

const removeCreateModal = (parent) => {
  parent.remove();
  document.querySelector("main").innerHTML = "";
  Projects();
};

const cancelCreate = (parent) => {
  data = {};
  removeCreateModal(parent);
};

const createProject = (parent) => {
  todo.createProject(data.name);
  removeCreateModal(parent);
};

const createTodo = (parent) => {
  if (!data.id) data.id = Date.now();
  todo.setTodo(data);
  removeCreateModal(parent);
};

const addTodoForm = (parent) => {
  createInput(
    "text",
    parent,
    "Description",
    (text) => updateForm("description", text),
    "description",
    data.description || "",
  );
  const projectName = todo.getProjectNames(data.projectId)[0];
  createDropdown(
    projectName || "Select Project",
    "Project",
    todo.getAllProjectNames(),
    parent,
    {},
    (output) => {
      const projectId = todo.getProjectIds(output)[0];
      updateForm("projectId", projectId);
    },
  );
  createInput(
    "datetime-local",
    parent,
    "Due Date/Time (leave blank if none)",
    (dueDate) => updateForm("dueDate", dueDate),
    "dueDate",
    data.dueDate || "",
  );
  const radioDiv = createElement("div", "radioDiv", parent);
  const radioDivTitle = createTextElement(
    "p",
    "radioTitle",
    radioDiv,
    "Priority",
  );
  const radioSelections = createElement("div", "radioSelections", parent);
  createInput(
    "radio",
    radioSelections,
    "Low",
    () => updateForm("priority", 0),
    "priority",
    "",
    data.priority === 0 ? { checked: "" } : {},
  );
  createInput(
    "radio",
    radioSelections,
    "Medium",
    () => updateForm("priority", 1),
    "priority",
    "",
    data.priority === 1 ? { checked: "" } : {},
  );
  createInput(
    "radio",
    radioSelections,
    "High",
    () => updateForm("priority", 2),
    "priority",
    "",
    data.priority === 2 ? { checked: "" } : {},
  );
  createInput(
    "text",
    parent,
    "Notes",
    (text) => updateForm("notes", text),
    "notes",
    data.notes || "",
  );
  checklistDiv = createElement("div", ["checklistDiv"], parent);
  createTextElement("p", "checklistTitle", checklistDiv, "Checklist");
  createTextElement(
    "p",
    "checklistsubTitle",
    checklistDiv,
    "click/tap to mark done",
  );
  if (data.checklist) {
    for (const checklistItem of data.checklist) {
      createTextElement(
        "p",
        "checklistItem",
        checklistDiv,
        checklistItem.description,
        {},
        (event) => toggleChecklistItem(event),
      );
    }
  }
  const [checklistInput, checklistInputDiv] = createInput(
    "text",
    parent,
    "Add new checklist item",
    () => {},
  );
  createButton(checklistInputDiv, "Add Item", () =>
    addChecklistItem(checklistInput.value),
  );
  createButton(parent, "Save Todo", () => createTodo(parent));
  createButton(parent, "Cancel", () => cancelCreate(parent));
};

const addProjectForm = (parent) => {
  createInput("text", parent, "Project Name", (text) =>
    updateForm("name", text),
  );
  createButton(parent, "Create Project", () => createProject(parent));
  createButton(parent, "Cancel", () => cancelCreate(parent));
};
