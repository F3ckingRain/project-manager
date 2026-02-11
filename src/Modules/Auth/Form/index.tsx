import { Button } from "Common/Components/Button";
import { KeepSession } from "./Fields/KeepSession";
import { Login } from "./Fields/Login";
import { Password } from "./Fields/Password";
import styles from './Styles.module.scss'
import { EButtonType } from "Common/Components/Button/Enums";
import { useAppDispatch, useAppSelector, useAppShallowSelector } from "Hooks/Redux";
import { signInAction, signUpAction } from "../Redux/Response/Actions";
import { changeIsAuthAction } from "Redux/Settings/Actions";
import { useNavigate } from "react-router-dom";
import { TABLE_PAGE_PATH } from "Modules/Table/Consts";
import { authStateSelector } from "../Redux/State/Selectors";
import { useTranslation } from "react-i18next";
import { authFormErrorsSelector } from "../Redux/Validation/Selectors";
import { isEmpty } from "lodash";
import { useState } from "react";
import { EFormType } from "./Enums";

/** Форма авторизации. */
export function AuthForm (): React.JSX.Element {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const keepSession = useAppSelector(authStateSelector('keepSession'));
    const errors = useAppShallowSelector(authFormErrorsSelector);
    const { t } = useTranslation();
    const [formType, setFormType] = useState<EFormType>(EFormType.SIGN_IN);

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

    /** Обработчик нажатия основной кнопки формы. */
    const handleGeneralButtonClick = (): void => {
        if (!isEmpty(errors)) {
            return
        }

        if (formType === EFormType.SIGN_IN) {
            dispatch(signInAction()).unwrap().then(handleWriteToken)
            
            return
        }

        dispatch(signUpAction()).unwrap().then((token: string) => {
            handleWriteToken(token);

            setFormType(EFormType.SIGN_IN);
        })        
    }

    /** Обработчик нажатия второстепенной кнопки формы. */
    const handleSecondaryButtonClick = (): void => {
        if (formType === EFormType.SIGN_IN) {
            setFormType(EFormType.SIGN_UP)
        } else {
            setFormType(EFormType.SIGN_IN)
        }
    }

    return (
        <div className={styles.authForm}>
            <Login />

            <Password />

            <div className={styles.authForm__actions}>
                <Button type={EButtonType.GENERAL} onClick={handleGeneralButtonClick}>
                    {formType === EFormType.SIGN_IN ? t('signIn') : t('create')}
                </Button>

                {formType === EFormType.SIGN_IN ? (
                    <span>
                        {t('noAccount')}
                    </span>
                ) : null}

                <Button type={EButtonType.SECONDARY} onClick={handleSecondaryButtonClick}>
                    {formType === EFormType.SIGN_IN ? t('signUp') : t('undo')}
                </Button>
            </div>

            {formType === EFormType.SIGN_IN ? (
                <KeepSession />
            ) : null}
        </div>
    )
}