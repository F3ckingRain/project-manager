import { Button } from "Common/Components/Button";
import { KeepSession } from "./Fields/KeepSession";
import { Login } from "./Fields/Login";
import { Password } from "./Fields/Password";
import styles from './Styles.module.scss'
import { EButtonType } from "Common/Components/Button/Enums";
import { useAppDispatch, useAppSelector } from "Hooks/Redux";
import { signInAction, signUpAction } from "../Redux/Response/Actions";
import { changeIsAuthAction } from "Redux/Settings/Actions";
import { useNavigate } from "react-router-dom";
import { TABLE_PAGE_PATH } from "Modules/Table/Consts";
import { authStateSelector } from "../Redux/State/Selectors";
import { useTranslation } from "react-i18next";

/** Форма авторизации. */
export function AuthForm (): React.JSX.Element {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const keepSession = useAppSelector(authStateSelector('keepSession'));
    const { t } = useTranslation()

    /**
     * Обработчик записи токена в localStorage.
     * 
     * @param token Токен.
     */
    const handleWriteToken = (token: string): void => {
        keepSession && localStorage.setItem('token', token);

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

            <Button type={EButtonType.GENERAL} onClick={handleSignIn}>
                {t('signIn')}
            </Button>

            <Button type={EButtonType.SECONDARY} onClick={handleSignUp}>
                {t('signUp')}
            </Button>
        </div>
    )
}