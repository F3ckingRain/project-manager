import { combineReducers } from "@reduxjs/toolkit";
import { projectFormReducer } from "./State/Reducer";

/** Редьюсер формы. */
export const formReducer = combineReducers({
    state: projectFormReducer,
})