import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import type { IValidateAction, TErrors } from "Common/Models";
import { AUTH_MODULE_NAMESPACE } from "Modules/Auth/Consts";
import { authFormStateSelector } from "../State/Selectors";
import type { IThunkApiConfig } from "Store";
import { validateZodSchema } from "Utils/Validation";
import { getAuthFormSchema } from "Modules/Auth/Form/Schema";
import { isEmpty } from "lodash";

/** Экшен валидации полей формы авторизации. */
export const validateFieldAction = createAction<IValidateAction>(`${AUTH_MODULE_NAMESPACE}__validate`);

/** Экшен сброса ошибок поля. */
export const resetFieldErrorsAction = createAction<string>(`${AUTH_MODULE_NAMESPACE}__reset_errors`);

/** Экшен валидации формы перед отправкой. */
export const validateForm = createAsyncThunk<Nullable<TErrors>, undefined, IThunkApiConfig>(
    `${AUTH_MODULE_NAMESPACE}__validate_form`,
    (_, { getState, fulfillWithValue, rejectWithValue }) => {
        const formState = authFormStateSelector(getState());
        const schema = getAuthFormSchema(formState.formType)

        const errors = validateZodSchema(schema, formState);

        if (isEmpty(errors)) {
            return fulfillWithValue(null)
        }
        
        return rejectWithValue(errors)
    }
)