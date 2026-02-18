import { combineReducers } from "@reduxjs/toolkit";
import { testRunsReducer } from "./State/Reducer";
import { formReducer } from "../Form/Redux/Reducer";

/** Редьюсер таблицы проектов. */
export const testRunsTableReducer = combineReducers({
    state: testRunsReducer,
    form: formReducer
})