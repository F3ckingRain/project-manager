import { createAction } from "@reduxjs/toolkit";
import { AUTH_MODULE_NAMESPACE } from "Modules/Auth/Consts";
import type { IAuthForm } from "Modules/Auth/Models";
import type { IChangeAction } from "Utils/Redux/Models";

/** Экшен изменения полей формы авторизации. */
export const changeFieldAction = createAction<IChangeAction<IAuthForm>>(`${AUTH_MODULE_NAMESPACE}__change_field`);