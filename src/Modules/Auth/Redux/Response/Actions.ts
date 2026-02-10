import { createAsyncThunk } from "@reduxjs/toolkit";
import { AUTH_MODULE_NAMESPACE } from "../../Consts";
import { isAuthSelector } from "./Selectors";
import type { IThunkApiConfig } from "Store";

/** Экшен проверки токена авторизации. */
export const checkTokenExpire = createAsyncThunk<null, Optional<string>, IThunkApiConfig>(
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
            const isAuth = isAuthSelector(getState())

            return !!token && !isAuth
        }
    }
)