import { createReducer } from "@reduxjs/toolkit";
import { resetAuthAction } from "../../../Auth/Actions";
import type { IAuthForm } from "../../../Auth/Models";

/** Тип редакс-стейта данных формы авторизации. */
type TAuthForm = Partial<IAuthForm>

const initialState: TAuthForm = {
    authType: 'signIn',
    isAuth: false
};

/** Редьюсер данных модуля авторизации. */
export const stateReducer = createReducer<TAuthForm>(initialState, (builder) => {
    builder
        .addCase(resetAuthAction, () => initialState)
})