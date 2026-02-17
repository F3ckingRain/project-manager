import { createReducer } from "@reduxjs/toolkit";
import type { IProject } from "Modules/Table/Models";
import { changeFormFieldAction, resetProjectFormAction } from "./Actions";
import { set } from "lodash";

/** Начальное состояние. */
const initialState: Partial<IProject> = {}

/** Редьюсер формы создания/редактирования проекта. */
export const projectFormReducer = createReducer(initialState, (builder) => {
    builder
        // Изменение значения поля формы.
        .addCase(changeFormFieldAction, (reducerState, { payload }) => {
            const { key, value } = payload

            set(reducerState, key, value)
        })

        // Сброс данных формы.
        .addCase(resetProjectFormAction, () => initialState)
})