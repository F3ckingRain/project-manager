import { createAction } from "@reduxjs/toolkit";
import type { IUserReduxState } from "./Reducer";
import { USER_NAMESPACE } from "./Consts";

/** Экшен изменения флага авторизации. */
export const changeIsAuthAction = createAction<boolean>(`${USER_NAMESPACE}__change_is_auth`);

/** Экшен изменения данных пользователя. */
export const changeUserInfoAction = createAction<Partial<IUserReduxState>>(`${USER_NAMESPACE}__change_user_info`);

/** Экшен сброса данных пользователя. */
export const resetUserAction = createAction(`${USER_NAMESPACE}__reset`);