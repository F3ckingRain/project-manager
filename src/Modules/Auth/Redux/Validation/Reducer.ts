import { createReducer } from "@reduxjs/toolkit";
import { resetAuthAction } from "../../../Auth/Actions";
import { validateFieldAction, resetFieldErrorsAction, validateForm } from "./Actions";
import { forEach, isEmpty, set, unset } from 'lodash'
import type { TErrors, TReduxValidation } from "Common/Models";
import { validateZodSchema } from "Utils/Validation";

/** Редьюсер валидации данных модуля авторизации. */
export const validationReducer = createReducer<TReduxValidation>({}, (builder) => {
    builder
        // Валидация значения в поле.
        .addCase(validateFieldAction, (reducerState, { payload }) => {
            const { schema, key, value } = payload;

            const errors = validateZodSchema(schema, value);

            if (isEmpty(errors)) {
                unset(reducerState, key);
            }

            forEach(errors, (error, fieldPath) => {
                if (isEmpty(error)) {
                    unset(reducerState, fieldPath ? `${key}.${fieldPath}` : `${key}`)
                } else {
                    set(reducerState, fieldPath ? `${key}.${fieldPath}` : `${key}`, error)
                }
            })
        })

        // Ошибка при валидации формы перед отправкой.
        .addCase(validateForm.rejected, (reducerState, { payload }) => {
            const errors = payload as TErrors;
            console.log(errors);
            

            forEach(errors, (error, fieldPath) => {
                if (isEmpty(error)) {
                    unset(reducerState, fieldPath)
                } else {
                    set(reducerState, fieldPath, error)
                }
            })
        })

        // Сброс ошибок поля.
        .addCase(resetFieldErrorsAction, (reducerState, { payload }) => {
            unset(reducerState, payload)
        })

        // Сброс ошибок при успешной валидации формы.
        .addCase(validateForm.fulfilled, () => ({}))

        // Сброс данных формы авторизации.
        .addCase(resetAuthAction, () => ({}));
})