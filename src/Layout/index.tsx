import { Route, Routes } from "react-router-dom";
import { TABLE_PAGE_PATH } from "../Modules/Table/Consts";
import { AuthPage } from "../Modules/Auth";
import { TablePage } from "../Modules/Table";
import { Header } from "Common/Components/Header";
import { useCheckAuthToken } from "./Hooks";

/** Лейаут приложения. */
export function AppLayout (): React.JSX.Element {

    // Проверка токена авторизации.
    useCheckAuthToken();

    return (
        <>
        <Header />

        <Routes>
            <Route element={<AuthPage />} index />

            <Route element={<TablePage />} path={`${TABLE_PAGE_PATH}/*`} />
        </Routes>
        </>
    )
}