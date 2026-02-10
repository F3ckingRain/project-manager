import projectsData from './projects.json';

/** Фнукция получения списка проектов. */
export const fetchProjects = async () => {
  // Имитация сетевой задержки для реалистичности прототипа
  await new Promise(resolve => setTimeout(resolve, 500));
  return projectsData;
};
