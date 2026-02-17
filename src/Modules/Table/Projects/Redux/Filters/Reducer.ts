import { createReducer } from "@reduxjs/toolkit";
import type { ITableFilter } from "Common/Models";
import { resetTableAction } from "Modules/Table/Actions";
import type { IProject } from "Modules/Table/Models";
import { changePaginationAction, changeProjectFilterAction, resetFiltersAction } from "./Actions";
import { set, unset } from "lodash";

/** Начальное состояние. */
const initialState: ITableFilter<IProject> = {}

/** Редьюсер фильтров проектов. */
export const projectsFiltersReducer = createReducer(initialState, (builder) => {
    builder
        // Изменение фильтра.
        .addCase(changeProjectFilterAction, (reducerState, { payload }) => {
            const { key, value } = payload;

            set(reducerState, `filters.${key}`, value);
        })

        // Сброс данных фильтрации.
        .addCase(resetFiltersAction, (reducerState) => {
            unset(reducerState, 'filters');
        })

        // Изменение пагинации.
        .addCase(changePaginationAction, (reducerState, { payload }) => {
            set(reducerState, 'pagination', payload)
        })

        // Сброс данных таблицы проектов.
        .addCase(resetTableAction, () => initialState);
})