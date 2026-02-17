import { CASES_NAMESPACE } from "../Consts";

/** Путь формы создания тест-кейса. */
export const CASES_CREATE_PATH = 'create';

/** Путь формы редактирования тест-кейса. */
export const CASES_EDIT_PATH = 'edit/:caseId';

/** Пространство экшенов формы тест-кейса. */
export const CASES_FORM_NAMESPACE = `${CASES_NAMESPACE}__FORM`