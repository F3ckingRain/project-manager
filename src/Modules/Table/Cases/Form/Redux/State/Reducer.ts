import { createReducer } from "@reduxjs/toolkit";
import type { ITestCase } from "Modules/Table/Models";
import { changeFormFieldAction, getCaseDataAction, resetProjectFormAction } from "./Actions";
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

        // Получение данных тест-кейса.
        .addCase(getCaseDataAction.fulfilled, (_, { payload }) => payload)

        // Сброс данных формы.
        .addCase(resetProjectFormAction, () => initialState)
})