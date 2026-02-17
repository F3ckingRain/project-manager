import { createAsyncThunk } from "@reduxjs/toolkit";
import type {  ITestCase } from "Modules/Table/Models";
import type { IThunkApiConfig } from "Store";
import { CASES_NAMESPACE } from "../../Consts";
import { casesFiltersSelector } from "../Filters/Selectors";

/** Экшен получения списка тест-кейсов. */
export const getTableCasesAction = createAsyncThunk<ITestCase[], undefined, IThunkApiConfig>(
    `${CASES_NAMESPACE}__get_test_cases`,
    async (_, { rejectWithValue, getState }) => {
        const filters = casesFiltersSelector(getState());
        const body = JSON.stringify(filters);

        try {
            return await fetch('/api/table/cases/list', { method: "post", body })
                .then(res => res.json())
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)


/** Обработчик удаление тест-кейса. */
export const removeCaseAction = createAsyncThunk<ITestCase[], string, IThunkApiConfig>(
    `${CASES_NAMESPACE}__remove_case`,
    async (caseId, { rejectWithValue }) => {
        const body = JSON.stringify({ caseId })

        try {
            return await fetch('/api/table/cases/remove', { method: "post", body, headers: { 'Content-Type': "application/json" } })
                .then(res => res.json())
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)