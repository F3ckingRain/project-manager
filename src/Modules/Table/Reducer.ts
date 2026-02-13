import { combineReducers } from "@reduxjs/toolkit";
import { projectsReducer } from "./Projects/Redux/Reducer";
import { casesReducer } from "./Cases/Redux/Reducer";

/** Редьюсер модуля таблиц. */
export const tableReducer = combineReducers({
    projects: projectsReducer,
    cases: casesReducer,
})