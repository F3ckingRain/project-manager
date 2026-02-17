import { createReducer } from "@reduxjs/toolkit";
import type { ITableFilter } from "Common/Models";
import { resetTableAction } from "Modules/Table/Actions";
import type { ITestCase } from "Modules/Table/Models";
import { changePaginationAction, changeCaseFilterAction, resetFiltersAction } from "./Actions";
import { set, unset } from "lodash";

/** Начальное состояние. */
const initialState: ITableFilter<ITestCase> = {}

/** Редьюсер фильтров тест-кейсов. */
export const casesFiltersReducer = createReducer(initialState, (builder) => {
    builder
        // Изменение фильтра.
        .addCase(changeCaseFilterAction, (reducerState, { payload }) => {
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