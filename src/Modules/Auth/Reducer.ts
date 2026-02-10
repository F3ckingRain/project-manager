import { combineReducers } from "@reduxjs/toolkit";
import { stateReducer } from "../Form/Redux/State/Reducer";

/** Редьюсер модуля авторизации. */
export const authReducer = combineReducers({
    state: stateReducer
})