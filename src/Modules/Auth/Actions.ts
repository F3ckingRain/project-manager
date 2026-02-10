import { createAction } from "@reduxjs/toolkit";
import { AUTH_MODULE_NAMESPACE } from "./Consts";

/** Экшен сброса данных модуля авторизации. */
export const resetAuthAction = createAction(`${AUTH_MODULE_NAMESPACE}__reset`)