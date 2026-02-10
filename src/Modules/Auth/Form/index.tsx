import { Button } from "Common/Components/Button";
import { KeepSession } from "./Fields/KeepSession";
import { Login } from "./Fields/Login";
import { Password } from "./Fields/Password";
import i18n from "Translations";
import styles from './Styles.module.scss'
import { EButtonType } from "Common/Components/Button/Enums";
import { useAppDispatch } from "Hooks/Redux";
import { signInAction, signUpAction } from "../Redux/Response/Actions";
import { changeIsAuthAction } from "Redux/Settings/Actions";
import { useNavigate } from "react-router-dom";
import { TABLE_PAGE_PATH } from "Modules/Table/Consts";

/** Форма авторизации. */
export function AuthForm (): React.JSX.Element {
    const dispatch = useAppDispatch();
    const navigate = useNavigate()

    /**
     * Обработчик записи токена в localStorage.
     * 
     * @param token Токен.
     */
    const handleWriteToken = (token: string): void => {
        localStorage.setItem('token', token);

        dispatch(changeIsAuthAction(true));

        navigate(`/${TABLE_PAGE_PATH}`)
    }

    /** Обработчик входа в учётную запись. */
    const handleSignIn = (): void => {
        dispatch(signInAction()).unwrap().then(handleWriteToken)
    }

     /** Обработчик создания учётной записи. */
    const handleSignUp = (): void => {
        dispatch(signUpAction()).unwrap().then(handleWriteToken)
    }


    return (
        <div className={styles.authForm}>
            <Login />

            <Password />

            <KeepSession />

            <Button type={EButtonType.SUBMIT} onClick={handleSignIn}>
                {i18n.t('signIn')}
            </Button>

            <Button type={EButtonType.SUBMIT} onClick={handleSignUp}>
                {i18n.t('signUp')}
            </Button>
        </div>
    )
}