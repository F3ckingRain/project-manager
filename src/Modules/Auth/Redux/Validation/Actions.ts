import { createAction } from "@reduxjs/toolkit";
import type { IValidateAction } from "Common/Models";
import { AUTH_MODULE_NAMESPACE } from "Modules/Auth/Consts";

/** Экшен валидации полей формы авторизации. */
export const validateFieldAction = createAction<IValidateAction>(`${AUTH_MODULE_NAMESPACE}__validate`);

/** Экшен сброса ошибок поля. */
export const resetFieldErrorsAction = createAction<string>(`${AUTH_MODULE_NAMESPACE}__reset_errors`);