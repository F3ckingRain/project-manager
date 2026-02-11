import { combineReducers } from "@reduxjs/toolkit";
import { stateReducer } from "./Redux/State/Reducer";
import { validationReducer } from "./Redux/Validation/Reducer";

/** Редьюсер модуля авторизации. */
export const authReducer = combineReducers({
    state: stateReducer,
    validation: validationReducer,
})