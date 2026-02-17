import { createAction } from "@reduxjs/toolkit";
import { CASES_NAMESPACE } from "../../Consts";
import type { ITestCase } from "Modules/Table/Models";

/** Экшен изменения фильтра таблицы тест-кейсов. */
export const changeCaseFilterAction = createAction<{ key: keyof ITestCase, value: string }>(`${CASES_NAMESPACE}__change_filter`);

/** Экшен изменения пагинации таблицы тест-кейсов. */
export const changePaginationAction = createAction<number>(`${CASES_NAMESPACE}__change_pagionaton`)

/** Экшен сброса фильтров таблицы тест-кейсов. */
export const resetFiltersAction = createAction(`${CASES_NAMESPACE}__reset_filters`);