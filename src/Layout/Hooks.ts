import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "Hooks/Redux";
import { useLocation, useNavigate } from "react-router-dom";
import { checkTokenExpireAction } from "Modules/Auth/Redux/Response/Actions";
import { TABLE_PAGE_PATH } from "Modules/Table/Consts";
import { changeUserInfoAction, resetUserAction } from "Redux/User/Actions";
import { isAuthSelector } from "Redux/User/Selectors";
import { toast } from "react-hot-toast";
import type { IUserReduxState } from "Redux/User/Reducer";

/** Хук проверки токена авторизации. */
export function useCheckAuthToken (): void {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const isAuth = useAppSelector(isAuthSelector);
    const token = localStorage.getItem('token');

    useEffect(() => {
        if (!token && pathname !== '/' && !isAuth) {
            navigate('/');

            return;
        }

        if (!!token && !isAuth) {
            dispatch(checkTokenExpireAction(token)).unwrap()
                .then((userInfo: Partial<IUserReduxState>) => {
                    pathname === '/' && navigate(`/${TABLE_PAGE_PATH}`);

                    dispatch(changeUserInfoAction({ ...userInfo, isAuth: true }));
                })
                .catch((error: unknown) => {
                    localStorage.removeItem('token');

                    dispatch(resetUserAction());

                    toast.error(`${error}`);
                })
        }
    }, [dispatch, navigate, isAuth, token, pathname])
}