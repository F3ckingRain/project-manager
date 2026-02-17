import { createReducer } from "@reduxjs/toolkit";
import type { ITestCase } from "Modules/Table/Models";
import { changeFormFieldAction, resetProjectFormAction } from "./Actions";
import { set } from "lodash";

/** Начальное состояние. */
const initialState: Partial<ITestCase> = {}

/** Редьюсер формы создания/редактирования тест-кейса. */
export const caseFormReducer = createReducer(initialState, (builder) => {
    builder
        // Изменение значения поля формы.
        .addCase(changeFormFieldAction, (reducerState, { payload }) => {
            const { key, value } = payload

            set(reducerState, key, value)
        })

        // Сброс данных формы.
        .addCase(resetProjectFormAction, () => initialState)
})