import { createReducer } from "@reduxjs/toolkit";
import { getTableTestRunsAction, removeTestRunAction } from "./Actions";
import type { ITestRun } from "Modules/Table/Models";
import { resetTableAction } from "Modules/Table/Actions";

/** Начальное состояние. */
const initialState: ITestRun[] = []

/** Редьюсер списка прогонов. */
export const testRunsReducer = createReducer(initialState, (builder) => {
    builder
        // Получение списка прогонов. 
        .addCase(getTableTestRunsAction.fulfilled, (_, { payload }) => payload)

         // Удаление прогона. 
        .addCase(removeTestRunAction.fulfilled, (_, { payload }) => payload)

        // Сброс списка прогонов. 
        .addCase(resetTableAction, () => initialState);
})