import { createAction } from "@reduxjs/toolkit";
import { PROJECTS_NAMESPACE } from "../../Consts";
import type { IProject } from "Modules/Table/Models";

/** Экшен изменения фильтра таблицы проектов. */
export const changeProjectFilterAction = createAction<{ key: keyof IProject, value: string }>(`${PROJECTS_NAMESPACE}__change_filter`);

/** Экшен изменения пагинации таблицы проектов. */
export const changePaginationAction = createAction<number>(`${PROJECTS_NAMESPACE}__change_pagionaton`)

/** Экшен сброса фильтров таблицы проектов. */
export const resetFiltersAction = createAction(`${PROJECTS_NAMESPACE}__reset_filters`);