import { createAction } from "@reduxjs/toolkit";

/** Экшен изменения флага авторизации. */
export const changeIsAuthAction = createAction<boolean>(`changeIsAuth`)