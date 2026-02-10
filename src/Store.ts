import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./Modules/Auth/Reducer";
import { settingsReducer } from "Redux/Settings/Reducer";

/** Редьюсер приложения. */
const rootReducer = combineReducers({
    auth: authReducer,
    settings: settingsReducer,
});

/** Стор приложения. */
const store = configureStore({ reducer: rootReducer });

/** Тип стора приложения. */
export type TReduxState = ReturnType<typeof store.getState>;


/** Интерфейс конфигурации thunk'а. */
export interface IThunkApiConfig {
    /** Состояние редакса. */
    state: TReduxState;
    /** Диспатч. */
    dispatch: typeof store.dispatch;
}

export default store;