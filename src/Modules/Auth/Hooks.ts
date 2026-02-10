import { useEffect } from "react";
import { useAppDispatch } from "Hooks/Redux";
import { useNavigate } from "react-router-dom";
import { checkTokenExpireAction } from "./Redux/Response/Actions";
import { TABLE_PAGE_PATH } from "Modules/Table/Consts";
import { changeIsAuthAction } from "Redux/Settings/Actions";

/** Хук проверки токена авторизации. */
export function useCheckAuthToken (): void {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    useEffect(() => {
        dispatch(checkTokenExpireAction(token)).unwrap()
                .then(() => {
                    navigate(`/${TABLE_PAGE_PATH}`)

                    dispatch(changeIsAuthAction(true))
                })
                .catch(() => {
                    localStorage.removeItem('token')

                    dispatch(changeIsAuthAction(false))
                })
    }, [dispatch, navigate, token])
}