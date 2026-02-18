import { combineReducers } from "@reduxjs/toolkit";
import { projectsReducer } from "./State/Reducer";
import { projectsFiltersReducer } from "./Filters/Reducer";
import { formReducer } from "../Form/Redux/Reducer";

/** Редьюсер таблицы проектов. */
export const projectsTableReducer = combineReducers({
    state: projectsReducer,
    filters: projectsFiltersReducer,
    form: formReducer
})