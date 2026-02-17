import { PROJECTS_NAMESPACE } from "../Consts";

/** Путь формы создания проекта. */
export const PROJECT_CREATE_PATH = 'create';

/** Путь формы редактирования проекта. */
export const PROJECT_EDIT_PATH = 'edit/:projectId';

/** Пространство экшенов формы проекта. */
export const PROJECT_FORM_NAMESPACE = `${PROJECTS_NAMESPACE}__FORM`