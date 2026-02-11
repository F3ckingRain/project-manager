import { Input } from "Common/Components/Input";
import { useAppDispatch, useAppSelector, useAppShallowSelector } from "Hooks/Redux";
import type { IAuthForm } from "Modules/Auth/Models";
import { changeFieldAction } from "Modules/Auth/Redux/State/Actions";
import { authStateSelector } from "Modules/Auth/Redux/State/Selectors";
import { useTranslation } from "react-i18next";
import { passwordSchema } from './Schema'
import { validateFieldAction } from "Modules/Auth/Redux/Validation/Actions";
import { FieldWrap } from "Common/Components/FieldWrap";
import { validationErrorsSelector } from "Modules/Auth/Redux/Validation/Selectors";
import { NavLink } from "react-router-dom";
import styles from './Styles.module.scss'

/** Поле "Пароль". */
export function Password (): React.JSX.Element {
    const dispatch = useAppDispatch();
    const fieldKey: keyof IAuthForm = 'password'
    const value = useAppSelector(authStateSelector(fieldKey));
    const errors = useAppShallowSelector(validationErrorsSelector(fieldKey));
    const { t } = useTranslation()

    /**
     * Обработчик потери фокуса полем.
     * 
     * @param newValue Новое значение поля.
     */
    const handleBlur = (newValue: string): void => {
        dispatch(changeFieldAction({ key: fieldKey, value: newValue }));

        dispatch(validateFieldAction({ key: fieldKey, value: newValue, schema: passwordSchema }))
    }

    return (
        <FieldWrap errors={errors}>
            <Input 
                value={value}
                onBlur={handleBlur}
                type="password"
                label={t(fieldKey)}
            />

            <NavLink className={styles.link} to={'/'}>
                {t('forgotPassword')}
            </NavLink>
        </FieldWrap>
    )
}