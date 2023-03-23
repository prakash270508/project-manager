import { browser } from "$app/environment";
import { writable } from "svelte/store";

const data = browser
? JSON.parse(window.localStorage.getItem("projects")) ?? []
: [];

export const projects = writable(data);

projects.subscribe((value) => {
  if (browser) {
    localStorage.setItem("projects", JSON.stringify(value));
  }
});



export const addProject = (projectData) => {
  projects.update((prevalue) => {
    return [...prevalue, projectData];
  });
};

export const deleteProject = (id) => {
  projects.update((currentValue) => {
    return currentValue.filter((projec) => projec.id !== id);
  });
};
