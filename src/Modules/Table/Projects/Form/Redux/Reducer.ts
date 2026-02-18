import { combineReducers } from "@reduxjs/toolkit";
import { projectFormReducer } from "./State/Reducer";
import { validationReducer } from "./Validation/Reducer";

/** Редьюсер формы. */
export const formReducer = combineReducers({
    state: projectFormReducer,
    validation: validationReducer 
})