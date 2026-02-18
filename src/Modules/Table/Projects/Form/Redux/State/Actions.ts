import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import { PROJECT_FORM_NAMESPACE } from "../../Consts";
import { projectFormSelector } from "./Selectors";
import type { IThunkApiConfig } from "Store";
import type { IProject } from "Modules/Table/Models";

/** Экшен изменения поля формы проекта. */
export const changeFormFieldAction = createAction<{key: keyof IProject, value: IProject[keyof IProject]}>(`${PROJECT_FORM_NAMESPACE}__change_field`)

/** Экшен сброса данных формы проекта. */
export const resetProjectFormAction = createAction(`${PROJECT_FORM_NAMESPACE}__reset`);

/** Экшен отправки формы проекта. */
export const submitFormAction = createAsyncThunk<void, undefined, IThunkApiConfig>(
    `${PROJECT_FORM_NAMESPACE}__submit`,
    async (_, { getState, rejectWithValue }) => {
        const formState = projectFormSelector(getState());
        const { id } = formState || {};
        const body = JSON.stringify(formState);

        try {
            const response = id 
                ? await fetch(`/api/table/projects/edit`, { method: "put", body })
                : await fetch(`/api/table/projects/create`, { method: 'post', body })

            if (response.status === 200) {
                return
            }

            return rejectWithValue(response.status)
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

/** Экшен получения данных проекта по его идентификатору. */
export const getProjectDataAction = createAsyncThunk<IProject, string, IThunkApiConfig>(
    `${PROJECT_FORM_NAMESPACE}__get`,
    async (id, { rejectWithValue }) => {

        try {
            const response = await fetch(`/api/table/projects/get?id=${id}`, { headers: { 'Content-Type': "application/json" } })
                .then(res => res.json());

            return response
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)