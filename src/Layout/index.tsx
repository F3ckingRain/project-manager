import { BrowserRouter, Route, Routes } from "react-router-dom";
import { FORM_PAGE_PATH } from "../Modules/Form/Consts";
import { TABLE_PAGE_PATH } from "../Modules/Table/Consts";
import { Provider } from "react-redux";
import { AuthPage } from "../Modules/Auth";
import { TablePage } from "../Modules/Table";
import { FormPage } from "../Modules/Form";
import store from "../Store";

/** Лейаут приложения. */
export function AppLayout (): React.JSX.Element {

    return (
        <BrowserRouter>
            <Provider store={store}>
                <Routes>
                    <Route element={<AuthPage />} index />

                    <Route element={<TablePage />} path={TABLE_PAGE_PATH} />

                    <Route element={<FormPage />} path={FORM_PAGE_PATH} />
                </Routes>
            </Provider>
        </BrowserRouter>
    )
}