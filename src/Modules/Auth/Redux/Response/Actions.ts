import { createAsyncThunk } from "@reduxjs/toolkit";
import { AUTH_MODULE_NAMESPACE } from "../../Consts";
import {authStateSelector} from "../State/Selectors";
import type { IThunkApiConfig } from "Store";

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
    },
    {
        condition: (token, { getState }) => {
            const isAuth = authStateSelector('isAuth')(getState())

            return !!token && !isAuth
        }
    }
)