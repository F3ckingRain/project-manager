import { createAsyncThunk } from "@reduxjs/toolkit";
import type {  ITestCase } from "Modules/Table/Models";
import type { IThunkApiConfig } from "Store";
import { CASES_NAMESPACE } from "../../Consts";
import { casesSelector } from "./Selectors";

/** Экшен получения списка тест-кейсов. */
export const getTableCasesAction = createAsyncThunk<ITestCase[], undefined, IThunkApiConfig>(
    `${CASES_NAMESPACE}__get_test_cases`,
    async (_, { rejectWithValue }) => {
        try {
            return await fetch('/api/table/get-test-cases', { headers: { "Content-Type": "application/json", "Accept": "application/json" } })
                .then(res => res.json())
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)


/** Обработчик удаление тест-кейса. */
export const removeCaseAction = createAsyncThunk<ITestCase[], string, IThunkApiConfig>(
    `${CASES_NAMESPACE}__remove_case`,
    async (caseId, { getState, rejectWithValue }) => {
        const cases = casesSelector(getState());
        const { id } = cases?.[+caseId] || {}
        const body = JSON.stringify({ caseId: id })

        try {
            return await fetch('/api/table/cases/remove', { method: "post", body, headers: { 'Content-Type': "application/json" } })
                .then(res => res.json())
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)