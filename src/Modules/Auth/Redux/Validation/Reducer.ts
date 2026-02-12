import { createReducer } from "@reduxjs/toolkit";
import { resetAuthAction } from "../../../Auth/Actions";
import { validateFieldAction, resetFieldErrorsAction } from "./Actions";
import { isEmpty, set, unset } from 'lodash'
import type { TReduxValidation } from "Common/Models";
import { validateZodSchema } from "Utils/Validation";

/** Редьюсер валидации данных модуля авторизации. */
export const validationReducer = createReducer<TReduxValidation>({}, (builder) => {
    builder
        // Валидация значения в поле.
        .addCase(validateFieldAction, (reducerState, { payload }) => {
            const { schema, key, value } = payload;

            const errors = validateZodSchema(schema, value);

            isEmpty(errors) ? unset(reducerState, key) : set(reducerState, key, errors);
        })

        // Сброс ошибок поля.
        .addCase(resetFieldErrorsAction, (reducerState, { payload }) => {
            unset(reducerState, payload)
        })

        // Сброс данных формы авторизации.
        .addCase(resetAuthAction, () => ({}));
})