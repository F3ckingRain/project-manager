import { TEST_RUNS_NAMESPACE } from "../Consts";

/** Путь формы создания прогона. */
export const TEST_RUN_CREATE_PATH = 'create';

/** Путь формы редактирования прогона. */
export const TEST_RUN_EDIT_PATH = 'edit/:testRunId';

/** Пространство экшенов формы прогона. */
export const TEST_RUN_FORM_NAMESPACE = `${TEST_RUNS_NAMESPACE}__FORM`