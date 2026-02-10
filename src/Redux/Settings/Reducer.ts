import { createReducer } from "@reduxjs/toolkit";
import { changeIsAuthAction } from "./Actions";

/** Начальное состояние. */
const initialState = {
    isAuth: false
}

/** Редьюсер настроек приложения. */
export const settingsReducer = createReducer(initialState, (builder) => {
    builder

        .addCase(changeIsAuthAction, (reducerState, { payload }) => {
            reducerState.isAuth = payload
         })
})