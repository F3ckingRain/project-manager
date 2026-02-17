import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import { CASES_CREATE_PATH } from "../Consts";
import { casesFormSelector } from "./Selectors";
import type { IThunkApiConfig } from "Store";
import type { ITestCase } from "Modules/Table/Models";

/** Экшен изменения поля формы тест-кейса. */
export const changeFormFieldAction = createAction<{key: keyof ITestCase, value: ITestCase[keyof ITestCase]}>(`${CASES_CREATE_PATH}__change_field`)

/** Экшен сброса данных формы тест-кейса. */
export const resetProjectFormAction = createAction(`${CASES_CREATE_PATH}__reset`);

/** Экшен отправки формы тест-кейса. */
export const submitFormAction = createAsyncThunk<void, undefined, IThunkApiConfig>(
    `${CASES_CREATE_PATH}__submit`,
    async (_, { getState, rejectWithValue }) => {
        const formState = casesFormSelector(getState());
        const { id } = formState || {};
        const body = JSON.stringify(formState);

        try {
            const response = id 
                ? await fetch(`/api/table/cases/edit`, { method: "put", body })
                : await fetch(`/api/table/cases/create`, { method: 'post', body })

            if (response.status === 200) {
                return
            }

            return rejectWithValue(response.status)
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

/** Экшен получения данных тест-кейса по его идентификатору. */
export const getCaseDataAction = createAsyncThunk<ITestCase, string, IThunkApiConfig>(
    `${CASES_CREATE_PATH}__get`,
    async (id, { rejectWithValue }) => {

        try {
            const response = await fetch(`/api/table/cases/get?id=${id}`, { headers: { 'Content-Type': "application/json" } })
                .then(res => res.json());

            return response
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)