import { combineReducers } from "@reduxjs/toolkit";
import { caseFormReducer } from "./State/Reducer";
import { validationReducer } from "./Validation/Reducer";

/** Редьюсер формы. */
export const formReducer = combineReducers({
    state: caseFormReducer,
    validation: validationReducer 
})