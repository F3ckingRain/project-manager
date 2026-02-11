import { useEffect } from "react";
import { resetAuthAction } from "./Actions";
import { useAppDispatch } from "../../Hooks/Redux";
import { AuthForm } from "./Form";
import styles from './Styles.module.scss'

/** Страница авторизации. */
export function AuthPage (): React.JSX.Element {
    const dispatch = useAppDispatch()

    // Сброс данных при размонтировании.
    useEffect(() => () => {
        dispatch(resetAuthAction())
    }, [dispatch])
    
    return (
        <main className={styles.authPage}>
            <AuthForm />
        </main>
    )
}