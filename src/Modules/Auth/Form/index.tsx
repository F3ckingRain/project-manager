import { Button } from "Common/Components/Button";
import { KeepSession } from "./Fields/KeepSession";
import { Login } from "./Fields/Login";
import { Password } from "./Fields/Password";
import styles from './Styles.module.scss'
import { EButtonType } from "Common/Components/Button/Enums";
import { useAppDispatch, useAppSelector, useAppShallowSelector } from "Hooks/Redux";
import { restorePasswordAction, signInAction, signUpAction } from "../Redux/Response/Actions";
import { changeIsAuthAction } from "Redux/Settings/Actions";
import { useNavigate } from "react-router-dom";
import { TABLE_PAGE_PATH } from "Modules/Table/Consts";
import { authStateSelector } from "../Redux/State/Selectors";
import { useTranslation } from "react-i18next";
import { authFormErrorsSelector } from "../Redux/Validation/Selectors";
import { isEmpty } from "lodash";
import { EFormType } from "./Enums";
import { changeFieldAction } from "../Redux/State/Actions";

/** Форма авторизации. */
export function AuthForm (): React.JSX.Element {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const keepSession = useAppSelector(authStateSelector('keepSession'));
    const formType = useAppSelector(authStateSelector('formType'))
    const errors = useAppShallowSelector(authFormErrorsSelector);
    const { t } = useTranslation();
    
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

        if (formType === EFormType.RESTORE_PASSWORD) {
            dispatch(restorePasswordAction()).unwrap().then(() => {
                dispatch(changeFieldAction({ key: 'formType', value: EFormType.SIGN_IN }))
            });

            return
        }

        dispatch(signUpAction()).unwrap().then((token: string) => {
            handleWriteToken(token);

            dispatch(changeFieldAction({ key: 'formType', value: EFormType.SIGN_IN }))
        })        
    }

    /** Обработчик нажатия второстепенной кнопки формы. */
    const handleSecondaryButtonClick = (): void => {
        if (formType === EFormType.SIGN_IN) {
            dispatch(changeFieldAction({ key: 'formType', value: EFormType.SIGN_UP }))
        } else {
            dispatch(changeFieldAction({ key: 'formType', value: EFormType.SIGN_IN }))

        }
    }

    return (
        <div className={styles.authForm}>
            <Login />

            {formType === EFormType.RESTORE_PASSWORD ? null : (
                <Password />
            )}

            <div className={styles.authForm__actions}>
                <Button type={EButtonType.GENERAL} onClick={handleGeneralButtonClick}>
                    {t(`Auth.Actions.General.${formType}`)}
                </Button>

                {formType === EFormType.SIGN_IN ? (
                    <span>
                        {t(`Auth.Labels.noAccount`)}
                    </span>
                ) : null}

                <Button type={EButtonType.SECONDARY} onClick={handleSecondaryButtonClick}>
                    {t(`Auth.Actions.Secondary.${formType}`)}
                </Button>
            </div>

            {formType === EFormType.SIGN_IN ? (
                <KeepSession />
            ) : null}
        </div>
    )
}