import Todo from "../../utils/Todo";
import { priorityLevels } from "../../utils/constants";
import "./projects.css";
import {
  createButton,
  createElement,
  createTextElement,
} from "../element/element";
import { openExistingTodo } from "../form/form";
import check from "../../../check.svg";
import trash from "../../../icons8-trash-48.png";

export default function Projects() {
  const container = document.createElement("div");
  container.classList.add("projectsContainer");
  Todo.getAll().forEach((project) => {
    const projectContainer = createElement("div", "projectContainer", "main");
    createTextElement("p", "projectTitle", projectContainer, project.name);
    createTextElement(
      "p",
      "projectDate",
      projectContainer,
      `Created: ${new Date(project.id).toLocaleString()}`,
    );
    project.todos.forEach((todo) => {
      projectContainer.appendChild(createTodo(todo));
    });
    createButton(
      projectContainer,
      `Delete Project`,
      () => deleteProject(project),
      ["removeProjectButton"],
    );
    container.appendChild(projectContainer);
  });
  document.querySelector("main").appendChild(container);
}

const deleteProject = (project) => {
  // console.log(`deleting`);
  // console.log(project);
  Todo.deleteProject(project);
  document.querySelector("main").innerHTML = "";
  Projects();
};

const openTodo = (todo) => {
  openExistingTodo(todo);
};

const createTodo = (todo) => {
  const row = document.createElement("row");
  row.classList.add("row");
  const container = document.createElement("div");
  container.classList.add("todoContainer");
  const markCompleteBtn = document.createElement("img");
  markCompleteBtn.src = check;
  markCompleteBtn.classList.add("todoActionButton");
  markCompleteBtn.classList.add("check");
  markCompleteBtn.addEventListener("click", () => {
    Todo.completeTodo(todo);
    document.querySelector("main").innerHTML = "";
    Projects();
    // console.log("check clicked");
  });
  const trashBtn = document.createElement("img");
  trashBtn.src = trash;
  trashBtn.classList.add("todoActionButton");
  trashBtn.classList.add("trash");
  trashBtn.addEventListener("click", () => {
    Todo.deleteTodo(todo);
    document.querySelector("main").innerHTML = "";
    Projects();
    // console.log("trash clicked");
  });
  row.appendChild(markCompleteBtn);
  container.addEventListener("click", () => openTodo(todo));
  createTextElement("p", "todoDescription", container, todo.description);
  if (todo.dueDate) {
    createTextElement(
      "p",
      "todoDue",
      container,
      `Due: ${todo.dueDate ? new Date(todo.dueDate).toLocaleString() : "n/a"}`,
    );
  }
  createTextElement(
    "p",
    `priority${priorityLevels[todo.priority]}`,
    container,
    `${priorityLevels[todo.priority]} Priority`,
  );
  if (todo.notes) {
    const notesDiv = createElement("div", "subsection", container);
    createTextElement("p", "subsectionHeader", notesDiv, "Notes:");
    createTextElement("p", "todoNotes", notesDiv, todo.notes);
  }
  if (todo.checklist.length) {
    const checklistDiv = createElement("div", "subsection", container);
    createTextElement("p", "subsectionHeader", checklistDiv, "Checklist:");
    for (const checklistItem of todo.checklist) {
      createTextElement(
        "p",
        [
          "todoChecklistItem",
          `${checklistItem.done ? "checklistDone" : "checklistNotDone"}`,
        ],
        checklistDiv,
        checklistItem.description,
      );
    }
    container.appendChild(checklistDiv);
  }
  row.appendChild(container);
  row.appendChild(trashBtn);
  return row;
};
