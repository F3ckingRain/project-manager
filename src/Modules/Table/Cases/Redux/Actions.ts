import { createAsyncThunk } from "@reduxjs/toolkit";
import type {  ITestCase } from "Modules/Table/Models";
import type { IThunkApiConfig } from "Store";
import { CASES_NAMESPACE } from "../Consts";

/** Экшен получения списка тест-кейсов. */
export const getTableCasessAction = createAsyncThunk<ITestCase[], undefined, IThunkApiConfig>(
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