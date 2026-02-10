import { combineReducers } from "@reduxjs/toolkit";
import { stateReducer } from "./Redux/State/Reducer";

/** Редьюсер модуля авторизации. */
export const authReducer = combineReducers({
    state: stateReducer
})