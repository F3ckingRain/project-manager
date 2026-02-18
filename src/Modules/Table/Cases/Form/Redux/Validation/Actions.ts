import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import type { IValidateAction, TErrors } from "Common/Models";
import { CASES_FORM_NAMESPACE } from "../../Consts";
import { casesFormSelector } from "../State/Selectors";
import type { IThunkApiConfig } from "Store";
import { casesFormSchema } from "../../Schema";
import { isEmpty } from "lodash";
import { validateZodSchema } from "Utils/Validation";

/** Экшен валидации полей формы тест-кейса. */
export const validateFieldAction = createAction<IValidateAction>(`${CASES_FORM_NAMESPACE}__validate`);

/** Экшен сброса ошибок поля. */
export const resetFieldErrorsAction = createAction<string>(`${CASES_FORM_NAMESPACE}__reset_errors`);

/** Экшен валидации формы перед отправкой. */
export const validateForm = createAsyncThunk<Nullable<TErrors>, undefined, IThunkApiConfig>(
    `${CASES_FORM_NAMESPACE}__validate_form`,
    (_, { getState, fulfillWithValue, rejectWithValue }) => {
        const formState = casesFormSelector(getState());
        const errors = validateZodSchema(casesFormSchema, formState);

        if (isEmpty(errors)) {
            return fulfillWithValue(null)
        }
        
        return rejectWithValue(errors)
    }
)