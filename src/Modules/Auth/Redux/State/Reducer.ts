import { createReducer } from "@reduxjs/toolkit";
import { resetAuthAction } from "../../../Auth/Actions";
import type { IAuthForm } from "../../../Auth/Models";
import { changeFieldAction } from "./Actions";
import { set } from 'lodash'

/** Тип редакс-стейта данных формы авторизации. */
type TAuthForm = Partial<IAuthForm>

/** Начальное состояние формы. */
const initialState: TAuthForm = {
    authType: 'signIn',
};

/** Редьюсер данных модуля авторизации. */
export const stateReducer = createReducer<TAuthForm>(initialState, (builder) => {
    builder
        // Изменение значения в поле.
        .addCase(changeFieldAction, (reducerState, { payload }) => {
            const { key, value } = payload

            set(reducerState, key, value)
        })

        // Сброс данных формы авторизации.
        .addCase(resetAuthAction, () => initialState)
})