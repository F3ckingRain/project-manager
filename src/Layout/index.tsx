import { FORM_PAGE_PATH } from "../Modules/Form/Consts";
import { TABLE_PAGE_PATH } from "../Modules/Table/Consts";

/** Лейаут приложения. */
export function AppLayout (): React.JSX.Element {

    return (
        <BrowserRouter>
            <Provider store={}>
                <Routes>
                    <Route element={<AuthPage />} index />

                    <Route element={<TablePage />} path={TABLE_PAGE_PATH} />

                    <Route element={<FormPage />} path={FORM_PAGE_PATH} />
                </Routes>
            </Provider>
        </BrowserRouter>
    )
}