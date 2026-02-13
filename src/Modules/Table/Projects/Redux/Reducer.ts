import { createReducer } from "@reduxjs/toolkit";
import { getTableProjectsAction } from "./Actions";
import type { IProject } from "Modules/Table/Models";
import { resetTableAction } from "Modules/Table/Actions";

/** Начальное состояние. */
const initialState: IProject[] = []

/** Редьюсер списка проектов. */
export const projectsReducer = createReducer(initialState, (builder) => {
    builder
        // Получение списка проектов. 
        .addCase(getTableProjectsAction.fulfilled, (_, { payload }) => payload)

        // Сброс списка проектов. 
        .addCase(resetTableAction, () => initialState);
})