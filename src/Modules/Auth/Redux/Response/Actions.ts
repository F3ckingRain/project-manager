import { createAsyncThunk } from "@reduxjs/toolkit";
import { AUTH_MODULE_NAMESPACE } from "../../Consts";
import { authFormStateSelector, authStateSelector } from "../State/Selectors";
import type { IThunkApiConfig } from "Store";
import { isAuthSelector } from "Redux/User/Selectors";
import type { IUserReduxState } from "Redux/User/Reducer";

/** Экшен проверки токена авторизации. */
export const checkTokenExpireAction = createAsyncThunk<Partial<IUserReduxState>, string, IThunkApiConfig>(
    `${AUTH_MODULE_NAMESPACE}__check_token_expired`,
    async (token, { rejectWithValue }) => {
        try {
            const body = JSON.stringify({ token })

            const response = await fetch('/api/auth/check-token-expired', { method:'post', body, headers: { 'Content-Type': "application/json" } });
            const data = await response.json();

            if (response.status === 200) {
                return data
            }

            return rejectWithValue(response.status)
        } catch(error) {
            return rejectWithValue(error)
        }
    }
)

/** Экшен входа в учётную запись. */
export const signInAction = createAsyncThunk<Partial<IUserReduxState>, never, IThunkApiConfig>(
    `${AUTH_MODULE_NAMESPACE}__sign_in`,
    async (_, { getState, rejectWithValue }) => {
        try {
            const { login, password } = authFormStateSelector(getState())

            const body = JSON.stringify({ login, password })

            return await fetch('/api/auth/sign-in', { method: "post", body }).then(res => res.json())
        } catch (error) {
            return rejectWithValue(error)
        }
    },
    {
        condition: (_, { getState }) => {
            const { login, password } = authFormStateSelector(getState())

            return !!login && !!password
        }
    }
)

/** Экшен создания учётной записи. */
export const signUpAction = createAsyncThunk<Partial<IUserReduxState>, never, IThunkApiConfig>(
    `${AUTH_MODULE_NAMESPACE}__sign_up`,
    async (_, { getState, rejectWithValue }) => {
        try {
            const { login, password } = authFormStateSelector(getState())

            const body = JSON.stringify({ login, password })

            return await fetch('/api/auth/sign-in', { method: "post", body }).then(res => res.json())
        } catch (error) {
            return rejectWithValue(error)
        }
    },
    {
        condition: (_, { getState }) => {
            const { login, password } = authFormStateSelector(getState())

            return !!login && !!password
        }
    }
)

/** Экшен восстановления пароля. */
export const restorePasswordAction = createAsyncThunk<void, never, IThunkApiConfig>(
    `${AUTH_MODULE_NAMESPACE}__restore_password`,
    async (_, { getState, rejectWithValue }) => {
        try {
            const login = authStateSelector('login')(getState());

            const body = JSON.stringify({ login })

            const response = await fetch('/api/auth/restore-password', { method: 'post', body });

            if (response.status === 200) {
                return
            }

            return rejectWithValue(response.status);
        } catch (error) {
            return rejectWithValue(error);
        }
    },
    {
        condition: (_, { getState }) => {
            const login = authStateSelector('login')(getState());

            return !!login
        }
    }
)

/** Экшен выхода из сессии. */
export const logOutAction = createAsyncThunk<void, never, IThunkApiConfig>(
    `${AUTH_MODULE_NAMESPACE}__sign_up`,
    async (_, { rejectWithValue }) => {
        try {
            await fetch('/api/auth/logout')
        } catch (error) {
            return rejectWithValue(error)
        }
    },
    {
        condition: (_, { getState }) => {
            const isAuth = isAuthSelector(getState())

            return !!isAuth
        }
    }
)