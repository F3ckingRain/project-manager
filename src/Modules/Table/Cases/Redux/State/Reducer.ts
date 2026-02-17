import { createReducer } from "@reduxjs/toolkit";
import { getTableCasesAction, removeCaseAction } from "./Actions";
import type { ITestCase } from "Modules/Table/Models";
import { resetTableAction } from "Modules/Table/Actions";

/** Начальное состояние. */
const initialState: ITestCase[] = []

/** Редьюсер списка тест-кейсов. */
export const casesReducer = createReducer(initialState, (builder) => {
    builder
        // Получение списка тест-кейсов. 
        .addCase(getTableCasesAction.fulfilled, (_, { payload }) => payload)

        // Удаление тест-кейса.
        .addCase(removeCaseAction.fulfilled, (_, { payload }) => payload)

        // Сброс списка тест-кейсов. 
        .addCase(resetTableAction, () => initialState);
})