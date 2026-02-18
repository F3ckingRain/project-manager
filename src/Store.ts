import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./Modules/Auth/Reducer";
import { userReducer } from "Redux/User/Reducer";
import { tableReducer } from "Modules/Table/Reducer";

/** Редьюсер приложения. */
const rootReducer = combineReducers({
    auth: authReducer,
    table: tableReducer,
    user: userReducer,
});

/** Стор приложения. */
const store = configureStore({ 
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false
    }),
 });

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