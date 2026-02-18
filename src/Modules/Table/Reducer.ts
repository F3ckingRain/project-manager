import { combineReducers } from "@reduxjs/toolkit";
import { projectsTableReducer } from "./Projects/Redux/Reducer";
import { casesTableReducer } from "./Cases/Redux/Reducer";
import { testRunsTableReducer } from "./TestRuns/Redux/Reducer";

/** Редьюсер модуля таблиц. */
export const tableReducer = combineReducers({
    projects: projectsTableReducer,
    cases: casesTableReducer,
    testRuns: testRunsTableReducer,
})