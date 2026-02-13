import { createAsyncThunk } from "@reduxjs/toolkit";
import type { IProject } from "Modules/Table/Models";
import type { IThunkApiConfig } from "Store";
import { PROJECTS_NAMESPACE } from "../Consts";

/** Экшен получения списка проектов. */
export const getTableProjectsAction = createAsyncThunk<IProject[], undefined, IThunkApiConfig>(
    `${PROJECTS_NAMESPACE}__get_projects`,
    async (_, { rejectWithValue }) => {
        try {
            return await fetch('/api/table/get-projects', { headers: { "Content-Type": "application/json", "Accept": "application/json" } })
                .then(res => res.json())
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)