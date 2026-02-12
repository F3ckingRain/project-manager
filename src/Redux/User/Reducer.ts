import { createReducer } from "@reduxjs/toolkit";
import { changeIsAuthAction, changeUserInfoAction, resetUserAction } from "./Actions";

/** Интерфейс данных пользователя. */
export interface IUserReduxState {
    /** Флаг авторизации пользователя. */
    isAuth: boolean;
    /** Логин. */
    login?: string;
    /** Пароль. */
    password?: string;
    /** Картинка профиля пользователя. */
    logo?: string;
    /** Токен авторизации. */
    token?: string;
}

/** Начальное состояние. */
const initialState: IUserReduxState = {
    isAuth: false,
}

/** Редьюсер данных пользователя приложения. */
export const userReducer = createReducer(initialState, (builder) => {
    builder
        // Изменение флага авторизации.
        .addCase(changeIsAuthAction, (reducerState, { payload }) => {
            reducerState.isAuth = payload
         })

        // Изменение данных пользователя.
         .addCase(changeUserInfoAction, (_, { payload }) => ({ ...payload, isAuth: !!payload.isAuth }))

         // Экшен сброса данных пользователя.
         .addCase(resetUserAction, () => initialState)
})