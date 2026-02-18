import { createAsyncThunk } from "@reduxjs/toolkit";
import type { ITestRun } from "Modules/Table/Models";
import type { IThunkApiConfig } from "Store";
import { TEST_RUNS_NAMESPACE } from "../../Consts";

/** Экшен получения списка прогонов. */
export const getTableTestRunsAction = createAsyncThunk<ITestRun[], undefined, IThunkApiConfig>(
    `${TEST_RUNS_NAMESPACE}__get_test_runs`,
    async (_, { rejectWithValue }) => {
        try {
            return await fetch('/api/table/test-runs/list', { method: "post" })
                .then(res => res.json())
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

/** Обработчик удаление прогона. */
export const removeTestRunAction = createAsyncThunk<ITestRun[], string, IThunkApiConfig>(
    `${TEST_RUNS_NAMESPACE}__remove_test_run`,
    async (testRunId, { rejectWithValue }) => {
        const body = JSON.stringify({ testRunId })

        try {
            return await fetch('/api/table/test-runs/remove', { method: "post", body, headers: { 'Content-Type': "application/json" } })
                .then(res => res.json())
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)