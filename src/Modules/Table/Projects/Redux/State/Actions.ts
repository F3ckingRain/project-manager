import { createAsyncThunk } from "@reduxjs/toolkit";
import type { IProject } from "Modules/Table/Models";
import type { IThunkApiConfig } from "Store";
import { PROJECTS_NAMESPACE } from "../../Consts";
import { projectsFiltersSelector } from "../Filters/Selectors";

/** Экшен получения списка проектов. */
export const getTableProjectsAction = createAsyncThunk<IProject[], undefined, IThunkApiConfig>(
    `${PROJECTS_NAMESPACE}__get_projects`,
    async (_, { getState, rejectWithValue }) => {
        const filters = projectsFiltersSelector(getState());
        const body = JSON.stringify(filters);

        try {
            return await fetch('/api/table/projects/list', { method: "post", body })
                .then(res => res.json())
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

/** Обработчик удаление проекта. */
export const removeProjectAction = createAsyncThunk<IProject[], string, IThunkApiConfig>(
    `${PROJECTS_NAMESPACE}__remove_project`,
    async (projectId, { rejectWithValue }) => {
        const body = JSON.stringify({ projectId })

        try {
            return await fetch('/api/table/projects/remove', { method: "post", body, headers: { 'Content-Type': "application/json" } })
                .then(res => res.json())
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)