import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import type { IValidateAction, TErrors } from "Common/Models";
import { PROJECT_FORM_NAMESPACE } from "../../Consts";
import { projectFormSelector } from "../State/Selectors";
import type { IThunkApiConfig } from "Store";
import { validateZodSchema } from "Utils/Validation";
import { projectFormSchema } from "../../Schema";
import { isEmpty } from "lodash";

/** Экшен валидации полей формы тест-кейса. */
export const validateFieldAction = createAction<IValidateAction>(`${PROJECT_FORM_NAMESPACE}__validate`);

/** Экшен сброса ошибок поля. */
export const resetFieldErrorsAction = createAction<string>(`${PROJECT_FORM_NAMESPACE}__reset_errors`);

/** Экшен валидации формы перед отправкой. */
export const validateForm = createAsyncThunk<Nullable<TErrors>, undefined, IThunkApiConfig>(
    `${PROJECT_FORM_NAMESPACE}__validate_form`,
    (_, { getState, fulfillWithValue, rejectWithValue }) => {
        const formState = projectFormSelector(getState());
        const errors = validateZodSchema(projectFormSchema, formState);

        if (isEmpty(errors)) {
            return fulfillWithValue(null)
        }
        
        return rejectWithValue(errors)
    }
)