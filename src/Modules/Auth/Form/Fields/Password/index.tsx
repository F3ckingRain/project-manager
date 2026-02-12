import { Input } from "Common/Components/Input";
import { useAppDispatch, useAppSelector, useAppShallowSelector } from "Hooks/Redux";
import type { IAuthForm } from "Modules/Auth/Models";
import { changeFieldAction } from "Modules/Auth/Redux/State/Actions";
import { authStateSelector } from "Modules/Auth/Redux/State/Selectors";
import { useTranslation } from "react-i18next";
import { passwordSchema } from './Schema'
import { resetFieldErrorsAction, validateFieldAction } from "Modules/Auth/Redux/Validation/Actions";
import { FieldWrap } from "Common/Components/FieldWrap";
import { validationErrorsSelector } from "Modules/Auth/Redux/Validation/Selectors";
import styles from './Styles.module.scss'
import { EFormType } from "../../Enums";
import { useEffect } from "react";

/** Поле "Пароль". */
export function Password (): React.JSX.Element {
    const dispatch = useAppDispatch();
    const fieldKey: keyof IAuthForm = 'password';
    const value = useAppSelector(authStateSelector(fieldKey));
    const formType = useAppSelector(authStateSelector('formType'));
    const errors = useAppShallowSelector(validationErrorsSelector(fieldKey));
    const { t } = useTranslation();

    // Сброс данных поля при размонтировании.
    useEffect(() => () => {
        dispatch(changeFieldAction({ key: fieldKey, value: undefined }));

        dispatch(resetFieldErrorsAction(fieldKey))
    }, [dispatch, fieldKey])

    /**
     * Обработчик потери фокуса полем.
     * 
     * @param newValue Новое значение поля.
     */
    const handleBlur = (newValue: string): void => {
        dispatch(changeFieldAction({ key: fieldKey, value: newValue }));

        dispatch(validateFieldAction({ key: fieldKey, value: newValue, schema: passwordSchema }))
    }

    /** Обработчик нажатия кнопки "Восстановить пароль". */
    const handleRestorePassword = (): void => {
        dispatch(changeFieldAction({ key: 'formType', value: EFormType.RESTORE_PASSWORD }))
    }

    return (
        <FieldWrap errors={errors}>
            <Input 
                value={value}
                onBlur={handleBlur}
                type="password"
                label={t(`Auth.Labels.${fieldKey}`)}
            />

            {formType === EFormType.SIGN_IN ? (
                <button className={styles.link} onClick={handleRestorePassword}>
                    {t('Auth.Labels.forgotPassword')}
                </button>
            ) : null}
        </FieldWrap>
    )
}