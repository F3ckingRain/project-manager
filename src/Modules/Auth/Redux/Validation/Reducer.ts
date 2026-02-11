import { createReducer } from "@reduxjs/toolkit";
import { resetAuthAction } from "../../../Auth/Actions";
import { validateFieldAction } from "./Actions";
import { set } from 'lodash'
import type { TReduxValidation } from "Common/Models";
import { validateZodSchema } from "Utils/Validation";

/** Редьюсер валидации данных модуля авторизации. */
export const validationReducer = createReducer<TReduxValidation>({}, (builder) => {
    builder
        // Валидация значения в поле.
        .addCase(validateFieldAction, (reducerState, { payload }) => {
            const { schema, key, value } = payload

            console.log(schema)
            const errors = validateZodSchema(schema, value)

            set(reducerState, key, errors)
        })

        // Сброс данных формы авторизации.
        .addCase(resetAuthAction, () => ({}))
})