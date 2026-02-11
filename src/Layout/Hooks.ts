import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "Hooks/Redux";
import { useLocation, useNavigate } from "react-router-dom";
import { checkTokenExpireAction } from "Modules/Auth/Redux/Response/Actions";
import { TABLE_PAGE_PATH } from "Modules/Table/Consts";
import { changeIsAuthAction } from "Redux/Settings/Actions";
import { isAuthSelector } from "Redux/Settings/Selectors";
import { toast } from "react-hot-toast";

/** Хук проверки токена авторизации. */
export function useCheckAuthToken (): void {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { pathname } = useLocation()
    const isAuth = useAppSelector(isAuthSelector)
    const token = localStorage.getItem('token');

    useEffect(() => {
        if (!token && pathname !== '/' && !isAuth) {
            navigate('/');

            return;
        }

        if (!!token && !isAuth) {
            dispatch(checkTokenExpireAction(token)).unwrap()
                .then(() => {
                    pathname === '/' && navigate(`/${TABLE_PAGE_PATH}`)

                    dispatch(changeIsAuthAction(true))
                })
                .catch((error: string) => {
                    localStorage.removeItem('token')

                    dispatch(changeIsAuthAction(false))

                    toast(error)
                })
        }
    }, [dispatch, navigate, isAuth, token, pathname])
}