import { combineReducers } from "@reduxjs/toolkit";
import { projectsReducer } from "./State/Reducer";
import { projectsFiltersReducer } from "./Filters/Reducer";
import { projectFormReducer } from "../Form/Redux/State/Reducer";

/** Редьюсер таблицы проектов. */
export const projectsTableReducer = combineReducers({
    state: projectsReducer,
    filters: projectsFiltersReducer,
    form: projectFormReducer
})