import { createAsyncThunk } from "@reduxjs/toolkit";
import { AUTH_MODULE_NAMESPACE } from "../../Consts";
import { authFormStateSelector } from "../State/Selectors";
import type { IThunkApiConfig } from "Store";
import { isAuthSelector } from "Redux/Settings/Selectors";

/** Экшен проверки токена авторизации. */
export const checkTokenExpireAction = createAsyncThunk<null, Nullable<string>, IThunkApiConfig>(
    `${AUTH_MODULE_NAMESPACE}__check_token_expire`,
    async (token, { rejectWithValue }) => {
        try {
            const response = await fetch(`api/auth/check-token-expired?token=${token}`)

            if (response.status === 200) {
                return null
            }

            return rejectWithValue(response.status)
        } catch(error) {
            return rejectWithValue(error)
        }
    }
)

/** Экшен входа в учётную запись. */
export const signInAction = createAsyncThunk<string, never, IThunkApiConfig>(
    `${AUTH_MODULE_NAMESPACE}__sign_in`,
    async (_, { getState, rejectWithValue }) => {
        try {
            const { login, password } = authFormStateSelector(getState())

            const body = JSON.stringify({ login, password })

            const response = await fetch('api/auth/sign-in', { method: "post", body }).then(res => res.json())

            return response?.token || ""
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
export const signUpAction = createAsyncThunk<string, never, IThunkApiConfig>(
    `${AUTH_MODULE_NAMESPACE}__sign_up`,
    async (_, { getState, rejectWithValue }) => {
        try {
            const { login, password } = authFormStateSelector(getState())

            const body = JSON.stringify({ login, password })

            const response = await fetch('api/auth/sign-in', { method: "post", body }).then(res => res.json())

            return response?.token || ""
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

/** Экшен выхода из сессии. */
export const logOutAction = createAsyncThunk<void, never, IThunkApiConfig>(
    `${AUTH_MODULE_NAMESPACE}__sign_up`,
    async (_, { rejectWithValue }) => {
        try {
            await fetch('api/auth/logout')
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