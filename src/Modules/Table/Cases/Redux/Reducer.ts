import { combineReducers } from "@reduxjs/toolkit";
import { casesReducer } from "./State/Reducer";
import { casesFiltersReducer } from "./Filters/Reducer";
import { caseFormReducer } from "../Form/Redux/Reducer";

/** Редьюсер таблицы тест-кейсов. */
export const casesTableReducer = combineReducers({
    state: casesReducer,
    filters: casesFiltersReducer,
    form: caseFormReducer
})