import { seedData } from "./constants.js";
// for handling data transformation from js object to json and back agqain,
// and for communicating with storage implementations (local storage for now)
// Uses the facade pattern

class LocalStorage {
  constructor() {
    // console.log('Creating new local storage object');
    this.name = "LocalStorage";
  }

  readAll() {
    const projects = window.localStorage.getItem("projects");
    if (projects) {
      return JSON.parse(projects);
    } else {
      return null;
    }
  }

  initialize() {
    console.log("Initializing from LocalStorage");
    window.localStorage.setItem("projects", JSON.stringify(seedData));
  }

  setTodo(incomingTodo) {
    const projects = JSON.parse(window.localStorage.getItem("projects"));
    let project = projects.find(
      (project) => project.id === incomingTodo.projectId,
    );
    let todoFound = false;
    project.todos.forEach((todo, index) => {
      if (todo.id === incomingTodo.id) {
        todo = incomingTodo;
        project.todos[index] = incomingTodo;
        todoFound = true;
        return;
      }
    });
    if (!todoFound) project.todos.push(incomingTodo);
    window.localStorage.setItem("projects", JSON.stringify(projects));
  }

  setProject(incomingProject) {
    const projects = JSON.parse(window.localStorage.getItem("projects"));
    let saved = false;
    // console.log(projects);
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
      window.localStorage.setItem("projects", JSON.stringify(projects));
    }
  }

  deleteProject(incomingProject, indexToRemove) {
    console.log(`deleting ${incomingProject.id}, index is ${indexToRemove}`);
    let projects = JSON.parse(window.localStorage.getItem("projects"));
    if (projects[indexToRemove].id === incomingProject.id) {
      projects.splice(indexToRemove, 1);
      window.localStorage.setItem("projects", JSON.stringify(projects));
    }
  }

  updateTodo(incomingTodo) {
    let projects = JSON.parse();
    const project = projects.find(
      (project) => project.id === incomingTodo.projectId,
    );
    if (!project)
      throw new Error(`Error updating todo ${incomingTodo}, project not found`);
    let todoIndex = -1;
    project.todos.map((todo, index) => {
      if (todo.id === incomingTodo.id) {
        todoIndex = index;
      }
    });
    if (todoIndex < 0)
      throw new Error(`Error updating todo ${incomingTodo}, todo not found`);
    project.todos.splice(todoIndex, 1);
    if (project.previousTodos.length) {
      project.previousTodos.push(incomingTodo);
    } else {
      project.previousTodos = [incomingTodo];
    }
    window.localStorage.setItem("projects", JSON.stringify(projects));
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
      if (bucket === "localStorage") {
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
        console.error("all data sources are not equal!");
      }
    }
    return first;
  }

  initialize() {
    console.log("Initializing from Storage");
    console.log(this.#storageMediums);
    for (const container of this.#storageMediums) {
      container.initialize();
    }
  }

  setTodo(incomingTodo) {
    const containerOutput = [];
    for (const container of this.#storageMediums) {
      containerOutput.push({
        container: container.name,
        results: container.setTodo(incomingTodo),
      });
    }
    for (let i = 1; i < containerOutput.length; i++) {
      if (containerOutput[i] != first) {
        console.error("all data sources are not equal!");
      }
    }
    return containerOutput;
  }

  setProject(project) {
    for (const container of this.#storageMediums) {
      container.setProject(project);
    }
  }

  deleteProject(incomingProject, indexToRemove) {
    for (const container of this.#storageMediums) {
      container.deleteProject(incomingProject, indexToRemove);
    }
  }

  completeTodo(todo) {
    for (const container of this.#storageMediums) {
      container.completeTodo(todo);
    }
  }
}

export default Storage;
