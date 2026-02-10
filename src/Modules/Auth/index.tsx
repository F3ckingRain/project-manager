import { useEffect } from "react";
import { useCheckAuthToken } from "./Hooks"
import { resetAuthAction } from "./Actions";
import { useAppDispatch } from "../../Hooks/Redux";
import { AuthForm } from "./Form";
import styles from './Styles.module.scss'

/** Страница авторизации. */
export function AuthPage (): React.JSX.Element {
    const dispatch = useAppDispatch()

    // Проверка токена авторизации.
    useCheckAuthToken();

    // Сброс данных при размонтировании.
    useEffect(() => () => {
        dispatch(resetAuthAction())
    }, [dispatch])
    
    return (
        <div className={styles.authPage}>
            <AuthForm />
        </div>
    )
}