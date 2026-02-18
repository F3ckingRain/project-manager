import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import { TEST_RUN_FORM_NAMESPACE } from "../../Consts";
import { projectFormSelector } from "./Selectors";
import type { IThunkApiConfig } from "Store";
import type { ITestRun } from "Modules/Table/Models";

/** Экшен изменения поля формы прогона. */
export const changeFormFieldAction = createAction<{key: keyof ITestRun, value: ITestRun[keyof ITestRun]}>(`${TEST_RUN_FORM_NAMESPACE}__change_field`)

/** Экшен сброса данных формы прогона. */
export const resetTestRunFormAction = createAction(`${TEST_RUN_FORM_NAMESPACE}__reset`);

/** Экшен отправки формы прогона. */
export const submitFormAction = createAsyncThunk<void, undefined, IThunkApiConfig>(
    `${TEST_RUN_FORM_NAMESPACE}__submit`,
    async (_, { getState, rejectWithValue }) => {
        const formState = projectFormSelector(getState());
        const { id } = formState || {};
        const body = JSON.stringify(formState);

        try {
            const response = id 
                ? await fetch(`/api/table/test-runs/edit`, { method: "put", body })
                : await fetch(`/api/table/test-runs/create`, { method: 'post', body })

            if (response.status === 200) {
                return
            }

            return rejectWithValue(response.status)
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

/** Экшен получения данных прогона по его идентификатору. */
export const getTestRunDataAction = createAsyncThunk<ITestRun, string, IThunkApiConfig>(
    `${TEST_RUN_FORM_NAMESPACE}__get`,
    async (id, { rejectWithValue }) => {

        try {
            const response = await fetch(`/api/table/test-runs/get?id=${id}`, { headers: { 'Content-Type': "application/json" } })
                .then(res => res.json());

            return response
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)